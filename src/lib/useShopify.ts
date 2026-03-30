import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchAllProducts,
  fetchCollections,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  updateCartLine as shopifyUpdateCartLine,
  getCart,
  updateCartNote,
  updateCartAttributes,
  clearCartId,
  type MemoirProduct,
  type MemoirCartItem,
  type ShopifyCart,
} from "./shopify";

// ============================================================
// Collection type
// ============================================================
export interface MemoirCollection {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  image: string | null;
  productHandles: string[];
}


// ============================================================
// useProducts — fetches from Shopify, falls back to hardcoded
// ============================================================

export function useProducts(fallbackProducts: MemoirProduct[]) {
  const [products, setProducts] = useState<MemoirProduct[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [isShopifyConnected, setIsShopifyConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchAllProducts()
      .then((shopifyProducts) => {
        if (cancelled) return;
        // Filter out utility products (hero-banner is used for hero carousel, not for sale)
        const saleProducts = shopifyProducts.filter((p) => p.handle !== "hero-banner" && p.handle !== "hero-images");
        if (saleProducts.length > 0) {
          setProducts(saleProducts);
          setIsShopifyConnected(true);
        }
        // If no products on Shopify, keep using fallback
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { products, loading, isShopifyConnected };
}

// ============================================================
// useCollections — fetches collections from Shopify
// ============================================================

export function useCollections() {
  const [collections, setCollections] = useState<MemoirCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCollections()
      .then((shopifyCollections) => {
        if (cancelled) return;
        const mapped: MemoirCollection[] = shopifyCollections
          .filter((c: any) => c.handle !== "frontpage") // skip default "Home page" collection
          .map((c: any) => ({
            id: c.handle,
            handle: c.handle,
            name: c.title,
            tagline: c.description || "",
            image: c.image?.url || null,
            productHandles: c.products?.edges?.map((e: any) => e.node.handle) || [],
          }));
        setCollections(mapped);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { collections, loading };
}

// ============================================================
// useShopifyCart — Shopify Cart API with local fallback
// ============================================================

export interface CartItem {
  // Common fields used by both modes
  id: string; // product handle or id
  name: string;
  type: string;
  price: number;
  originalPrice: number | null;
  image: string;
  quantity: number;
  isGift: boolean;
  giftMessage: string;
  // Shopify-specific
  lineId?: string;
  variantId?: string;
  handle?: string;
  // For fallback mode — keep the full product ref
  product?: MemoirProduct;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  checkoutUrl: string | null;
  loading: boolean;
}

export function useShopifyCart(isShopifyConnected: boolean) {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    checkoutUrl: null,
    loading: false,
  });
  const initializedRef = useRef(false);

  // Restore cart from Shopify on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    if (!isShopifyConnected) return;

    setCartState((s) => ({ ...s, loading: true }));
    getCart()
      .then((result) => {
        if (!result) {
          setCartState((s) => ({ ...s, loading: false }));
          return;
        }
        setCartState({
          items: result.items.map((item) => ({
            id: item.handle,
            name: item.name,
            type: item.type,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            quantity: item.quantity,
            isGift: !!item.giftMessage,
            giftMessage: item.giftMessage || "",
            lineId: item.lineId,
            variantId: item.variantId,
            handle: item.handle,
          })),
          totalQuantity: result.cart.totalQuantity,
          subtotal: Math.round(parseFloat(result.cart.cost.subtotalAmount.amount)),
          checkoutUrl: result.cart.checkoutUrl,
          loading: false,
        });
      })
      .catch(() => {
        setCartState((s) => ({ ...s, loading: false }));
      });
  }, [isShopifyConnected]);

  const addItem = useCallback(
    async (product: MemoirProduct, isGift = false, giftMessage = "") => {
      if (isShopifyConnected && product.variantId) {
        setCartState((s) => ({ ...s, loading: true }));
        try {
          const attributes: { key: string; value: string }[] = [];
          if (isGift && giftMessage) {
            attributes.push({ key: "_gift_message", value: giftMessage });
          }
          const result = await shopifyAddToCart(product.variantId, 1, attributes);
          setCartState({
            items: result.items.map((item) => ({
              id: item.handle,
              name: item.name,
              type: item.type,
              price: item.price,
              originalPrice: item.originalPrice,
              image: item.image,
              quantity: item.quantity,
              isGift: !!item.giftMessage,
              giftMessage: item.giftMessage || "",
              lineId: item.lineId,
              variantId: item.variantId,
              handle: item.handle,
            })),
            totalQuantity: result.cart.totalQuantity,
            subtotal: Math.round(parseFloat(result.cart.cost.subtotalAmount.amount)),
            checkoutUrl: result.cart.checkoutUrl,
            loading: false,
          });
        } catch (err) {
          console.error("Failed to add to Shopify cart:", err);
          // Fallback to local
          addLocalItem(product, isGift, giftMessage);
        }
      } else {
        addLocalItem(product, isGift, giftMessage);
      }
    },
    [isShopifyConnected]
  );

  const addLocalItem = useCallback(
    (product: MemoirProduct, isGift: boolean, giftMessage: string) => {
      setCartState((prev) => {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          type: product.type,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0] || "",
          quantity: 1,
          isGift,
          giftMessage,
          product,
          handle: product.handle || product.id,
        };
        const items = [...prev.items, newItem];
        const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return {
          ...prev,
          items,
          totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
          subtotal,
        };
      });
    },
    []
  );

  const removeItem = useCallback(
    async (index: number) => {
      const item = cartState.items[index];
      if (isShopifyConnected && item?.lineId) {
        setCartState((s) => ({ ...s, loading: true }));
        try {
          const result = await shopifyRemoveFromCart(item.lineId);
          setCartState({
            items: result.items.map((item) => ({
              id: item.handle,
              name: item.name,
              type: item.type,
              price: item.price,
              originalPrice: item.originalPrice,
              image: item.image,
              quantity: item.quantity,
              isGift: !!item.giftMessage,
              giftMessage: item.giftMessage || "",
              lineId: item.lineId,
              variantId: item.variantId,
              handle: item.handle,
            })),
            totalQuantity: result.cart.totalQuantity,
            subtotal: Math.round(parseFloat(result.cart.cost.subtotalAmount.amount)),
            checkoutUrl: result.cart.checkoutUrl,
            loading: false,
          });
        } catch (err) {
          console.error("Failed to remove from Shopify cart:", err);
          removeLocalItem(index);
        }
      } else {
        removeLocalItem(index);
      }
    },
    [isShopifyConnected, cartState.items]
  );

  const removeLocalItem = useCallback((index: number) => {
    setCartState((prev) => {
      const items = prev.items.filter((_, i) => i !== index);
      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return {
        ...prev,
        items,
        totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal,
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    clearCartId();
    setCartState({
      items: [],
      totalQuantity: 0,
      subtotal: 0,
      checkoutUrl: null,
      loading: false,
    });
  }, []);

  const goToCheckout = useCallback(() => {
    if (cartState.checkoutUrl) {
      window.location.href = cartState.checkoutUrl;
    }
    // If no Shopify checkout URL, the app's built-in checkout will handle it
  }, [cartState.checkoutUrl]);

  return {
    cart: cartState.items,
    totalQuantity: cartState.totalQuantity,
    subtotal: cartState.subtotal,
    checkoutUrl: cartState.checkoutUrl,
    loading: cartState.loading,
    addItem,
    removeItem,
    clearAll,
    goToCheckout,
    isShopifyConnected,
  };
}

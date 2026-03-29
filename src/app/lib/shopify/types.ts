/**
 * Shopify Storefront API response types
 */

// ── Raw Shopify types (as returned by GraphQL) ──

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
}

export interface ShopifyMetafield {
  key: string;
  namespace: string;
  value: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  metafields: Array<ShopifyMetafield | null>;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  metafields: Array<ShopifyMetafield | null>;
  products: { edges: Array<{ node: ShopifyProduct }> };
}

// ── Cart types ──

export interface ShopifyCartLineItem {
  id: string;
  quantity: number;
  attributes: Array<{ key: string; value: string }>;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    compareAtPrice: ShopifyMoney | null;
    image: ShopifyImage | null;
    product: {
      id: string;
      handle: string;
      title: string;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  attributes: Array<{ key: string; value: string }>;
  discountCodes: Array<{ code: string; applicable: boolean }>;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
  lines: { edges: Array<{ node: ShopifyCartLineItem }> };
  note: string | null;
}

// ── Memoir domain types (mapped from Shopify) ──

export interface MemoirProduct {
  id: string;           // Shopify handle (e.g., "first-chapter")
  shopifyId: string;    // Full Shopify GID
  variantId: string;    // First variant GID (for cart operations)
  name: string;
  type: string;         // "Ring", "Pendant", "Bracelet", "Earrings"
  price: number;
  originalPrice: number | null;
  moment: string;       // Collection handle (e.g., "new-beginnings")
  momentLabel: string;
  hook: string;
  gifterHook: string;
  story: string;
  specs: string[];
  tags: string[];
  images: string[];
  availableForSale: boolean;
}

export interface MemoirMoment {
  id: string;           // Collection handle
  shopifyId: string;    // Full Shopify GID
  name: string;
  tagline: string;
  selfPurchaseTagline: string;
  gifterTagline: string;
  color: string;
}

export interface MemoirCartItem {
  lineId: string;       // Shopify cart line ID
  product: MemoirProduct;
  quantity: number;
  isGift: boolean;
  giftMessage: string;
}

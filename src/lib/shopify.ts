// ============================================================
// SHOPIFY STOREFRONT API CLIENT
// ============================================================

const SHOPIFY_DOMAIN = "memoir-9407.myshopify.com";
const STOREFRONT_TOKEN = "1958c0ab7e8ec0d25fe172761011fc69";
const API_VERSION = "2025-01";

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Shopify API error:", json.errors);
    throw new Error(json.errors[0]?.message || "Shopify API error");
  }
  return json.data as T;
}

// --- GraphQL Fragments ---

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    availableForSale
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "memoir", key: "hook" },
      { namespace: "memoir", key: "gifter_hook" },
      { namespace: "memoir", key: "story" },
      { namespace: "memoir", key: "moment" },
      { namespace: "memoir", key: "moment_label" },
      { namespace: "memoir", key: "specs" },
      { namespace: "memoir", key: "gift_tags" }
    ]) {
      key
      value
      namespace
    }
  }
`;

// --- Queries ---

const PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node { ...ProductFields }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText }
          products(first: 50) {
            edges {
              node {
                id
                handle
                title
                productType
                priceRange {
                  minVariantPrice { amount currencyCode }
                }
                images(first: 1) {
                  edges { node { url altText } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url altText }
                  product {
                    id
                    handle
                    title
                    productType
                  }
                }
              }
              attributes { key value }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url altText }
                  product {
                    id
                    handle
                    title
                    productType
                  }
                }
              }
              attributes { key value }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url altText }
                  product {
                    id
                    handle
                    title
                    productType
                  }
                }
              }
              attributes { key value }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  image { url altText }
                  product {
                    id
                    handle
                    title
                    productType
                  }
                }
              }
              attributes { key value }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount { amount currencyCode }
        subtotalAmount { amount currencyCode }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                image { url altText }
                product {
                  id
                  handle
                  title
                  productType
                }
              }
            }
            attributes { key value }
          }
        }
      }
    }
  }
`;

const CART_NOTE_UPDATE_MUTATION = `
  mutation CartNoteUpdate($cartId: ID!, $note: String!) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_ATTRIBUTES_UPDATE_MUTATION = `
  mutation CartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart { id }
      userErrors { field message }
    }
  }
`;

// --- Types ---

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  metafields: ({ key: string; value: string; namespace: string } | null)[];
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
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
      productType: string;
    };
  };
  attributes: { key: string; value: string }[];
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

// --- Mapped types (what our App uses) ---

export interface MemoirProduct {
  id: string;
  shopifyId: string;
  variantId: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number | null;
  moment: string;
  momentLabel: string;
  hook: string;
  gifterHook: string;
  story: string;
  specs: string[];
  tags: string[];
  images: string[];
  availableForSale: boolean;
  handle: string;
}

export interface MemoirCartItem {
  lineId: string;
  productId: string;
  variantId: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number | null;
  image: string;
  quantity: number;
  giftMessage?: string;
  handle: string;
}

// --- Mappers ---

function getMetafield(product: ShopifyProduct, key: string): string | null {
  const mf = product.metafields?.find((m) => m && m.key === key);
  return mf?.value || null;
}

function parseJsonMetafield(product: ShopifyProduct, key: string): string[] {
  const val = getMetafield(product, key);
  if (!val) return [];
  try {
    return JSON.parse(val);
  } catch {
    return val.split(",").map((s) => s.trim());
  }
}

// --- Product enrichment (fallback when metafields aren't set) ---

const PRODUCT_ENRICHMENT: Record<string, {
  moment: string; momentLabel: string;
  hook: string; gifterHook: string; story: string;
  specs: string[];
}> = {
  "the-first-chapter": {
    moment: "new-beginnings", momentLabel: "New Beginnings",
    hook: "For the woman who just turned the page. A new job, a new city, a new version of herself.",
    gifterHook: "She just started something brave. This ring tells her you noticed.",
    story: "Every new beginning deserves a quiet witness. The First Chapter is crafted for the woman who took the leap — who packed the boxes, signed the offer letter, or simply decided she deserved more. This ring doesn't shout. It sits on her finger like a private celebration, a reminder that the hardest part is already behind her.",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "Adjustable Fit", "Anti-Tarnish Coating"],
  },
  "chosen": {
    moment: "because-you-deserve-it", momentLabel: "Because You Deserve It",
    hook: "She didn't wait for someone to choose her — she chose herself.",
    gifterHook: "For the woman who gives everything to everyone else. This one's just for her.",
    story: "Chosen isn't about being picked. It's about picking yourself. This pendant is for the woman who stopped waiting for permission — who booked the trip alone, celebrated her own win, or simply looked in the mirror and said 'enough.' The delicate chain holds a quiet declaration: I chose me.",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "18-inch Chain with 2-inch Extender", "Anti-Tarnish Coating"],
  },
  "still-here": {
    moment: "gift-someone-special", momentLabel: "Gift Someone Special",
    hook: "For the friend who stayed. Through the late-night calls, the hard days, the miles between.",
    gifterHook: "She's been there through everything. This bracelet says what you can't always text back.",
    story: "Some friendships don't need daily check-ins. They survive on voice notes at 2 AM, shared screenshots, and the unspoken understanding that you'd drop everything if she called. Still Here is for that friendship — the one that doesn't fade with distance or time. Each interlinked piece represents a moment you've carried together.",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "Adjustable Chain Length", "Anti-Tarnish Coating"],
  },
  "unwritten": {
    moment: "new-beginnings", momentLabel: "New Beginnings",
    hook: "For the girl on the edge of something new. She doesn't know the ending yet — and that's the most beautiful part.",
    gifterHook: "She's graduating, moving, starting fresh. These earrings are your way of saying 'go get it.'",
    story: "There's a special kind of magic in not knowing what comes next. Unwritten is for the woman standing at the edge — degree in hand, bags half-packed, heart full of equal parts terror and excitement. These earrings catch the light like possibilities do: unpredictably, beautifully, all at once.",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "Lightweight Drop Design", "Push-Back Closure", "Anti-Tarnish Coating"],
  },
  "brave-bright": {
    moment: "because-you-deserve-it", momentLabel: "Because You Deserve It",
    hook: "For the woman who walked into the room and didn't shrink. Who said yes to herself.",
    gifterHook: "She's been brave lately. This ring is your way of saying you see her.",
    story: "Brave & Bright is for the woman who stopped making herself small. Who spoke up in the meeting, set the boundary, or simply stopped apologizing for taking up space. This ring doesn't whisper — it holds steady on her finger like the quiet confidence she's been building all along.",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "Adjustable Fit", "Anti-Tarnish Coating"],
  },
  "the-quiet-promise": {
    moment: "gift-someone-special", momentLabel: "Gift Someone Special",
    hook: "Some promises don't need words. This pendant carries the weight of 'I'm not going anywhere.'",
    gifterHook: "For the relationship that doesn't need grand gestures — just the quiet ones that matter.",
    story: "The Quiet Promise isn't about a proposal or a milestone anniversary. It's about the Tuesday night when she fell asleep on your shoulder, and you realized this is it. This pendant hangs at heart level for a reason — it's a promise you wear, not just make. No expiration date, no conditions, just 'I'm not going anywhere.'",
    specs: ["925 Sterling Silver", "Rhodium Plated", "BIS Hallmarked", "20-inch Chain with 2-inch Extender", "Anti-Tarnish Coating"],
  },
};

export function mapShopifyProduct(sp: ShopifyProduct): MemoirProduct {
  const variant = sp.variants.edges[0]?.node;
  const price = Math.round(parseFloat(variant?.price?.amount || sp.priceRange.minVariantPrice.amount));
  const compareAt = variant?.compareAtPrice
    ? Math.round(parseFloat(variant.compareAtPrice.amount))
    : null;

  const enrichment = PRODUCT_ENRICHMENT[sp.handle];

  return {
    id: sp.handle,
    shopifyId: sp.id,
    variantId: variant?.id || "",
    name: sp.title,
    type: sp.productType || "Ring",
    price,
    originalPrice: compareAt && compareAt > price ? compareAt : null,
    moment: getMetafield(sp, "moment") || enrichment?.moment || "new-beginnings",
    momentLabel: getMetafield(sp, "moment_label") || enrichment?.momentLabel || "New Beginnings",
    hook: getMetafield(sp, "hook") || enrichment?.hook || sp.description,
    gifterHook: getMetafield(sp, "gifter_hook") || enrichment?.gifterHook || sp.description,
    story: getMetafield(sp, "story") || enrichment?.story || sp.description,
    specs: parseJsonMetafield(sp, "specs").length > 0 ? parseJsonMetafield(sp, "specs") : (enrichment?.specs || []),
    tags: sp.tags.length > 0 ? sp.tags : parseJsonMetafield(sp, "gift_tags"),
    images: sp.images.edges.map((e) => e.node.url),
    availableForSale: sp.availableForSale,
    handle: sp.handle,
  };
}

function mapCartLine(line: ShopifyCartLine): MemoirCartItem {
  const giftMsg = line.attributes.find((a) => a.key === "_gift_message");
  return {
    lineId: line.id,
    productId: line.merchandise.product.handle,
    variantId: line.merchandise.id,
    name: line.merchandise.product.title,
    type: line.merchandise.product.productType,
    price: Math.round(parseFloat(line.merchandise.price.amount)),
    originalPrice: line.merchandise.compareAtPrice
      ? Math.round(parseFloat(line.merchandise.compareAtPrice.amount))
      : null,
    image: line.merchandise.image?.url || "",
    quantity: line.quantity,
    giftMessage: giftMsg?.value,
    handle: line.merchandise.product.handle,
  };
}

// --- API Functions ---

export async function fetchAllProducts(first = 50): Promise<MemoirProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    PRODUCTS_QUERY,
    { first }
  );
  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

export async function fetchProductByHandle(handle: string): Promise<MemoirProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.product ? mapShopifyProduct(data.product) : null;
}

export interface HeroSlide {
  url: string;
  mobilePosition: string; // e.g. "60% 40%" — parsed from altText like "mobile:60% 40%"
  desktopPosition: string;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle: "hero-images" }
  );
  if (!data.product) return [];
  return data.product.images.edges.map((e) => {
    const alt = e.node.altText || "";
    // Parse alt text for position hints: "mobile:60% 40% desktop:70% 50%"
    const mobileMatch = alt.match(/mobile:\s*([\d]+%\s*[\d]+%)/i);
    const desktopMatch = alt.match(/desktop:\s*([\d]+%\s*[\d]+%)/i);
    return {
      url: e.node.url,
      mobilePosition: mobileMatch ? mobileMatch[1] : "50% 30%",
      desktopPosition: desktopMatch ? desktopMatch[1] : "50% 50%",
    };
  });
}

export async function fetchCollections() {
  const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>(
    COLLECTIONS_QUERY,
    { first: 20 }
  );
  return data.collections.edges.map((e) => e.node);
}

// --- Cart API ---

const CART_ID_KEY = "memoir_cart_id";

function getSavedCartId(): string | null {
  try {
    return localStorage.getItem(CART_ID_KEY);
  } catch {
    return null;
  }
}

function saveCartId(id: string) {
  try {
    localStorage.setItem(CART_ID_KEY, id);
  } catch {}
}

function clearCartId() {
  try {
    localStorage.removeItem(CART_ID_KEY);
  } catch {}
}

function parseCart(cart: any): { cart: ShopifyCart; items: MemoirCartItem[] } {
  const items = cart.lines.edges.map((e: any) => mapCartLine(e.node));
  return { cart, items };
}

export async function createCart(
  variantId: string,
  quantity = 1,
  attributes: { key: string; value: string }[] = []
): Promise<{ cart: ShopifyCart; items: MemoirCartItem[] }> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart; userErrors: any[] } }>(
    CART_CREATE_MUTATION,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity, attributes }],
      },
    }
  );
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  saveCartId(data.cartCreate.cart.id);
  return parseCart(data.cartCreate.cart);
}

export async function getCart(): Promise<{ cart: ShopifyCart; items: MemoirCartItem[] } | null> {
  const cartId = getSavedCartId();
  if (!cartId) return null;
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(CART_QUERY, { cartId });
    if (!data.cart) {
      clearCartId();
      return null;
    }
    return parseCart(data.cart);
  } catch {
    clearCartId();
    return null;
  }
}

export async function addToCart(
  variantId: string,
  quantity = 1,
  attributes: { key: string; value: string }[] = []
): Promise<{ cart: ShopifyCart; items: MemoirCartItem[] }> {
  let cartId = getSavedCartId();
  if (!cartId) {
    return createCart(variantId, quantity, attributes);
  }
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: any[] } }>(
    CART_LINES_ADD_MUTATION,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity, attributes }],
    }
  );
  if (data.cartLinesAdd.userErrors?.length) {
    // Cart might be expired — create new one
    return createCart(variantId, quantity, attributes);
  }
  return parseCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  lineId: string,
  quantity: number
): Promise<{ cart: ShopifyCart; items: MemoirCartItem[] }> {
  const cartId = getSavedCartId();
  if (!cartId) throw new Error("No cart");
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: any[] } }>(
    CART_LINES_UPDATE_MUTATION,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );
  return parseCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(
  lineId: string
): Promise<{ cart: ShopifyCart; items: MemoirCartItem[] }> {
  const cartId = getSavedCartId();
  if (!cartId) throw new Error("No cart");
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart; userErrors: any[] } }>(
    CART_LINES_REMOVE_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    }
  );
  return parseCart(data.cartLinesRemove.cart);
}

export async function updateCartNote(note: string): Promise<void> {
  const cartId = getSavedCartId();
  if (!cartId) return;
  await shopifyFetch(CART_NOTE_UPDATE_MUTATION, { cartId, note });
}

export async function updateCartAttributes(
  attributes: { key: string; value: string }[]
): Promise<void> {
  const cartId = getSavedCartId();
  if (!cartId) return;
  await shopifyFetch(CART_ATTRIBUTES_UPDATE_MUTATION, { cartId, attributes });
}

export function getCheckoutUrl(): string | null {
  // This will be set after cart operations
  return null;
}

export { getSavedCartId, clearCartId };

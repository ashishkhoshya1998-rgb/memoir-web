/**
 * Shopify Storefront API Client
 *
 * Lightweight GraphQL client for the Storefront API.
 * The public access token is safe to include in client-side code —
 * it can only read published products and manage carts.
 */

const SHOPIFY_DOMAIN = "memoir-9407.myshopify.com";
const STOREFRONT_TOKEN = "1958c0ab7e8ec0d25fe172761011fc69";
const API_VERSION = "2025-01";

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; extensions?: { code: string } }>;
}

export async function shopifyFetch<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors?.length) {
    console.error("[Shopify] GraphQL errors:", json.errors);
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("No data returned from Shopify");
  }

  return json.data;
}

export { SHOPIFY_DOMAIN, API_VERSION };

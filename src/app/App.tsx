import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { useProducts, useShopifyCart, useCollections, type CartItem, type MemoirCollection } from "../lib/useShopify";
import { fetchProductByHandle, fetchHeroSlides, type MemoirProduct } from "../lib/shopify";
import { auth as firebaseAuth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "../lib/firebase";
import type { ConfirmationResult } from "firebase/auth";

// ============================================================
// MEMOIR — Complete Website
// "Jewellery, as a memory you can touch."
// ============================================================

// --- Data Layer (hardcoded fallback — overridden when Shopify has products) ---
const FALLBACK_PRODUCTS: MemoirProduct[] = [
  {
    id: "first-chapter",
    shopifyId: "",
    variantId: "",
    handle: "first-chapter",
    availableForSale: true,
    name: "The First Chapter",
    type: "Ring",
    price: 2499,
    originalPrice: 2999,
    moment: "new-beginnings",
    momentLabel: "New Beginnings",
    hook: "For the woman who just turned the page. A new job, a new city, a new version of herself. This ring holds that quiet courage.",
    gifterHook: "When she's starting something new, this ring says 'I believe in you' without needing the words.",
    story: "We designed The First Chapter Ring for a specific kind of woman — one who's standing at the start of something new and wants to carry that feeling with her. New beginnings are brave. They deserve to be marked, not just lived through. Wear it as a daily reminder that you chose to begin.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "Adjustable"],
    tags: ["Most gifted for new jobs", "Bestseller"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7uvN2ZZOlFnORozDfbn118agdJI2EOIKzQmByGHBXACxZPMIwX3MgDBcbcW_yO9Hib0w0jcxx16yRDWR5HTsL9aBbhxhk9zO6MbjpumdGNVWh8BcAUanIcXouhqLVPZXbA3Vb4fWuJusriVyrhocrFf7BlRABHkukLEt8Hj6VpoAYqCYH6PL9uQC-vFMKBpveBCw2LWFltXpz4Xmtyv9jlGffNw43VhnLtV8zUxiaUJHE20LNJ-NewnvAdq__beQ4yIQUXNyZBnA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOJGiVhD8nqgz_7E9h3ccOvmOo7eJMHkJCfq00-iRdHuCVY76K44KvS231bOpIUjKOBdYIqPFxBwVjEVwnQuCfXOKKXEc06fF1uqNXl9d_JYzhOWhsO63ki5qZi-188tFkpn3a8zJNPKjlPTw31HkWFJysnEpu504DXB3DvOiiVrYlpgzTeXRAB_r9lEKH02hGNO8rj17GvT2zwHZnCB2SZeJYRNptHK0TCgD388bbAqahNyDAmgXS4t_SrqLKNWgfl98IldG-XJE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMElbgWxyVWob7d95oEtcl3ZYOZvn3oUJAc0KPX5Ha17MYmcvivrRBckn1GIt4Hy1fVdZuY-bHIQQ1zHZt9EGZyxUAk53_X2p3WPtpuYf_49eW0ezpGGeSHSyHI3IDC6oQZhvTqrWSYg0jVsB2wPtSo_GWlYcobzpFpVYcGcT_DuP4DaaIfyfQVAdSh0n_pHO4OjIO5YpW9lk-T664aDklixDI9knOw4jVUAzC0X-Q--d7t3nPkUu39sZR07GPpIZMfSSZxFDIDuI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkeJ_JR2Bi9Wa9GhqY-5zuegM6HyMKKe1RRFvqTcCSRVw5W2rXUE_iExgMYCCtfHqUmukC8NXly2dMwwAmjr5XEU_8laZnSFDXKgy1b2jQJERV0UwHccDvBURZrqb8SUf8aDhjyVVswXUg3XmyWEym13X1NlZ5Tlwlnd9ytDbudA3Jd-8q5lggBJNGo9xTLkaQJ4UIJ4LbZkkXtwGUuYiX4OaubO5mMopQt7oTPju3O3HJoPKdOV-up7L7URzAGOUhRUYpc3pdXBE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm2K6vPMR80hXMEM19CuFWt6NAiSs32fr5EZXXbhKdAjY2zEwKxHsWxwoeCUJX68x0iI8Eh_m2AhDrZecWXxalsE7xu9bmRKMRcQb6knope5P9Rubj9t6agzfrPGIZnfx9JExZsekAbDxY5ZsojZ2Kr3-ti0Su4VM4sklRhQQMwIfm0F6tAM8qpn7CedEM5Ho08JSS6yGkYmL098ScUA6SY-ruYvBRDJLdlQptIBGhzgXwYlCSM5TvRrDC0NIt4TxJBLpXD0wcB_0",
    ],
  },
  {
    id: "chosen",
    shopifyId: "", variantId: "", handle: "chosen", availableForSale: true,
    name: "Chosen",
    type: "Pendant",
    price: 2999,
    originalPrice: 3499,
    moment: "because-you-deserve-it",
    momentLabel: "Because You Deserve It",
    hook: "For the woman who chose herself. Not because anyone told her to — because she finally believed she should.",
    gifterHook: "She's been putting everyone else first. This pendant tells her it's her turn now.",
    story: "Chosen was born from a simple truth: the hardest person to choose is yourself. This pendant is for the woman who stopped waiting for permission and started living on her own terms. The delicate chain represents the invisible thread of self-trust — fragile-looking, but unbreakable.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "18-inch chain"],
    tags: ["Most popular self-gift", "Editor's pick"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCP1iWBh9oDoPMfS3v9bSZeprX4f0MpdQyY4-uAEscGaCGoV45qiU-QOfXeeA9tV-xMcjRiTCmQStLPIgF8tiRMU_O30bPWKD7su3RInGsir6KkCXoj-KQyDiM-_DQ5otrUDEV7jajk48vd3pHymOSANGo0bKcWSnXXJHjPBC3NwBx3cpH3b4a5jpnwX6-eXCtPRiHNTelGD9wkE2zu_0LNxSBS5YCarKg9rUv-jXTbqlhovpVbPFePcJ5yGDvb0Moz488KoV61iqQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq6139EaiFsKkwvNu5PHFgfgnrOE_LQq4XT8zFJq3yzxmLiw8t-UnUCHUg20UoEVdf3SmCIjkk-nDuEKhHLfKAboBfHdoQBwyJn9Q4EHxN2XRsWodg37Yw-UtTyASnEqTzDEFMhfx5fX1DKvuZjzo9fQXsCTkIH-JGCG-SH17H7DpA1v2Qdb2kAxQdP_Vay8Eevhc4QU_WY1TXXkC5MDQdFCEz_V_OEMay2Hkk6ilXqteDAkHfiG7zgVsYYU_VyXUlm3kYzi_K6uY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEh_MO6DjU0WuKfcM-I06rXjyDnIo_oxQ9YIQcqcm-mfOKXSeFiEI9lWgi05BQVJSUcfWTwzEWApNx5dIsBfz-pCMZ9gAhgsR9uknKob9sf5pHzw5fJ58USxRZpxbzYbuSY3dxjK0NLNf9Vyl3f9I44An5Qya_g0hgc7DvCLlNOs_XGW4gTPi-ThNvzfHyQrCDKOjVAQiVGeUVBmAra0yiuD0POIqOKAM38pRQK9qSwNDMluZEGKM9YaVWKWr-a6ayLWor-is077U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfzC85U4TalHTZ-8fW74sWbpTulbVilUNIxvS65cjEQvu-PmaRutUzwRb1av5wGd384RBr9ffC0HyDXl7zjrZoteSRn6lByqnuHZpxaVbC4oF9PmvCs957tXMkPoBCbla2_boR7dhvqzefT5oA_5LccoqIpqCnGbMkmEsnUxa5qspL2VjTJhFYyV0LBmiFoxzxZfYHGrmzTSbZHVImcH-6z_aAzYDvzY7NWsGZezX8s8wth4H_9WwIDAB8et4FUl6gpvSMH8JqCCk",
    ],
  },
  {
    id: "still-here",
    shopifyId: "", variantId: "", handle: "still-here", availableForSale: true,
    name: "Still Here",
    type: "Bracelet",
    price: 1999,
    originalPrice: null,
    moment: "gift-someone-special",
    momentLabel: "Gift Someone Special",
    hook: "For the distance that didn't change anything. A bracelet that whispers 'I'm still here' across cities and time zones.",
    gifterHook: "When you can't be there in person, this bracelet says everything a text message can't.",
    story: "Still Here was designed for the connections that survive distance. The interlinked chain represents two lives that moved apart geographically but never emotionally. Every clasp closure is a small ritual of remembering someone who matters.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "Adjustable clasp"],
    tags: ["Perfect for long-distance", "Most gifted by brothers"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMElbgWxyVWob7d95oEtcl3ZYOZvn3oUJAc0KPX5Ha17MYmcvivrRBckn1GIt4Hy1fVdZuY-bHIQQ1zHZt9EGZyxUAk53_X2p3WPtpuYf_49eW0ezpGGeSHSyHI3IDC6oQZhvTqrWSYg0jVsB2wPtSo_GWlYcobzpFpVYcGcT_DuP4DaaIfyfQVAdSh0n_pHO4OjIO5YpW9lk-T664aDklixDI9knOw4jVUAzC0X-Q--d7t3nPkUu39sZR07GPpIZMfSSZxFDIDuI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7uvN2ZZOlFnORozDfbn118agdJI2EOIKzQmByGHBXACxZPMIwX3MgDBcbcW_yO9Hib0w0jcxx16yRDWR5HTsL9aBbhxhk9zO6MbjpumdGNVWh8BcAUanIcXouhqLVPZXbA3Vb4fWuJusriVyrhocrFf7BlRABHkukLEt8Hj6VpoAYqCYH6PL9uQC-vFMKBpveBCw2LWFltXpz4Xmtyv9jlGffNw43VhnLtV8zUxiaUJHE20LNJ-NewnvAdq__beQ4yIQUXNyZBnA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOJGiVhD8nqgz_7E9h3ccOvmOo7eJMHkJCfq00-iRdHuCVY76K44KvS231bOpIUjKOBdYIqPFxBwVjEVwnQuCfXOKKXEc06fF1uqNXl9d_JYzhOWhsO63ki5qZi-188tFkpn3a8zJNPKjlPTw31HkWFJysnEpu504DXB3DvOiiVrYlpgzTeXRAB_r9lEKH02hGNO8rj17GvT2zwHZnCB2SZeJYRNptHK0TCgD388bbAqahNyDAmgXS4t_SrqLKNWgfl98IldG-XJE",
    ],
  },
  {
    id: "unwritten",
    shopifyId: "", variantId: "", handle: "unwritten", availableForSale: true,
    name: "Unwritten",
    type: "Earrings",
    price: 1499,
    originalPrice: null,
    moment: "new-beginnings",
    momentLabel: "New Beginnings",
    hook: "For all the pages she hasn't written yet. Delicate drops that catch light like possibility itself.",
    gifterHook: "For the graduate, the dreamer, the one about to leap — these earrings say 'the best is yet to come.'",
    story: "Unwritten celebrates the beauty of potential. These earrings were inspired by blank pages and open roads — the thrilling uncertainty of not knowing what comes next, but trusting it will be extraordinary.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "Push-back closure"],
    tags: ["Perfect for graduates", "Under ₹1,500"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm2K6vPMR80hXMEM19CuFWt6NAiSs32fr5EZXXbhKdAjY2zEwKxHsWxwoeCUJX68x0iI8Eh_m2AhDrZecWXxalsE7xu9bmRKMRcQb6knope5P9Rubj9t6agzfrPGIZnfx9JExZsekAbDxY5ZsojZ2Kr3-ti0Su4VM4sklRhQQMwIfm0F6tAM8qpn7CedEM5Ho08JSS6yGkYmL098ScUA6SY-ruYvBRDJLdlQptIBGhzgXwYlCSM5TvRrDC0NIt4TxJBLpXD0wcB_0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkeJ_JR2Bi9Wa9GhqY-5zuegM6HyMKKe1RRFvqTcCSRVw5W2rXUE_iExgMYCCtfHqUmukC8NXly2dMwwAmjr5XEU_8laZnSFDXKgy1b2jQJERV0UwHccDvBURZrqb8SUf8aDhjyVVswXUg3XmyWEym13X1NlZ5Tlwlnd9ytDbudA3Jd-8q5lggBJNGo9xTLkaQJ4UIJ4LbZkkXtwGUuYiX4OaubO5mMopQt7oTPju3O3HJoPKdOV-up7L7URzAGOUhRUYpc3pdXBE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCP1iWBh9oDoPMfS3v9bSZeprX4f0MpdQyY4-uAEscGaCGoV45qiU-QOfXeeA9tV-xMcjRiTCmQStLPIgF8tiRMU_O30bPWKD7su3RInGsir6KkCXoj-KQyDiM-_DQ5otrUDEV7jajk48vd3pHymOSANGo0bKcWSnXXJHjPBC3NwBx3cpH3b4a5jpnwX6-eXCtPRiHNTelGD9wkE2zu_0LNxSBS5YCarKg9rUv-jXTbqlhovpVbPFePcJ5yGDvb0Moz488KoV61iqQ",
    ],
  },
  {
    id: "brave-and-bright",
    shopifyId: "", variantId: "", handle: "brave-and-bright", availableForSale: true,
    name: "Brave & Bright",
    type: "Ring",
    price: 2299,
    originalPrice: 2799,
    moment: "because-you-deserve-it",
    momentLabel: "Because You Deserve It",
    hook: "For the woman who showed up even when it was hard. A celebration you wear on your hand.",
    gifterHook: "She won't celebrate herself. So you do it for her. This ring says 'I noticed everything you did.'",
    story: "Brave & Bright exists because courage rarely gets a trophy. This ring is for the woman who survived the hard meeting, the difficult conversation, the year that tested everything — and came out brighter.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "Adjustable"],
    tags: ["Celebration piece", "Pairs with The First Chapter"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOJGiVhD8nqgz_7E9h3ccOvmOo7eJMHkJCfq00-iRdHuCVY76K44KvS231bOpIUjKOBdYIqPFxBwVjEVwnQuCfXOKKXEc06fF1uqNXl9d_JYzhOWhsO63ki5qZi-188tFkpn3a8zJNPKjlPTw31HkWFJysnEpu504DXB3DvOiiVrYlpgzTeXRAB_r9lEKH02hGNO8rj17GvT2zwHZnCB2SZeJYRNptHK0TCgD388bbAqahNyDAmgXS4t_SrqLKNWgfl98IldG-XJE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq6139EaiFsKkwvNu5PHFgfgnrOE_LQq4XT8zFJq3yzxmLiw8t-UnUCHUg20UoEVdf3SmCIjkk-nDuEKhHLfKAboBfHdoQBwyJn9Q4EHxN2XRsWodg37Yw-UtTyASnEqTzDEFMhfx5fX1DKvuZjzo9fQXsCTkIH-JGCG-SH17H7DpA1v2Qdb2kAxQdP_Vay8Eevhc4QU_WY1TXXkC5MDQdFCEz_V_OEMay2Hkk6ilXqteDAkHfiG7zgVsYYU_VyXUlm3kYzi_K6uY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEh_MO6DjU0WuKfcM-I06rXjyDnIo_oxQ9YIQcqcm-mfOKXSeFiEI9lWgi05BQVJSUcfWTwzEWApNx5dIsBfz-pCMZ9gAhgsR9uknKob9sf5pHzw5fJ58USxRZpxbzYbuSY3dxjK0NLNf9Vyl3f9I44An5Qya_g0hgc7DvCLlNOs_XGW4gTPi-ThNvzfHyQrCDKOjVAQiVGeUVBmAra0yiuD0POIqOKAM38pRQK9qSwNDMluZEGKM9YaVWKWr-a6ayLWor-is077U",
    ],
  },
  {
    id: "quiet-promise",
    shopifyId: "", variantId: "", handle: "quiet-promise", availableForSale: true,
    name: "The Quiet Promise",
    type: "Pendant",
    price: 3499,
    originalPrice: null,
    moment: "gift-someone-special",
    momentLabel: "Gift Someone Special",
    hook: "Some promises are too important for words. This pendant carries the ones you keep in your heart.",
    gifterHook: "For the woman who means everything. This isn't just a gift — it's a promise she can wear.",
    story: "The Quiet Promise was designed for the deepest connections — the ones where words fall short. The pendant's form echoes a whispered secret, something precious held close. It's for anniversaries, for reconciliations, for the moment you realize someone is your person.",
    specs: ["925 Sterling Silver", "BIS Hallmarked", "Rhodium Plated", "20-inch chain"],
    tags: ["Anniversary favourite", "Premium piece"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfzC85U4TalHTZ-8fW74sWbpTulbVilUNIxvS65cjEQvu-PmaRutUzwRb1av5wGd384RBr9ffC0HyDXl7zjrZoteSRn6lByqnuHZpxaVbC4oF9PmvCs957tXMkPoBCbla2_boR7dhvqzefT5oA_5LccoqIpqCnGbMkmEsnUxa5qspL2VjTJhFYyV0LBmiFoxzxZfYHGrmzTSbZHVImcH-6z_aAzYDvzY7NWsGZezX8s8wth4H_9WwIDAB8et4FUl6gpvSMH8JqCCk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7uvN2ZZOlFnORozDfbn118agdJI2EOIKzQmByGHBXACxZPMIwX3MgDBcbcW_yO9Hib0w0jcxx16yRDWR5HTsL9aBbhxhk9zO6MbjpumdGNVWh8BcAUanIcXouhqLVPZXbA3Vb4fWuJusriVyrhocrFf7BlRABHkukLEt8Hj6VpoAYqCYH6PL9uQC-vFMKBpveBCw2LWFltXpz4Xmtyv9jlGffNw43VhnLtV8zUxiaUJHE20LNJ-NewnvAdq__beQ4yIQUXNyZBnA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMElbgWxyVWob7d95oEtcl3ZYOZvn3oUJAc0KPX5Ha17MYmcvivrRBckn1GIt4Hy1fVdZuY-bHIQQ1zHZt9EGZyxUAk53_X2p3WPtpuYf_49eW0ezpGGeSHSyHI3IDC6oQZhvTqrWSYg0jVsB2wPtSo_GWlYcobzpFpVYcGcT_DuP4DaaIfyfQVAdSh0n_pHO4OjIO5YpW9lk-T664aDklixDI9knOw4jVUAzC0X-Q--d7t3nPkUu39sZR07GPpIZMfSSZxFDIDuI",
    ],
  },
];

const MOMENTS = [
  {
    id: "new-beginnings",
    name: "New Beginnings",
    tagline: "For the job she landed, the city she moved to, the life she chose.",
    selfPurchaseTagline: "For every first step you've taken alone — and survived.",
    gifterTagline: "She just started something new. These pieces were designed to tell her you noticed.",
    color: "#C9A96E",
  },
  {
    id: "because-you-deserve-it",
    name: "Because You Deserve It",
    tagline: "For the woman who chooses herself.",
    selfPurchaseTagline: "You've been putting everyone first. This moment is yours.",
    gifterTagline: "She won't buy it for herself. That's exactly why you should.",
    color: "#B5A69A",
  },
  {
    id: "gift-someone-special",
    name: "Gift Someone Special",
    tagline: "When you want her to know you noticed.",
    selfPurchaseTagline: "Because some moments deserve a beautiful reminder.",
    gifterTagline: "Not sure what to pick? Start here — we'll help you find the one.",
    color: "#755939",
  },
];

const GIFT_RELATIONSHIPS = [
  { id: "partner", label: "My Partner", icon: "favorite", subtitle: "Romantic partner or spouse" },
  { id: "sister", label: "My Sister", icon: "diversity_1", subtitle: "A bond like no other" },
  { id: "friend", label: "My Friend", icon: "group", subtitle: "The one who gets you" },
  { id: "colleague", label: "My Colleague", icon: "handshake", subtitle: "Work friend or mentor" },
  { id: "daughter", label: "My Daughter", icon: "child_care", subtitle: "Your pride and joy" },
  { id: "someone", label: "Someone Special", icon: "card_giftcard", subtitle: "A person worth celebrating" },
];

const GIFT_MOMENTS = [
  { id: "birthday", label: "Her Birthday", icon: "cake" },
  { id: "new-beginning", label: "A New Beginning", icon: "eco" },
  { id: "just-because", label: "Just Because", icon: "volunteer_activism" },
  { id: "achievement", label: "She Achieved Something", icon: "emoji_events" },
  { id: "miss-her", label: "I Miss Her", icon: "mail" },
  { id: "sorry", label: "I Want to Say Sorry", icon: "spa" },
];

// --- Store Context ---
interface StoreContextType {
  products: MemoirProduct[];
  collections: MemoirCollection[];
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  checkoutUrl: string | null;
  isShopifyConnected: boolean;
  addToCart: (product: MemoirProduct, isGift?: boolean, giftMessage?: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  goToCheckout: () => void;
}

const StoreContext = createContext<StoreContextType>({
  products: FALLBACK_PRODUCTS,
  collections: [],
  cart: [],
  cartCount: 0,
  subtotal: 0,
  checkoutUrl: null,
  isShopifyConnected: false,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  goToCheckout: () => {},
});

const useStore = () => useContext(StoreContext);

// --- Utility ---
const formatPrice = (p: number) => `\u20B9${p.toLocaleString("en-IN")}`;

// --- Auth & User Persistence Layer ---
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface SavedAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface UserData {
  profile: UserProfile;
  wishlist: string[]; // product IDs
  addresses: SavedAddress[];
  cart: CartItem[];
}

const AUTH_KEY = "memoir_auth";
const USERS_KEY = "memoir_users";

function getStoredUsers(): Record<string, { password: string; data: UserData }> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
}

function saveStoredUsers(users: Record<string, { password: string; data: UserData }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getAuthEmail(): string | null {
  return localStorage.getItem(AUTH_KEY);
}

function setAuthEmail(email: string | null) {
  if (email) localStorage.setItem(AUTH_KEY, email);
  else localStorage.removeItem(AUTH_KEY);
}

function getUserData(email: string): UserData | null {
  const users = getStoredUsers();
  return users[email]?.data || null;
}

function saveUserData(email: string, data: Partial<UserData>) {
  const users = getStoredUsers();
  if (!users[email]) return;
  users[email].data = { ...users[email].data, ...data };
  saveStoredUsers(users);
}

// --- Auth Context ---
interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  wishlist: string[];
  addresses: SavedAddress[];
  login: (email: string, password: string) => string | null; // returns error or null
  signup: (name: string, email: string, phone: string, password: string) => string | null;
  logout: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addAddress: (addr: Omit<SavedAddress, "id">) => void;
  updateAddress: (id: string, addr: Partial<SavedAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => SavedAddress | undefined;
  updateProfile: (fields: Partial<UserProfile>) => void;
  savedCart: CartItem[];
  saveCart: (cart: CartItem[]) => void;
  loginWithGoogle: () => Promise<string | null>;
  loginWithPhone: (phone: string, recaptchaContainer: HTMLElement) => Promise<ConfirmationResult>;
  verifyOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null, isLoggedIn: false, wishlist: [], addresses: [],
  login: () => "Not initialized", signup: () => "Not initialized",
  logout: () => {}, toggleWishlist: () => {}, isWishlisted: () => false,
  addAddress: () => {}, updateAddress: () => {}, deleteAddress: () => {},
  setDefaultAddress: () => {}, getDefaultAddress: () => undefined,
  updateProfile: () => {}, savedCart: [], saveCart: () => {},
  loginWithGoogle: async () => "Not initialized",
  loginWithPhone: async () => { throw new Error("Not initialized"); },
  verifyOtp: async () => "Not initialized",
});
const useAuth = () => useContext(AuthContext);

function useAuthProvider() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [savedCart, setSavedCart] = useState<CartItem[]>([]);

  // Restore session on mount
  useEffect(() => {
    const email = getAuthEmail();
    if (!email) return;
    const data = getUserData(email);
    if (data) {
      setUser(data.profile);
      setWishlist(data.wishlist || []);
      setAddresses(data.addresses || []);
      setSavedCart(data.cart || []);
    }
  }, []);

  const login = useCallback((email: string, password: string): string | null => {
    const users = getStoredUsers();
    const entry = users[email.toLowerCase()];
    if (!entry) return "No account found with this email";
    if (entry.password !== password) return "Incorrect password";
    setAuthEmail(email.toLowerCase());
    setUser(entry.data.profile);
    setWishlist(entry.data.wishlist || []);
    setAddresses(entry.data.addresses || []);
    setSavedCart(entry.data.cart || []);
    return null;
  }, []);

  const signup = useCallback((name: string, email: string, phone: string, password: string): string | null => {
    const users = getStoredUsers();
    const key = email.toLowerCase();
    if (users[key]) return "An account with this email already exists";
    if (password.length < 6) return "Password must be at least 6 characters";
    const profile: UserProfile = {
      id: `user_${Date.now()}`,
      name, email: key, phone,
      createdAt: new Date().toISOString(),
    };
    users[key] = { password, data: { profile, wishlist: [], addresses: [], cart: [] } };
    saveStoredUsers(users);
    setAuthEmail(key);
    setUser(profile);
    setWishlist([]);
    setAddresses([]);
    setSavedCart([]);
    return null;
  }, []);

  const logout = useCallback(() => {
    setAuthEmail(null);
    setUser(null);
    setWishlist([]);
    setAddresses([]);
    setSavedCart([]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    if (!user) return;
    setWishlist(prev => {
      const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      saveUserData(user.email, { wishlist: next });
      return next;
    });
  }, [user]);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const addAddress = useCallback((addr: Omit<SavedAddress, "id">) => {
    if (!user) return;
    setAddresses(prev => {
      const newAddr: SavedAddress = { ...addr, id: `addr_${Date.now()}` };
      if (newAddr.isDefault) prev = prev.map(a => ({ ...a, isDefault: false }));
      const next = [...prev, newAddr];
      saveUserData(user.email, { addresses: next });
      return next;
    });
  }, [user]);

  const updateAddress = useCallback((id: string, fields: Partial<SavedAddress>) => {
    if (!user) return;
    setAddresses(prev => {
      let next = prev.map(a => a.id === id ? { ...a, ...fields } : a);
      if (fields.isDefault) next = next.map(a => ({ ...a, isDefault: a.id === id }));
      saveUserData(user.email, { addresses: next });
      return next;
    });
  }, [user]);

  const deleteAddress = useCallback((id: string) => {
    if (!user) return;
    setAddresses(prev => {
      const next = prev.filter(a => a.id !== id);
      saveUserData(user.email, { addresses: next });
      return next;
    });
  }, [user]);

  const setDefaultAddress = useCallback((id: string) => {
    if (!user) return;
    setAddresses(prev => {
      const next = prev.map(a => ({ ...a, isDefault: a.id === id }));
      saveUserData(user.email, { addresses: next });
      return next;
    });
  }, [user]);

  const getDefaultAddress = useCallback(() => addresses.find(a => a.isDefault) || addresses[0], [addresses]);

  const updateProfile = useCallback((fields: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    setUser(updated);
    saveUserData(user.email, { profile: updated });
  }, [user]);

  const saveCart = useCallback((cart: CartItem[]) => {
    if (!user) return;
    setSavedCart(cart);
    saveUserData(user.email, { cart });
  }, [user]);

  // --- Firebase: Google SSO ---
  const loginWithGoogle = useCallback(async (): Promise<string | null> => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const fbUser = result.user;
      const email = (fbUser.email || `google_${fbUser.uid}`).toLowerCase();
      const users = getStoredUsers();
      if (!users[email]) {
        const profile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || "Google User",
          email,
          phone: fbUser.phoneNumber || "",
          createdAt: new Date().toISOString(),
        };
        users[email] = { password: `__firebase_${fbUser.uid}__`, data: { profile, wishlist: [], addresses: [], cart: [] } };
        saveStoredUsers(users);
      } else {
        // Update display name and photo if available
        const existing = users[email].data.profile;
        if (fbUser.displayName && existing.name !== fbUser.displayName) {
          existing.name = fbUser.displayName;
          saveStoredUsers(users);
        }
      }
      setAuthEmail(email);
      setUser(users[email].data.profile);
      setWishlist(users[email].data.wishlist || []);
      setAddresses(users[email].data.addresses || []);
      setSavedCart(users[email].data.cart || []);
      return null;
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") return "Sign-in popup was closed";
      return err?.message || "Google sign-in failed";
    }
  }, []);

  // --- Firebase: Phone OTP ---
  const loginWithPhone = useCallback(async (phoneNumber: string, recaptchaContainer: HTMLElement): Promise<ConfirmationResult> => {
    // Clear any existing recaptcha
    if ((window as any).__memoir_recaptcha) {
      (window as any).__memoir_recaptcha.clear();
      (window as any).__memoir_recaptcha = null;
    }
    recaptchaContainer.innerHTML = "";
    const recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, recaptchaContainer, { size: "invisible" });
    (window as any).__memoir_recaptcha = recaptchaVerifier;
    const confirmation = await signInWithPhoneNumber(firebaseAuth, phoneNumber, recaptchaVerifier);
    return confirmation;
  }, []);

  const verifyOtp = useCallback(async (confirmationResult: ConfirmationResult, otp: string): Promise<string | null> => {
    try {
      const result = await confirmationResult.confirm(otp);
      const fbUser = result.user;
      const key = (fbUser.phoneNumber || `phone_${fbUser.uid}`).toLowerCase();
      const users = getStoredUsers();
      if (!users[key]) {
        const profile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || "User",
          email: fbUser.email || "",
          phone: fbUser.phoneNumber || key,
          createdAt: new Date().toISOString(),
        };
        users[key] = { password: `__firebase_${fbUser.uid}__`, data: { profile, wishlist: [], addresses: [], cart: [] } };
        saveStoredUsers(users);
      }
      setAuthEmail(key);
      setUser(users[key].data.profile);
      setWishlist(users[key].data.wishlist || []);
      setAddresses(users[key].data.addresses || []);
      setSavedCart(users[key].data.cart || []);
      return null;
    } catch (err: any) {
      if (err?.code === "auth/invalid-verification-code") return "Invalid OTP code";
      if (err?.code === "auth/code-expired") return "OTP has expired, please resend";
      return err?.message || "OTP verification failed";
    }
  }, []);

  return {
    user, isLoggedIn: !!user, wishlist, addresses,
    login, signup, logout, toggleWishlist, isWishlisted,
    addAddress, updateAddress, deleteAddress, setDefaultAddress, getDefaultAddress,
    updateProfile, savedCart, saveCart,
    loginWithGoogle, loginWithPhone, verifyOtp,
  };
}

// --- Auth Modal ---
function AuthModal({ isOpen, onClose, initialMode = "login" }: {
  isOpen: boolean; onClose: () => void; initialMode?: "login" | "signup";
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const auth = useAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError("");
      setOtpSent(false);
      setOtpDigits(["", "", "", "", "", ""]);
      setConfirmationResult(null);
      setPhoneNumber("");
      setGoogleLoading(false);
      setPhoneLoading(false);
      setOtpLoading(false);
    }
  }, [isOpen, initialMode]);

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if ((window as any).__memoir_recaptcha) {
        try { (window as any).__memoir_recaptcha.clear(); } catch {}
        (window as any).__memoir_recaptcha = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const err = auth.login(email, password);
      if (err) setError(err); else onClose();
    } else {
      if (!name.trim()) { setError("Please enter your name"); return; }
      if (!email.trim()) { setError("Please enter your email"); return; }
      const err = auth.signup(name.trim(), email.trim(), phone.trim(), password);
      if (err) setError(err); else onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const err = await auth.loginWithGoogle();
      if (err) setError(err); else onClose();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setPhoneLoading(true);
    try {
      const fullNumber = `+91${phoneNumber.replace(/\D/g, "").slice(-10)}`;
      const confirmation = await auth.loginWithPhone(fullNumber, recaptchaRef.current!);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setOtpDigits(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    const otp = otpDigits.join("");
    if (otp.length !== 6) { setError("Please enter all 6 digits"); return; }
    if (!confirmationResult) { setError("Please send OTP first"); return; }
    setOtpLoading(true);
    try {
      const err = await auth.verifyOtp(confirmationResult, otp);
      if (err) setError(err); else onClose();
    } finally {
      setOtpLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", border: "1px solid var(--outline-variant)",
    background: "white", fontSize: 14, fontFamily: "'DM Sans', sans-serif", borderRadius: 0,
    outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
  };

  const dividerStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 12, margin: "4px 0",
  };

  const dividerLineStyle: React.CSSProperties = {
    flex: 1, height: 1, background: "var(--outline-variant)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
    color: "var(--on-surface-variant)", display: "block", marginBottom: 6,
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "min(420px, 90vw)", maxHeight: "90vh", background: "var(--ivory)", zIndex: 1001,
        boxShadow: "0 24px 80px rgba(0,0,0,0.15)", overflow: "auto",
      }}>
        {/* Header */}
        <div style={{ padding: "32px 32px 0", textAlign: "center" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8, fontWeight: 500 }}>Memoir</p>
          <h2 className="font-serif" style={{ fontSize: 26, fontWeight: 400, marginBottom: 4 }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>
            {mode === "login" ? "Sign in to access your wishlist and orders" : "Join to save your favourites and track orders"}
          </p>
        </div>

        <div style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* --- 1. Google Sign-In --- */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            style={{
              width: "100%", padding: "14px 16px", background: "white", border: "1px solid var(--outline-variant)",
              cursor: googleLoading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--on-surface)",
              transition: "background 0.2s, box-shadow 0.2s", borderRadius: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f5f5f5"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
          >
            {/* Google "G" SVG */}
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* --- Divider --- */}
          <div style={dividerStyle}>
            <div style={dividerLineStyle} />
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--outline)", fontWeight: 500 }}>or</span>
            <div style={dividerLineStyle} />
          </div>

          {/* --- 3. Email/Password (de-emphasized) --- */}
          <details style={{ borderTop: "none" }}>
            <summary style={{
              cursor: "pointer", fontSize: 13, color: "var(--on-surface-variant)", textAlign: "center",
              listStyle: "none", padding: "4px 0", userSelect: "none",
            }}>
              <span style={{ borderBottom: "1px dashed var(--outline-variant)", paddingBottom: 1 }}>
                {mode === "login" ? "Sign in with email & password" : "Sign up with email & password"}
              </span>
            </summary>
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {mode === "signup" && (
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                </div>
              )}
              <div>
                <label style={labelStyle}>Email *</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" type="email" style={inputStyle} />
              </div>
              {mode === "signup" && (
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" style={inputStyle} />
                </div>
              )}
              <div>
                <label style={labelStyle}>Password *</label>
                <div style={{ position: "relative" }}>
                  <input value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === "signup" ? "Min 6 characters" : "Your password"} type={showPassword ? "text" : "password"} style={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--on-surface-variant)",
                  }}>
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} />
                  </button>
                </div>
              </div>
              <button type="submit" style={{
                width: "100%", padding: "14px", background: "var(--primary)", color: "white", border: "none",
                fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                opacity: 0.85,
              }}>
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </details>

          {/* Error */}
          {error && (
            <p style={{ fontSize: 12, color: "#c0392b", background: "rgba(192,57,43,0.06)", padding: "10px 14px", margin: 0 }}>{error}</p>
          )}

          {/* Toggle login/signup */}
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--on-surface-variant)", marginTop: 2 }}>
            {mode === "login" ? "Don\u2019t have an account? " : "Already have an account? "}
            <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setOtpSent(false); }}
              style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: 13, fontWeight: 600, textDecoration: "underline" }}>
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* Hidden reCAPTCHA container */}
          <div id="recaptcha-container" ref={recaptchaRef} style={{ display: "none" }} />
        </div>

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none",
          cursor: "pointer", color: "var(--on-surface-variant)",
        }}>
          <Icon name="close" size={22} />
        </button>
      </div>
    </>
  );
}

// --- Styles ---
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
  :root {
    --ivory: #FAF7F2;
    --charcoal: #2C2C2C;
    --gold: #C9A96E;
    --gold-text: #8B7340;
    --taupe: #B5A69A;
    --primary: #755939;
    --surface: #FAF7F2;
    --surface-dim: #F0EDE8;
    --surface-container: #EFEEEB;
    --on-surface: #1a1c1a;
    --on-surface-variant: #4A4440;
    --outline: #80756B;
    --outline-variant: #D2C4B8;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  button { color: inherit; }
  a { color: inherit; }
  body, #root {
    font-family: 'DM Sans', sans-serif;
    background: var(--ivory);
    color: var(--charcoal);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  .font-serif { font-family: 'Cormorant Garamond', serif; }
  .font-handwritten { font-family: 'Cormorant Garamond', serif; font-style: italic; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-100%); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .stagger-1 { animation-delay: 0.1s; opacity: 0; }
  .stagger-2 { animation-delay: 0.2s; opacity: 0; }
  .stagger-3 { animation-delay: 0.3s; opacity: 0; }
  .stagger-4 { animation-delay: 0.4s; opacity: 0; }
  .stagger-5 { animation-delay: 0.6s; opacity: 0; }
  @keyframes se-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-6px); } }
  @keyframes hero-peek-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.6; }
  }
  .hero-peek-strip { transition: transform 0.3s ease, opacity 0.3s ease; }
  .hero-peek-strip:hover { transform: translateY(-50%) translateX(-4px) !important; opacity: 0.9 !important; }
  @media (max-width: 480px) {
    .hero-peek-strip { padding: 12px 6px !important; }
  }
  .hover-lift { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(26,28,26,0.08); }
  .desktop-gallery:hover .gallery-arrow { opacity: 1 !important; }
  .gallery-nav-btn:hover .gallery-arrow { transform: scale(1.1); }
  .img-zoom { overflow: hidden; }
  .img-zoom img { transition: transform 0.7s ease; }
  .img-zoom:hover img { transform: scale(1.05); }

  /* Scroll reveal */
  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

  /* Accordion arrow rotation */
  details summary .accordion-icon { transition: transform 0.3s ease; }
  details[open] summary .accordion-icon { transform: rotate(180deg); }

  /* Consistent button radius */
  .btn { border-radius: 0; }

  /* Skeleton pulse */
  .skeleton-pulse { background: linear-gradient(90deg, var(--surface-dim) 25%, var(--surface-container) 50%, var(--surface-dim) 75%); background-size: 200% 100%; animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* Back to top */
  .back-to-top { position: fixed; bottom: 24px; right: 24px; width: 40px; height: 40px; border-radius: 0; background: var(--charcoal); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 50; opacity: 0; transform: translateY(10px); transition: opacity 0.3s ease, transform 0.3s ease; pointer-events: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .line-reveal { position: relative; overflow: hidden; }
  .line-reveal::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.4s ease;
  }
  .line-reveal:hover::after { width: 100%; }
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--gold) !important;
  }
  ::selection { background: rgba(201,169,110,0.2); }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  /* --- Mobile: Hide desktop nav, show hamburger --- */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
  }
  @media (min-width: 769px) {
    .mobile-nav { display: none !important; }
  }

  /* --- Tablet: Product layout adjusts --- */
  @media (max-width: 968px) {
    .product-layout { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
  }

  /* --- Mobile-first responsive overrides --- */
  @media (max-width: 768px) {
    /* Grids stack to single column */
    .product-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
    .product-layout > div:last-child { position: static !important; max-height: none !important; overflow: visible !important; }
    .story-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .unbox-grid { grid-template-columns: 1fr !important; }
    .unbox-item { transform: none !important; }
    .gift-grid { grid-template-columns: 1fr !important; }
    .moments-grid { grid-template-columns: 1fr !important; }
    .bestseller-grid { grid-template-columns: 1fr !important; }
    .products-grid { grid-template-columns: 1fr !important; }
    .related-grid { grid-template-columns: 1fr !important; }
    .care-grid { grid-template-columns: 1fr !important; }
    .shipping-cards { grid-template-columns: 1fr !important; }
    .return-steps { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .wishlist-grid { grid-template-columns: 1fr !important; }
    .address-grid { grid-template-columns: 1fr !important; }
    .search-results { grid-template-columns: 1fr !important; }

    /* Reduce section padding */
    .section-padding { padding-top: 56px !important; padding-bottom: 56px !important; }
    .section-padding-lg { padding-top: 64px !important; padding-bottom: 64px !important; }
    .content-padding { padding-left: 20px !important; padding-right: 20px !important; }

    /* Header */
    .header-inner { padding: 14px 16px !important; }
    .header-logo { font-size: 22px !important; }
    .header-icons { gap: 14px !important; }

    /* Hero */
    .hero-content { padding: 0 20px !important; padding-bottom: 100px !important; }
    .hero-text { max-width: 100% !important; }
    .hero-buttons { flex-direction: row !important; }
    .hero-buttons button { padding: 14px 28px !important; flex: 1; }
    /* hero-bg img positions now set per-image via JS */
    .hero-overlay { background: linear-gradient(to top, rgba(250,247,242,0.95) 0%, rgba(250,247,242,0.5) 35%, rgba(250,247,242,0.1) 55%, transparent 100%) !important; }

    /* Trust strip */
    .trust-strip { padding: 12px 16px !important; gap: 12px !important; }
    .trust-strip span { font-size: 9px !important; letter-spacing: 0.06em !important; }

    /* Back to top - mobile position */
    .back-to-top { bottom: 80px !important; right: 16px !important; width: 36px; height: 36px; }

    /* Section headings */
    .section-heading { margin-bottom: 32px !important; }

    /* Moment cards */
    .moment-card-overlay { padding: 20px !important; }
    .moment-card-title { font-size: 24px !important; }

    /* Product cards */
    .product-card-img { aspect-ratio: 4/5 !important; }

    /* Product page: show swipe carousel, hide grid */
    .mobile-gallery { display: block !important; }
    .desktop-gallery { display: none !important; }

    /* Brand story rotated image */
    .story-image { transform: none !important; }
    .story-caption { position: static !important; text-align: center; margin-top: 12px; transform: none !important; }

    /* Social proof */
    .social-proof { padding: 56px 20px !important; }
    .social-proof h2 { font-size: 24px !important; }

    /* Gift guide */
    .gift-recommend-card { grid-template-columns: 100px 1fr !important; gap: 14px !important; padding: 12px !important; }

    /* About page */
    .about-quote { padding: 24px !important; }

    /* Care & Shipping pages */
    .info-card { padding: 20px !important; }

    /* Cart drawer */
    .cart-drawer { width: 100vw !important; }
    .cart-drawer-inner { padding: 20px 16px !important; }

    /* Search & Gift modals — full screen on mobile */
    .search-modal { width: 100% !important; max-width: 100% !important; max-height: 100vh !important; height: 100vh !important; border-radius: 0 !important; }
    .gift-modal { width: 100% !important; max-width: 100% !important; max-height: 100vh !important; height: 100vh !important; border-radius: 0 !important; }
    .modal-fullscreen { padding-top: 0 !important; align-items: stretch !important; }
    .search-input { font-size: 15px !important; }

    /* Profile page */
    .profile-header { padding: 32px 20px !important; }
    .profile-header-inner { flex-direction: column !important; text-align: center; }
    .profile-avatar { width: 64px !important; height: 64px !important; }
    .profile-tabs button { padding: 12px 8px !important; font-size: 10px !important; }
    .profile-tabs .tab-icon { display: none !important; }
    .profile-content { padding: 24px 20px !important; }
    .order-card { padding: 16px !important; }
    .order-items { flex-direction: column !important; }

    /* Footer */
    .footer-inner { padding: 48px 20px !important; }

    /* General text size adjustments */
    .mobile-text-sm { font-size: 13px !important; }
    .mobile-heading { font-size: 28px !important; }

    /* Reduce large gaps */
    .gap-responsive { gap: 24px !important; }

    /* Full width buttons on mobile */
    .mobile-full-width { width: 100% !important; }

    /* Scroll horizontal on mobile for filter buttons */
    .filter-scroll { flex-wrap: nowrap !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch; padding-bottom: 8px !important; justify-content: flex-start !important; padding-left: 20px !important; padding-right: 20px !important; }
    .filter-scroll::-webkit-scrollbar { display: none; }
    .filter-scroll button { font-size: 9px !important; padding: 6px 14px !important; }

    /* Sticky add-to-cart bar */
    .sticky-cta { position: fixed !important; bottom: 0 !important; left: 0 !important; right: 0 !important; z-index: 40 !important; background: var(--ivory) !important; padding: 16px 20px !important; padding-bottom: calc(16px + env(safe-area-inset-bottom, 20px)) !important; border-top: 1px solid var(--outline-variant) !important; box-shadow: 0 -4px 20px rgba(0,0,0,0.08) !important; }
    .sticky-mobile-cart { display: flex !important; }
    .back-to-top { bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important; }
    .order-summary-toggle { display: flex !important; }
    .order-summary-title { display: none !important; }
    .order-summary-details:not([open]) + div { display: none; }

    /* Hide hover effects on touch */
    .hover-lift:hover { transform: none; box-shadow: none; }
    .img-zoom:hover img { transform: none; }
    .line-reveal:hover::after { width: 0; }
  }

  /* Small phones */
  @media (max-width: 380px) {
    .header-inner { padding: 12px 12px !important; }
    .header-icons { gap: 10px !important; }
    .content-padding { padding-left: 16px !important; padding-right: 16px !important; }
    .hero-buttons { flex-direction: column !important; width: 100%; }
    .hero-buttons button { width: 100% !important; text-align: center !important; justify-content: center !important; }
  }
`;

// --- Icon Component ---
function Icon({ name, size = 24, filled = false }: { name: string; className?: string; size?: number; filled?: boolean; style?: React.CSSProperties }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' 24`,
        verticalAlign: "middle",
      }}
    >
      {name}
    </span>
  );
}

// --- Header ---
function Header({ currentPage, navigate, cartCount, onCartClick, onSearchClick, onGiftGuideClick }: {
  currentPage: string;
  navigate: (page: string, param?: string | null) => void;
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  onGiftGuideClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Shop by Moment", page: "moments" },
    { label: "Find a Gift", page: "gift-guide" },
    { label: "Our Story", page: "about" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: scrolled ? "rgba(250,247,242,0.92)" : "rgba(250,247,242,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(210,196,184,0.3)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="header-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span className="font-serif header-logo" style={{ fontSize: 26, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500 }}>
              Memoir
            </span>
          </button>
          <nav style={{ display: "flex", gap: 28 }} className="desktop-nav">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => l.page === "gift-guide" ? onGiftGuideClick() : navigate(l.page)}
                className="font-serif line-reveal"
                style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 15, fontStyle: "italic",
                  color: currentPage === l.page ? "var(--charcoal)" : "var(--on-surface-variant)",
                  letterSpacing: "0.01em", paddingBottom: 2,
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="header-icons" style={{ display: "flex", alignItems: "center", gap: 20, color: "var(--charcoal)" }}>
          <button onClick={onSearchClick} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
            <Icon name="search" size={22} />
          </button>
          <button onClick={() => navigate("profile")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
            <Icon name="person_outline" size={22} />
          </button>
          <button onClick={onCartClick} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: "inherit" }}>
            <Icon name="shopping_bag" size={22} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -6, width: 16, height: 16, borderRadius: "50%",
                background: "var(--primary)", color: "white", fontSize: 9,
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600,
              }}>
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "inherit" }}
            className="mobile-menu-btn"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div style={{ padding: "0 32px 24px", display: "flex", flexDirection: "column", gap: 16 }} className="mobile-nav">
          {navLinks.map((l) => (
            <button
              key={l.page}
              onClick={() => { l.page === "gift-guide" ? onGiftGuideClick() : navigate(l.page); setMobileMenuOpen(false); }}
              className="font-serif"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", textAlign: "left" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// --- Trust Strip ---
function TrustStrip() {
  const items = ["925 Sterling Silver", "BIS Hallmarked", "Premium Gift Packaging", "Free Shipping Above \u20B91,999", "Handcrafted in India"];
  return (
    <div className="trust-strip" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, padding: "14px 32px", background: "var(--surface-dim)", flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--on-surface-variant)", fontWeight: 500 }}>
          {item}
          {i < items.length - 1 && <span style={{ marginLeft: 24, opacity: 0.3 }}>&middot;</span>}
        </span>
      ))}
    </div>
  );
}

// --- Product Card ---
function ProductCard({ product, navigate, onAddToCart, style: cardStyle = {} }: {
  product: MemoirProduct;
  navigate: (page: string, param?: string | null) => void;
  onAddToCart?: (p: MemoirProduct) => void;
  style?: React.CSSProperties;
}) {
  const [added, setAdded] = useState(false);
  const auth = useAuth();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart && !added) {
      onAddToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    auth.toggleWishlist(product.id);
  };

  const wishlisted = auth.isWishlisted(product.id);

  return (
    <div className="hover-lift" style={{ cursor: "pointer", position: "relative", ...cardStyle }} onClick={() => navigate("product", product.id)}>
      <div className="img-zoom" style={{ aspectRatio: "3/4", background: "var(--surface-container)", marginBottom: 16, position: "relative" }}>
        <img src={product.images[0]} alt={product.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Wishlist heart */}
        {auth.isLoggedIn && (
          <button onClick={handleWishlist} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} style={{
            position: "absolute", top: 12, right: 12, width: 36, height: 36,
            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)",
            border: "none", borderRadius: "50%", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease", color: wishlisted ? "#c0392b" : "var(--on-surface-variant)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          }}>
            <Icon name={wishlisted ? "favorite" : "favorite_border"} size={18} filled={wishlisted} />
          </button>
        )}
        {onAddToCart && (
          <button
            onClick={handleQuickAdd}
            style={{
              position: "absolute", bottom: 12, right: 12,
              width: 40, height: 40, background: added ? "#2d5a2d" : "var(--ivory)",
              border: added ? "none" : "1px solid var(--outline-variant)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease", color: added ? "white" : "var(--charcoal)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => { if (!added) { e.currentTarget.style.background = "var(--charcoal)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--charcoal)"; } }}
            onMouseLeave={(e) => { if (!added) { e.currentTarget.style.background = "var(--ivory)"; e.currentTarget.style.color = "var(--charcoal)"; e.currentTarget.style.borderColor = "var(--outline-variant)"; } }}
            aria-label="Quick add to cart"
          >
            <Icon name={added ? "check" : "add_shopping_cart"} size={18} />
          </button>
        )}
      </div>
      <div style={{ padding: "0 4px" }}>
        {product.tags[0] && (
          <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 6, display: "block" }}>
            {product.tags[0]}
          </span>
        )}
        <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4, color: "var(--charcoal)" }}>{product.name}</h3>
        <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{product.type}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 400 }}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span style={{ fontSize: 13, color: "var(--on-surface-variant)", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAGES
// ============================================================

function HomePage({ navigate }: { navigate: (page: string, param?: string | null) => void; onAddToCart: Function }) {
  const { products, collections } = useStore();

  // Hero carousel — fetches images + per-image positions from "hero-images" product
  const FALLBACK_SLIDES = [{ url: "https://cdn.shopify.com/s/files/1/0779/8459/6004/files/Gemini_Generated_Image_t8ku8ot8ku8ot8ku.png?v=1774874845", mobilePosition: "80% 50%", desktopPosition: "70% 50%" }];
  const [heroSlides, setHeroSlides] = useState(FALLBACK_SLIDES);
  const [heroIdx, setHeroIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchHeroSlides().then((slides) => {
      if (slides.length > 0) setHeroSlides(slides);
    }).catch(() => {});
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div>
      {/* Hero Carousel */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <div className="hero-bg" style={{ position: "absolute", inset: 0 }}>
          {heroSlides.map((slide, i) => (
            <img
              key={slide.url}
              src={slide.url}
              alt={`Memoir hero ${i + 1}`}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: isMobile ? slide.mobilePosition : slide.desktopPosition,
                filter: "brightness(0.97) saturate(0.92)",
                opacity: i === heroIdx ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          ))}
          <div className="hero-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(250,247,242,0.6) 0%, rgba(250,247,242,0.15) 40%, transparent 60%), linear-gradient(to top, rgba(250,247,242,0.92) 0%, rgba(250,247,242,0.3) 30%, transparent 55%)" }} />
        </div>
        <div className="hero-content content-padding" style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: 80 }}>
          <div className="hero-text" style={{ maxWidth: 600 }}>
            <h1 className="font-serif animate-fade-up stagger-1" style={{ fontSize: "clamp(38px, 5.5vw, 64px)", lineHeight: 1.05, fontWeight: 400, color: "var(--charcoal)", marginBottom: 16, letterSpacing: "-0.01em" }}>
              Jewellery, designed<br />around moments
            </h1>
            <p className="animate-fade-up stagger-2" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--on-surface-variant)", marginBottom: 32, maxWidth: 380 }}>
              925 sterling silver, handcrafted for the moments worth remembering.
            </p>
            <div className="animate-fade-up stagger-3 hero-buttons" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={() => navigate("moments")}
                style={{
                  padding: "15px 40px", background: "var(--charcoal)", color: "white", border: "none",
                  fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--charcoal)")}
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate("gift-guide")}
                style={{
                  padding: "15px 40px", background: "transparent", color: "var(--charcoal)",
                  border: "1px solid var(--charcoal)", fontSize: 11, letterSpacing: "0.18em",
                  textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "var(--charcoal)"; (e.target as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "var(--charcoal)"; }}
              >
                Find a Gift
              </button>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        {heroSlides.length > 1 && (
          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", gap: 8 }}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                style={{
                  width: i === heroIdx ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === heroIdx ? "var(--charcoal)" : "rgba(44,44,44,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Scroll Experience peek strip — hidden for now
        <div
          className="hero-peek-strip"
          onClick={() => (window as any).scrollExperience?.open("ring")}
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
            zIndex: 3, cursor: "pointer",
            background: "rgba(44,44,44,0.18)", backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "16px 8px", borderRadius: "6px 0 0 6px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            opacity: 0.5,
            animation: "hero-peek-pulse 4s ease-in-out infinite",
          }}
        >
          <span className="material-symbols-outlined" style={{
            fontSize: 14, color: "rgba(44,44,44,0.6)",
          }}>chevron_left</span>
        </div>
        */}
      </section>

      <TrustStrip />

      {/* Shop by Moment — dynamic from Shopify collections */}
      <section className="section-padding content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 10 }}>
              Shop by Moment
            </span>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 400, color: "var(--charcoal)" }}>
              What&apos;s her moment?
            </h2>
          </div>
          <button
            onClick={() => navigate("moments")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "var(--on-surface-variant)", fontWeight: 600, whiteSpace: "nowrap",
              borderBottom: "1px solid var(--outline-variant)", paddingBottom: 4,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--charcoal)"; (e.target as HTMLElement).style.borderColor = "var(--charcoal)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--on-surface-variant)"; (e.target as HTMLElement).style.borderColor = "var(--outline-variant)"; }}
          >
            View All
          </button>
        </div>
        {/* Horizontal scroll strip — 6 collections as a single scrollable row */}
        <div className="moments-grid no-scrollbar" style={{
          display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory",
          paddingBottom: 8, margin: "0 -32px", padding: "0 32px 8px",
        }}>
          {(collections.length > 0 ? collections : MOMENTS.map((m) => ({ id: m.id, handle: m.id, name: m.name, tagline: m.tagline, image: null as string | null, productHandles: [] as string[] }))).map((col) => {
            const colImage = col.image || products.find((p) => p.moment === col.id)?.images[0];
            return (
              <div
                key={col.id}
                style={{ flex: "0 0 calc(33.333% - 11px)", minWidth: 200, cursor: "pointer", scrollSnapAlign: "start" }}
                onClick={() => navigate("moment", col.handle)}
              >
                <div className="img-zoom" style={{ aspectRatio: "3/4", overflow: "hidden", background: "var(--surface-container)", position: "relative", marginBottom: 14 }}>
                  {colImage && (
                    <img
                      src={colImage}
                      alt={col.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                  {/* Subtle bottom gradient for text readability */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                    <h3 className="font-serif" style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 400, color: "white", lineHeight: 1.2 }}>{col.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding" style={{ background: "var(--surface-container)", padding: "96px 0" }}>
        <div className="content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 12 }}>
                Curated for You
              </span>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>Our Most Loved Pieces</h2>
            </div>
            <button
              onClick={() => navigate("moments")}
              className="line-reveal"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--on-surface-variant)", paddingBottom: 4, fontWeight: 500 }}
            >
              View All
            </button>
          </div>
          <div className="bestseller-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 32 }}>
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="story-grid">
          <div>
            <span className="font-handwritten" style={{ fontSize: 20, color: "var(--gold)", display: "block", marginBottom: 16 }}>Our Story</span>
            <h2 className="font-serif" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2, marginBottom: 24 }}>
              We started Memoir because we were tired of gifting jewellery that meant nothing.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--on-surface-variant)", marginBottom: 24 }}>
              Every piece we make is designed around a moment worth remembering. Not a trend, not a season — a moment. Because jewellery should carry a story, not just a price tag.
            </p>
            <button
              onClick={() => navigate("about")}
              className="line-reveal"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--primary)", paddingBottom: 4, fontWeight: 600 }}
            >
              Read Our Story
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <div className="story-image" style={{ transform: "rotate(2deg)", background: "white", padding: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
              <img src={FALLBACK_PRODUCTS[5].images[0]} alt="Memoir story" loading="lazy" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", filter: "saturate(0.9)" }} />
            </div>
            <div className="font-handwritten story-caption" style={{ position: "absolute", bottom: -20, right: -10, fontSize: 24, color: "var(--gold)", transform: "rotate(-3deg)" }}>
              Moments, not things &hearts;
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof" style={{ background: "var(--charcoal)", padding: "96px 32px", textAlign: "center" }}>
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 16 }}>
          Designed to be gifted. Kept forever.
        </span>
        <h2 className="font-serif" style={{ fontSize: 32, color: "white", fontWeight: 300, fontStyle: "italic", maxWidth: 600, margin: "0 auto 48px" }}>
          &ldquo;I&apos;ve never seen her react to a gift like that. She actually cried.&rdquo;
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.1em" }}>— Rahul, who gifted The First Chapter to his sister</p>
      </section>
    </div>
  );
}

function MomentsPage({ navigate, momentId = null }: {
  navigate: (page: string, param?: string | null) => void;
  onAddToCart: Function;
  momentId?: string | null;
}) {
  const { products, collections } = useStore();
  // Use Shopify collections if available, fall back to hardcoded MOMENTS
  const allCollections = collections.length > 0
    ? collections
    : MOMENTS.map((m) => ({ id: m.id, handle: m.id, name: m.name, tagline: m.tagline, image: null as string | null, productHandles: [] as string[] }));
  const activeCollection = momentId ? allCollections.find((c) => c.handle === momentId || c.id === momentId) : null;

  // Filter products by collection — match by handle membership or fallback moment field
  const filteredProducts = momentId
    ? (activeCollection?.productHandles?.length
        ? products.filter((p) => activeCollection.productHandles.includes(p.handle))
        : products.filter((p) => p.moment === momentId))
    : products;

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 32px", textAlign: "center" }}>
        {activeCollection ? (
          <>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 12 }}>Shop the Moment</span>
            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, marginBottom: 16 }}>{activeCollection.name}</h1>
            <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)", maxWidth: 500, margin: "0 auto", height: 54, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>{activeCollection.tagline}</p>
          </>
        ) : (
          <>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 12 }}>All Pieces</span>
            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, marginBottom: 16 }}>Shop by Moment</h1>
            <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)", maxWidth: 500, margin: "0 auto", height: 54 }}>Every piece is designed around a moment worth remembering.</p>
          </>
        )}
      </section>

      <div className="filter-scroll no-scrollbar" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {[{ id: null, handle: null, name: "All" } as any, ...allCollections].map((c: any) => {
          const isActive = c.handle === null ? !momentId : momentId === c.handle || momentId === c.id;
          return (
            <button
              key={c.handle || "all"}
              onClick={() => c.handle === null ? navigate("moments") : navigate("moment", c.handle)}
              style={{
                padding: "7px 16px",
                borderRadius: 0,
                border: "none",
                background: isActive ? "var(--charcoal)" : "var(--surface-dim)",
                color: isActive ? "white" : "var(--on-surface-variant)",
                fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer",
                transition: "all 0.3s ease", whiteSpace: "nowrap",
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="content-padding section-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductPage({ productId, navigate, onAddToCart }: {
  productId: string | null;
  navigate: (page: string, param?: string | null) => void;
  onAddToCart: (product: MemoirProduct, isGift: boolean, giftMessage: string) => void;
}) {
  const { products } = useStore();
  const product = products.find((p) => p.id === productId) || products[0];
  const [activeImage, setActiveImage] = useState(0);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  // Split images: first 5 = product gallery, 6+ = unboxing ritual
  const galleryImages = product.images.slice(0, 5);
  const ritualImages = product.images.slice(5);

  const relatedProducts = products.filter((p) => p.id !== product.id && p.moment === product.moment).slice(0, 2);
  if (relatedProducts.length < 2) {
    products.filter((p) => p.id !== product.id && !relatedProducts.find((r) => r.id === p.id))
      .slice(0, 2 - relatedProducts.length)
      .forEach((p) => relatedProducts.push(p));
  }

  const handleAddToCart = () => {
    onAddToCart(product, isGift, giftMessage);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Reset state when product changes
  useEffect(() => {
    setActiveImage(0);
    setIsGift(false);
    setGiftMessage("");
    setAddedToCart(false);
  }, [productId]);

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px" }}>
        <nav style={{ display: "flex", gap: 8, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: 32 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit", letterSpacing: "inherit" }}>Shop</button>
          <span>/</span>
          <button onClick={() => navigate("moment", product.moment)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit", letterSpacing: "inherit" }}>{product.momentLabel}</button>
          <span>/</span>
          <span style={{ color: "var(--charcoal)" }}>{product.name}</span>
        </nav>

        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 64 }} className="product-layout">
          {/* Gallery — swipeable on mobile, grid on desktop */}
          <div>
            {/* Mobile swipe carousel */}
            <div className="mobile-gallery" style={{ display: "none" }}>
              <div
                style={{ position: "relative", overflow: "hidden", background: "var(--surface-container)" }}
                onTouchStart={(e) => {
                  const t = e.currentTarget;
                  (t as any)._touchStartX = e.touches[0].clientX;
                  (t as any)._touchStartY = e.touches[0].clientY;
                }}
                onTouchEnd={(e) => {
                  const t = e.currentTarget;
                  const startX = (t as any)._touchStartX;
                  const startY = (t as any)._touchStartY;
                  if (startX == null) return;
                  const dx = e.changedTouches[0].clientX - startX;
                  const dy = e.changedTouches[0].clientY - startY;
                  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                    if (dx < 0 && activeImage < galleryImages.length - 1) setActiveImage(activeImage + 1);
                    if (dx > 0 && activeImage > 0) setActiveImage(activeImage - 1);
                  }
                }}
              >
                <div style={{
                  display: "flex",
                  transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  transform: `translateX(-${activeImage * 100}%)`,
                }}>
                  {galleryImages.map((img, i) => (
                    <div key={i} style={{ minWidth: "100%", aspectRatio: "4/5" }}>
                      <img src={img} alt={i === 0 ? product.name : ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
                {/* Dot indicators */}
                <div style={{
                  position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: 8,
                }}>
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: activeImage === i ? 20 : 8, height: 3,
                        borderRadius: 0,
                        background: activeImage === i ? "var(--gold)" : "rgba(255,255,255,0.5)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(4px)",
                      }}
                    />
                  ))}
                </div>
                {/* Swipe hint text — fades after first swipe */}
                {activeImage === 0 && (
                  <div style={{
                    position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
                    fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap",
                    animation: "fadeIn 1s ease 1.5s forwards", opacity: 0,
                  }}>
                    Swipe for more
                  </div>
                )}
              </div>
            </div>

            {/* Desktop gallery — single image with arrows + counter */}
            <div className="desktop-gallery" style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "var(--surface-container)", position: "relative" }}>
                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s ease" }}
                />
                {/* Left/right click zones */}
                {activeImage > 0 && (
                  <button
                    onClick={() => setActiveImage(activeImage - 1)}
                    className="gallery-nav-btn"
                    style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: "40%",
                      background: "transparent", border: "none", cursor: "w-resize",
                      display: "flex", alignItems: "center", paddingLeft: 20,
                    }}
                  >
                    <span className="gallery-arrow" style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--charcoal)", opacity: 0,
                      transition: "opacity 0.3s ease",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </span>
                  </button>
                )}
                {activeImage < galleryImages.length - 1 && (
                  <button
                    onClick={() => setActiveImage(activeImage + 1)}
                    className="gallery-nav-btn"
                    style={{
                      position: "absolute", right: 0, top: 0, bottom: 0, width: "40%",
                      background: "transparent", border: "none", cursor: "e-resize",
                      display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 20,
                    }}
                  >
                    <span className="gallery-arrow" style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--charcoal)", opacity: 0,
                      transition: "opacity 0.3s ease",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </span>
                  </button>
                )}
              </div>
              {/* Minimal counter + dots below image */}
              {galleryImages.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 0" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        style={{
                          width: activeImage === i ? 18 : 6, height: 2,
                          background: activeImage === i ? "var(--charcoal)" : "var(--outline-variant)",
                          border: "none", cursor: "pointer", padding: 0,
                          transition: "all 0.35s ease", borderRadius: 0,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: "0.05em", color: "var(--on-surface-variant)" }}>
                    {activeImage + 1} / {galleryImages.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }} className="no-scrollbar">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 12, display: "block" }}>
                  {product.momentLabel}
                </span>
                <h1 className="font-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>
                  {product.name} {product.type}
                </h1>
                <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--primary)", lineHeight: 1.6 }}>
                  {product.hook}
                </p>
              </div>

              <div style={{ paddingTop: 20, borderTop: "1px solid var(--outline-variant)", opacity: 0.3 }} />

              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 300 }}>{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: 14, color: "var(--on-surface-variant)", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {product.specs.map((s, i) => (
                    <span key={i} style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)" }}>
                      {s}{i < product.specs.length - 1 && <span style={{ marginLeft: 12, opacity: 0.3 }}>|</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gift Toggle */}
              <div
                style={{
                  padding: 16, background: isGift ? "rgba(201,169,110,0.08)" : "var(--surface-dim)",
                  border: isGift ? "1px solid var(--gold)" : "1px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all 0.3s ease",
                }}
                onClick={() => setIsGift(!isGift)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="redeem" size={20} />
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Add a Personal Message</p>
                    <p style={{ fontSize: 10, color: "var(--on-surface-variant)" }}>We&apos;ll include your note with the gift box</p>
                  </div>
                </div>
                <div style={{ width: 40, height: 22, borderRadius: 11, background: isGift ? "var(--gold)" : "#ccc", position: "relative", transition: "background 0.3s ease", padding: 3 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", transform: isGift ? "translateX(18px)" : "translateX(0)", transition: "transform 0.3s ease" }} />
                </div>
              </div>

              {/* Gift Message */}
              {isGift && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Handwritten note card — deckled cream parchment */}
                  <div style={{
                    position: "relative",
                    background: "linear-gradient(170deg, #faf6ef 0%, #f5f0e6 40%, #f0eadd 100%)",
                    padding: "30px 28px 24px",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    clipPath: `polygon(
                      0% 3px, 2% 0%, 5% 4px, 8% 1px, 12% 3px, 16% 0%, 20% 2px, 24% 0%, 29% 4px, 34% 1px, 38% 3px, 43% 0%, 48% 2px, 53% 0%, 58% 3px, 62% 1px, 67% 4px, 72% 0%, 77% 3px, 82% 1px, 87% 0%, 91% 3px, 95% 0%, 98% 2px, 100% 0%,
                      100% calc(100% - 3px), 98% 100%, 95% calc(100% - 3px), 91% 100%, 87% calc(100% - 2px), 82% 100%, 77% calc(100% - 3px), 72% 100%, 67% calc(100% - 2px), 62% 100%, 58% calc(100% - 4px), 53% 100%, 48% calc(100% - 2px), 43% 100%, 38% calc(100% - 3px), 34% 100%, 29% calc(100% - 2px), 24% 100%, 20% calc(100% - 4px), 16% 100%, 12% calc(100% - 2px), 8% 100%, 5% calc(100% - 3px), 2% 100%, 0% calc(100% - 2px)
                    )`,
                  }}>
                    {/* Paper grain texture */}
                    <div style={{
                      position: "absolute", inset: 0, opacity: 0.04,
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/svg%3E\")",
                      pointerEvents: "none",
                    }} />
                    {/* Subtle warm inner shadow for depth */}
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      boxShadow: "inset 0 0 30px rgba(200,185,160,0.12), inset 0 2px 4px rgba(180,160,130,0.08)",
                    }} />
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write something she'll keep forever..."
                      rows={3}
                      style={{
                        width: "100%", padding: 0, border: "none",
                        background: "transparent", fontSize: 18,
                        fontFamily: "'Caveat', cursive",
                        resize: "none", lineHeight: 1.9, color: "#3d3529",
                        outline: "none", letterSpacing: "0.01em",
                        position: "relative", zIndex: 1,
                      }}
                    />
                    {/* Memoir watermark */}
                    <div style={{
                      position: "absolute", bottom: 10, right: 16,
                      fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "rgba(180,165,140,0.3)", fontWeight: 600, zIndex: 1,
                    }}>Memoir</div>
                  </div>

                  {/* Suggestion options below the card */}
                  <div style={{ paddingTop: 14 }}>
                    <p style={{ fontSize: 9, color: "var(--on-surface-variant)", opacity: 0.45, marginBottom: 8, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Or choose a note
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {[
                        "For your new beginning. I\u2019m so proud of you.",
                        "Because you deserve something beautiful.",
                        "I chose this for the same reason I chose you.",
                      ].map((msg, i) => (
                        <button
                          key={msg}
                          onClick={() => setGiftMessage(msg)}
                          style={{
                            padding: "9px 0", fontSize: 13, border: "none",
                            borderBottom: i < 2 ? "1px solid rgba(210,196,184,0.2)" : "none",
                            background: "transparent",
                            color: giftMessage === msg ? "var(--primary)" : "var(--on-surface-variant)",
                            cursor: "pointer", transition: "all 0.2s ease",
                            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                            textAlign: "left", display: "flex", alignItems: "center", gap: 8,
                            fontWeight: giftMessage === msg ? 600 : 400, opacity: giftMessage === msg ? 1 : 0.7,
                          }}
                        >
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: giftMessage === msg ? "var(--gold)" : "rgba(210,196,184,0.4)", flexShrink: 0, transition: "background 0.2s" }} />
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  width: "100%", padding: "18px 36px",
                  background: addedToCart ? "#2d5a2d" : "var(--primary)",
                  color: "white", border: "none", fontSize: 12, letterSpacing: "0.2em",
                  textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                  transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {addedToCart ? (<><Icon name="check" size={18} /> Added to Cart</>) : "Add to Cart"}
              </button>

              {/* Accordions */}
              <div style={{ borderTop: "1px solid rgba(210,196,184,0.3)", paddingTop: 24 }}>
                {[
                  { title: "The Fit & Feel", content: "Designed with a comfort-fit interior, this piece is weighted for presence but slim enough for daily wear. Tapered edges ensure it rests naturally against the skin." },
                  { title: "Care Guide", content: "Store in the included Memoir pouch when not wearing. Clean with a soft cloth. Avoid perfumes and harsh chemicals. Rhodium plating ensures lasting shine with minimal maintenance." },
                  { title: "Shipping & Returns", content: "Free shipping on orders above \u20B91,999. Delivered in 4-7 business days across India. 15-day easy returns with no questions asked." },
                ].map((item) => (
                  <details key={item.title} style={{ borderBottom: "1px solid rgba(210,196,184,0.3)" }}>
                    <summary style={{ listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "14px 0", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
                      {item.title}
                      <span className="accordion-icon"><Icon name="expand_more" size={18} /></span>
                    </summary>
                    <div style={{ paddingBottom: 16, fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{item.content}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding content-padding" style={{ background: "var(--surface-container)", padding: "80px 32px", marginTop: 48 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="story-grid">
          <div>
            <div style={{ position: "relative" }}>
              <div className="font-serif" style={{ position: "absolute", top: -40, left: -20, fontSize: 120, color: "var(--primary)", opacity: 0.05, fontStyle: "italic", lineHeight: 1 }}>&ldquo;</div>
              <h2 className="font-serif" style={{ fontSize: 32, fontStyle: "italic", fontWeight: 400, marginBottom: 24 }}>The Story Behind This Piece</h2>
              <div style={{ width: 48, height: 1, background: "var(--gold)", opacity: 0.4, marginBottom: 24 }} />
              <p className="font-serif" style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.8, color: "var(--on-surface-variant)" }}>{product.story}</p>
            </div>
          </div>
          <div style={{ background: "white", padding: 8, transform: "rotate(1.5deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
            <img src={galleryImages[galleryImages.length - 1]} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(0.2) saturate(0.9)" }} />
          </div>
        </div>
      </section>

      {/* Unboxing — The Ritual */}
      <section className="section-padding content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px" }}>
        <div className="section-heading" style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-text)", fontWeight: 600, display: "block", marginBottom: 12 }}>The Ritual</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>How She&apos;ll Receive It</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="unbox-grid">
          {[
            { step: "01", title: "The Opening", subtitle: "The Ink-Pressed Box", desc: "A heavy, linen-textured box sealed with care — the moment feels as permanent as the metal inside." },
            { step: "02", title: "The Narrative", subtitle: "The Story Card", desc: "Each piece comes with a hand-lettered card detailing its emotional story — the narrative that makes it hers." },
            { step: "03", title: "The Reveal", subtitle: "The First Glimpse", desc: "Protected by silk velvet, the silver is polished one final time — a mirror-like reveal." },
          ].map((item, idx) => {
            const img = ritualImages[idx] || galleryImages[Math.min(idx + 2, galleryImages.length - 1)];
            return (
              <div key={item.step} className="unbox-item">
                <div className="img-zoom" style={{ aspectRatio: "3/4", position: "relative", marginBottom: 20 }}>
                  <img src={img} alt={item.subtitle} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                    {item.step}. {item.title}
                  </div>
                </div>
                <h3 className="font-serif" style={{ fontSize: 20, fontStyle: "italic", marginBottom: 8 }}>{item.subtitle}</h3>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="section-padding content-padding" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
          <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic", marginBottom: 32 }}>Complete the Moment</h2>
          <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

function GiftGuideModal({ isOpen, onClose, navigate }: {
  isOpen: boolean;
  onClose: () => void;
  navigate: (page: string, param?: string | null) => void;
}) {
  const { products } = useStore();
  const [step, setStep] = useState(0);
  const [relationship, setRelationship] = useState<string | null>(null);
  const [giftMoment, setGiftMoment] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0); setRelationship(null); setGiftMoment(null); setAnimKey(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const goToStep = (s: number) => { setStep(s); setAnimKey((k) => k + 1); };

  const getRecommendations = () => {
    let recs = [...products];
    if (giftMoment === "new-beginning") recs = recs.sort((a) => (a.moment === "new-beginnings" ? -1 : 1));
    else if (giftMoment === "achievement") recs = recs.sort((a) => (a.moment === "because-you-deserve-it" ? -1 : 1));
    else if (giftMoment === "miss-her") recs = recs.sort((a) => (a.id === "still-here" ? -1 : 1));
    return recs.slice(0, 3);
  };

  const relationshipCopy: Record<string, string> = {
    partner: "your partner",
    sister: "your sister",
    friend: "your friend",
    colleague: "your colleague",
    daughter: "your daughter",
    someone: "someone special",
  };

  if (!isOpen) return null;

  return (
    <div className="modal-fullscreen" style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "fadeIn 0.25s ease" }} />
      <div className="gift-modal" style={{
        position: "relative", width: "92%", maxWidth: 520, maxHeight: "85vh",
        background: "var(--ivory)", borderRadius: 0, overflow: "hidden",
        boxShadow: "0 32px 100px rgba(0,0,0,0.25)", animation: "fadeUp 0.4s ease",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header — minimal */}
        <div style={{ padding: "24px 28px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-text)", marginBottom: 6, fontWeight: 600 }}>
              {step === 0 ? "Step 1 of 3" : step === 1 ? "Step 2 of 3" : "Your picks"}
            </p>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400, margin: 0 }}>Find the Perfect Gift</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--on-surface-variant)", opacity: 0.6 }}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Progress — thin line */}
        <div style={{ padding: "0 28px 8px", display: "flex", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 2, background: step >= i ? "var(--gold)" : "var(--outline-variant)", transition: "background 0.4s ease" }} />
          ))}
        </div>

        {/* Content */}
        <div key={animKey} style={{ flex: 1, overflowY: "auto", padding: "24px 24px 28px" }} className="no-scrollbar">
          {step === 0 && (
            <div className="animate-fade-up">
              <p className="font-serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 4, color: "var(--charcoal)" }}>Who is this gift for?</p>
              <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 20, lineHeight: 1.5 }}>We&apos;ll match the emotional tone to your relationship.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {GIFT_RELATIONSHIPS.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => { setRelationship(r.id); goToStep(1); }}
                    style={{
                      padding: "14px 0", border: "none", background: "transparent",
                      cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: 14,
                      borderBottom: i < GIFT_RELATIONSHIPS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <Icon name={r.icon} size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, display: "block", color: "var(--charcoal)" }}>{r.label}</span>
                      <span style={{ fontSize: 11, color: "var(--on-surface-variant)", marginTop: 1, display: "block" }}>{r.subtitle}</span>
                    </div>
                    <Icon name="chevron_right" size={16} style={{ color: "var(--on-surface-variant)", opacity: 0.4 }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up">
              <button onClick={() => goToStep(0)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--on-surface-variant)", marginBottom: 16, display: "flex", alignItems: "center", gap: 4, opacity: 0.6, letterSpacing: "0.05em" }}>
                <Icon name="arrow_back" size={14} /> Back
              </button>
              <p className="font-serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 4, color: "var(--charcoal)" }}>What&apos;s the occasion?</p>
              <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 20, lineHeight: 1.5 }}>Every piece carries a different feeling.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {GIFT_MOMENTS.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => { setGiftMoment(m.id); goToStep(2); }}
                    style={{
                      padding: "14px 0", border: "none", background: "transparent",
                      cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 400,
                      transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 14,
                      borderBottom: i < GIFT_MOMENTS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                      color: "var(--charcoal)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <Icon name={m.icon} size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{m.label}</span>
                    <Icon name="chevron_right" size={16} style={{ color: "var(--on-surface-variant)", opacity: 0.4 }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <button onClick={() => goToStep(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--on-surface-variant)", marginBottom: 16, display: "flex", alignItems: "center", gap: 4, opacity: 0.6, letterSpacing: "0.05em" }}>
                <Icon name="arrow_back" size={14} /> Back
              </button>
              <p className="font-serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 4, color: "var(--charcoal)" }}>
                Our picks for {relationshipCopy[relationship!]}
              </p>
              <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 20, lineHeight: 1.5 }}>
                Each piece arrives gift-wrapped with a story card.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {getRecommendations().map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => { navigate("product", p.id); onClose(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      cursor: "pointer", transition: "all 0.25s ease",
                      paddingBottom: i < 2 ? 16 : 0,
                      borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
                  >
                    <img src={p.images[0]} alt={p.name} loading="lazy" style={{ width: 64, height: 64, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                        <h3 className="font-serif" style={{ fontSize: 16, fontWeight: 500, margin: 0 }}>{p.name}</h3>
                        {i === 0 && <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>Best match</span>}
                      </div>
                      <p style={{ fontSize: 11, color: "var(--on-surface-variant)", lineHeight: 1.4, margin: "0 0 4px 0" }}>{p.gifterHook?.slice(0, 70)}...</p>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{formatPrice(p.price)}</span>
                    </div>
                    <Icon name="arrow_forward" size={16} style={{ color: "var(--on-surface-variant)", opacity: 0.3 }} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => { goToStep(0); setRelationship(null); setGiftMoment(null); }}
                style={{ marginTop: 24, width: "100%", padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, color: "var(--on-surface-variant)", transition: "all 0.2s", opacity: 0.6 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AboutPage({ navigate }: { navigate: (page: string, param?: string | null) => void }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden" }}>
        <img src={FALLBACK_PRODUCTS[0].images[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 600, padding: 32 }}>
            <span className="font-handwritten animate-fade-up stagger-1" style={{ fontSize: 22, color: "var(--gold)", display: "block", marginBottom: 16 }}>Our Story</span>
            <h1 className="font-serif animate-fade-up stagger-2" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "white", lineHeight: 1.15 }}>
              We believe jewellery should carry a story, not just a price tag.
            </h1>
          </div>
        </div>
      </section>
      <TrustStrip />

      <section className="section-padding content-padding" style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 20, fontStyle: "italic" }}>Why Memoir Exists</h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--on-surface-variant)", marginBottom: 20 }}>
              We started Memoir because we noticed something broken about how jewellery is sold and bought in India. Brands compete on discounts, trends, and celebrity endorsements. The actual meaning of the piece — the reason someone buys it — gets lost.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--on-surface-variant)" }}>
              We wanted to build a brand where the moment comes first. Where a man buying a gift for his sister&apos;s new job finds exactly what he needs — not because we have 5,000 SKUs, but because we designed one ring specifically for that feeling. Where a woman celebrating herself doesn&apos;t need permission from anyone else to mark the moment.
            </p>
          </div>
          <div className="about-quote" style={{ background: "var(--surface-dim)", padding: 40, borderLeft: "3px solid var(--gold)" }}>
            <p className="font-serif" style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.6, color: "var(--charcoal)" }}>
              &ldquo;Every piece we make is designed around a moment worth remembering. Not a trend, not a season — a moment.&rdquo;
            </p>
          </div>
          <div>
            <h2 className="font-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 20, fontStyle: "italic" }}>What We Promise</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { title: "Real Silver, Always", desc: "Every Memoir piece is 925 sterling silver with BIS hallmarking. No plated brass, no compromises. Premium rhodium plating ensures it stays beautiful through daily wear." },
                { title: "Designed for Moments", desc: "We don't chase trends. Each piece is designed around a specific life moment — a new beginning, an achievement, a quiet promise. The design serves the emotion, not the other way around." },
                { title: "Gifting as a First-Class Experience", desc: "We built the entire gifting experience from scratch — the box, the story card, the personal message, the price-hidden packaging. Because giving a gift should feel as good as receiving one." },
              ].map((item) => (
                <div key={item.title}>
                  <h3 style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding content-padding" style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: 32, color: "white", fontWeight: 300, marginBottom: 24 }}>Ready to find your moment?</h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("moments")}
            style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--charcoal)", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}
          >
            Shop by Moment
          </button>
          <button
            onClick={() => navigate("gift-guide")}
            style={{ padding: "16px 36px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}
          >
            Find a Gift
          </button>
        </div>
      </section>
    </div>
  );
}

// --- Care Guide Page ---
function CareGuidePage({ navigate }: { navigate: (page: string, param?: string | null) => void }) {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ position: "relative", height: "40vh", minHeight: 300, overflow: "hidden" }}>
        <img src={FALLBACK_PRODUCTS[3].images[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 600, padding: 32 }}>
            <span className="font-handwritten animate-fade-up stagger-1" style={{ fontSize: 22, color: "var(--gold)", display: "block", marginBottom: 16 }}>
              Keep it beautiful
            </span>
            <h1 className="font-serif animate-fade-up stagger-2" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "white", lineHeight: 1.15 }}>
              Care Guide
            </h1>
          </div>
        </div>
      </section>
      <TrustStrip />

      <section className="section-padding content-padding" style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {/* Intro */}
          <div>
            <p className="font-serif" style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.8, color: "var(--primary)" }}>
              Every Memoir piece is crafted from 925 sterling silver with rhodium plating. With a little care, your jewellery will stay as beautiful as the moment it represents.
            </p>
          </div>

          {/* Daily Wear */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="sunny" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Daily Wear</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Put jewellery on last", desc: "Apply perfume, lotion, and makeup before wearing your Memoir piece. Chemicals in beauty products can dull the rhodium plating over time." },
                { title: "Remove before water activities", desc: "Take off your jewellery before showering, swimming, or washing dishes. Prolonged water exposure can accelerate tarnishing." },
                { title: "Avoid during workouts", desc: "Sweat contains salts that can affect silver. Remove your pieces before exercising or any strenuous activity." },
                { title: "Be mindful of impact", desc: "Sterling silver is a soft metal. Avoid knocking your jewellery against hard surfaces to prevent scratches and dents." },
              ].map((item) => (
                <div key={item.title} style={{ padding: "20px 24px", background: "var(--surface-dim)", borderLeft: "3px solid var(--gold)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cleaning */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="auto_awesome" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Cleaning Your Piece</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--on-surface-variant)" }}>
                Regular cleaning keeps your Memoir jewellery looking its best. Here&apos;s the gentle method we recommend:
              </p>
              <div className="care-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {[
                  { step: "01", title: "Soft Cloth", desc: "Gently wipe your piece with the included Memoir polishing cloth after each wear. This removes oils and restores shine." },
                  { step: "02", title: "Mild Soap Wash", desc: "For deeper cleaning, use lukewarm water with a drop of mild dish soap. Soak for 2-3 minutes, then gently rub with a soft cloth." },
                  { step: "03", title: "Dry Thoroughly", desc: "Pat dry with a clean, lint-free cloth immediately after washing. Never leave your jewellery to air dry — water spots can form." },
                ].map((item) => (
                  <div key={item.step} style={{ padding: 24, border: "1px solid var(--outline-variant)", textAlign: "center" }}>
                    <span style={{ fontSize: 32, fontWeight: 200, color: "var(--gold)", display: "block", marginBottom: 12 }}>{item.step}</span>
                    <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Storage */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="inventory_2" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Storage</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Use the Memoir pouch", desc: "Every piece comes with a soft velvet pouch. Store your jewellery in it when not wearing — this prevents scratches and reduces tarnishing from air exposure." },
                { title: "Store pieces separately", desc: "Keep each piece in its own pouch or compartment. Sterling silver is soft and can scratch against other jewellery or hard surfaces." },
                { title: "Keep in a cool, dry place", desc: "Avoid storing jewellery in humid environments like bathrooms. A bedroom drawer or jewellery box is ideal." },
                { title: "Anti-tarnish strips", desc: "For extra protection, place an anti-tarnish strip inside your storage. These absorb moisture and sulphur compounds that cause tarnishing." },
              ].map((item) => (
                <div key={item.title} style={{ padding: "20px 24px", background: "var(--surface-dim)", borderLeft: "3px solid var(--gold)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What to Avoid */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="block" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>What to Avoid</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="story-grid">
              {[
                "Harsh chemical cleaners",
                "Ultrasonic jewellery cleaners",
                "Chlorinated water (pools)",
                "Direct perfume or hairspray",
                "Sleeping with jewellery on",
                "Abrasive cloths or brushes",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "rgba(117,89,57,0.04)", border: "1px solid var(--outline-variant)" }}>
                  <Icon name="close" size={16} />
                  <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rhodium Note */}
          <div className="about-quote" style={{ background: "var(--surface-dim)", padding: 40, borderLeft: "3px solid var(--gold)" }}>
            <h3 className="font-serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 12 }}>A Note on Rhodium Plating</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-surface-variant)" }}>
              All Memoir pieces are rhodium plated for extra shine and tarnish resistance. With daily wear, rhodium plating naturally wears over time (typically 12-18 months). This is normal and reveals the warm tone of the sterling silver beneath. If you prefer the bright rhodium finish, any local jeweller can re-plate your piece affordably.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding content-padding" style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: 32, color: "white", fontWeight: 300, marginBottom: 12 }}>Need help with your piece?</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>We&apos;re always happy to help with care questions or re-plating guidance.</p>
        <button
          onClick={() => navigate("moments")}
          style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--charcoal)", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}
        >
          Shop Collection
        </button>
      </section>
    </div>
  );
}

// --- Shipping Policy Page ---
function ShippingPolicyPage({ navigate }: { navigate: (page: string, param?: string | null) => void }) {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ position: "relative", height: "40vh", minHeight: 300, overflow: "hidden" }}>
        <img src={FALLBACK_PRODUCTS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 600, padding: 32 }}>
            <span className="font-handwritten animate-fade-up stagger-1" style={{ fontSize: 22, color: "var(--gold)", display: "block", marginBottom: 16 }}>
              We&apos;ve got you covered
            </span>
            <h1 className="font-serif animate-fade-up stagger-2" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "white", lineHeight: 1.15 }}>
              Shipping & Returns
            </h1>
          </div>
        </div>
      </section>
      <TrustStrip />

      <section className="section-padding content-padding" style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Shipping */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="local_shipping" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Shipping</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }} className="story-grid">
              <div style={{ padding: 28, background: "rgba(201,169,110,0.06)", border: "1px solid var(--gold)", textAlign: "center" }}>
                <Icon name="local_shipping" size={32} />
                <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "12px 0 8px" }}>Free Shipping</h3>
                <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>On all orders above <strong>{formatPrice(1999)}</strong></p>
              </div>
              <div style={{ padding: 28, background: "var(--surface-dim)", border: "1px solid var(--outline-variant)", textAlign: "center" }}>
                <Icon name="payments" size={32} />
                <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "12px 0 8px" }}>Flat {formatPrice(99)}</h3>
                <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>For orders below {formatPrice(1999)}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "Processing Time", desc: "Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking details once your order ships." },
                { title: "Delivery Timeline", desc: "Standard delivery takes 4-7 business days across India. Metro cities typically receive orders in 3-5 business days." },
                { title: "Tracking Your Order", desc: "Once shipped, you'll receive a tracking link via email and SMS. You can track your package in real-time through our shipping partner's website." },
                { title: "Gift Orders", desc: "Gift orders are shipped without any pricing information. The package includes the Memoir gift box, story card, and your personal message — nothing else." },
              ].map((item) => (
                <div key={item.title} style={{ padding: "20px 24px", background: "var(--surface-dim)", borderLeft: "3px solid var(--gold)" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Returns */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="assignment_return" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Returns & Exchanges</h2>
            </div>

            <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid var(--gold)", padding: 28, marginBottom: 24, textAlign: "center" }}>
              <h3 className="font-serif" style={{ fontSize: 24, fontStyle: "italic", marginBottom: 8 }}>15-Day Easy Returns</h3>
              <p style={{ fontSize: 14, color: "var(--on-surface-variant)" }}>No questions asked. We want you to love your piece.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--on-surface-variant)" }}>
                We understand that sometimes a piece doesn&apos;t feel right. Our return policy is designed to make the process as seamless as possible.
              </p>

              <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>How to Return</h3>
              <div className="return-steps" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                {[
                  { step: "01", title: "Reach Out", desc: "Email us at hello@memoir.in or message us on WhatsApp within 15 days of delivery." },
                  { step: "02", title: "Ship It Back", desc: "We'll arrange a free reverse pickup from your doorstep. No need to visit a courier office." },
                  { step: "03", title: "Get Refunded", desc: "Once we receive and inspect the piece, your refund is processed within 5-7 business days." },
                ].map((item) => (
                  <div key={item.step} style={{ padding: 24, border: "1px solid var(--outline-variant)", textAlign: "center" }}>
                    <span style={{ fontSize: 32, fontWeight: 200, color: "var(--gold)", display: "block", marginBottom: 12 }}>{item.step}</span>
                    <h4 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--on-surface-variant)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Return Conditions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "check_circle", text: "Item must be in original condition — unworn, undamaged, with tags attached" },
                { icon: "check_circle", text: "Must be returned in the original Memoir packaging" },
                { icon: "check_circle", text: "Return request must be raised within 15 days of delivery" },
                { icon: "check_circle", text: "Refund will be issued to the original payment method" },
                { icon: "swap_horiz", text: "Exchanges are available for a different piece of equal or higher value" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", background: "var(--surface-dim)" }}>
                  <Icon name={item.icon} size={18} />
                  <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--on-surface-variant)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="help" size={24} />
              </div>
              <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic" }}>Frequently Asked</h2>
            </div>
            <div>
              {[
                { q: "Do you ship internationally?", a: "Currently, we only ship within India. International shipping is coming soon — sign up for our newsletter to be the first to know." },
                { q: "Can I change my delivery address after placing an order?", a: "Yes, as long as the order hasn't been shipped yet. Reach out to us at hello@memoir.in and we'll update it for you." },
                { q: "What if my order arrives damaged?", a: "We're truly sorry if this happens. Contact us within 48 hours of delivery with photos, and we'll send a replacement immediately at no extra cost." },
                { q: "Can I return a gift order?", a: "Yes. The recipient can initiate a return by contacting us directly. The refund will be processed to the original buyer's payment method." },
                { q: "Do you offer express shipping?", a: "Not at this time. Our standard shipping (4-7 business days) ensures every piece is carefully inspected and beautifully packaged before it reaches you." },
              ].map((item) => (
                <details key={item.q} style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                  <summary style={{ listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "18px 0", fontSize: 15, fontWeight: 500 }}>
                    {item.q}
                    <span className="accordion-icon"><Icon name="expand_more" size={18} /></span>
                  </summary>
                  <div style={{ paddingBottom: 18, fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding content-padding" style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: 32, color: "white", fontWeight: 300, marginBottom: 12 }}>Still have questions?</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>We&apos;re here to help — reach out anytime.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:hello@memoir.in" style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--charcoal)", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Icon name="mail" size={16} /> Email Us
          </a>
          <a href="https://wa.me/919999999999?text=Hi%20Memoir!" target="_blank" rel="noopener noreferrer" style={{ padding: "16px 36px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Icon name="chat" size={16} /> WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

// --- Cart Drawer ---
function CartDrawer({ isOpen, onClose, cart, navigate, onRemoveFromCart }: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  navigate: (page: string, param?: string | null) => void;
  onRemoveFromCart: (index: number) => void;
}) {
  const { goToCheckout, isShopifyConnected } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 59, transition: "opacity 0.3s ease" }} onClick={onClose} />
      )}
      <div
        className="cart-drawer"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 90vw)", background: "var(--ivory)", zIndex: 60,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease", display: "flex", flexDirection: "column",
          boxShadow: isOpen ? "-20px 0 60px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--outline-variant)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400 }}>Your Cart</h2>
            <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{cart.length} {cart.length === 1 ? "piece" : "pieces"} selected</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="close" size={24} /></button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "24px 32px" }} className="no-scrollbar">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <div style={{ opacity: 0.2, marginBottom: 16 }}><Icon name="shopping_bag" size={48} /></div>
              <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)" }}>Your collection is empty</p>
              <button
                onClick={() => { onClose(); navigate("moments"); }}
                style={{ marginTop: 20, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: 4, fontWeight: 600 }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cart.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 16, paddingBottom: 20, borderBottom: "1px solid rgba(210,196,184,0.3)" }}>
                  <div style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer" }} onClick={() => { onClose(); navigate("product", item.id); }}>
                    <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 className="font-serif" style={{ fontSize: 16, marginBottom: 4 }}>{item.name}</h4>
                      {item.isGift && (
                        <span style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          <Icon name="redeem" size={12} /> Gift wrapped
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 400 }}>{formatPrice(item.price)}</span>
                      <button onClick={() => onRemoveFromCart(i)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--on-surface-variant)", textDecoration: "underline" }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "24px 32px", borderTop: "1px solid var(--outline-variant)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Subtotal</span>
              <span style={{ fontSize: 16, fontWeight: 500 }}>{formatPrice(total)}</span>
            </div>
            {total < 1999 && (
              <p style={{ fontSize: 11, color: "var(--gold)", marginBottom: 12, textAlign: "center" }}>
                Add {formatPrice(1999 - total)} more for free shipping
              </p>
            )}
            <button
              onClick={() => { onClose(); navigate("checkout"); }}
              style={{
                width: "100%", padding: "16px", background: "var(--primary)", color: "white", border: "none",
                fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
              }}
            >
              Checkout — {formatPrice(total)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// --- Search Overlay ---
function SearchOverlay({ isOpen, onClose, navigate }: {
  isOpen: boolean;
  onClose: () => void;
  navigate: (page: string, param?: string | null) => void;
}) {
  const { products } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = { current: null as HTMLInputElement | null };

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.trim().length > 1
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q) ||
          p.hook.toLowerCase().includes(q) || p.momentLabel.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
      })
    : [];

  if (!isOpen) return null;

  return (
    <div className="modal-fullscreen" style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "10vh" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", animation: "fadeIn 0.25s ease" }} />
      <div className="search-modal" style={{
        position: "relative", width: "90%", maxWidth: 600, maxHeight: "70vh",
        background: "var(--ivory)", borderRadius: 0, overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.2)", animation: "fadeUp 0.35s ease",
        display: "flex", flexDirection: "column",
      }}>
        {/* Search input area */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid var(--outline-variant)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Icon name="search" size={22} />
            <input
              ref={(el) => { inputRef.current = el; }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a memory..."
              className="search-input"
              style={{
                flex: 1, fontSize: 17, background: "none", border: "none", outline: "none",
                color: "var(--charcoal)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}>
                <Icon name="close" size={18} />
              </button>
            )}
            <button onClick={onClose} style={{ background: "var(--surface-dim)", border: "none", cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 0, flexShrink: 0 }}>
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Results area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px 24px" }} className="no-scrollbar">
          {query.trim().length > 1 ? (
            results.length > 0 ? (
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16, color: "var(--on-surface-variant)" }}>
                  {results.length} piece{results.length !== 1 ? "s" : ""} found
                </p>
                {results.map((product, i) => (
                  <div
                    key={product.id}
                    onClick={() => { navigate("product", product.id); onClose(); }}
                    style={{
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: "14px 12px",
                      borderRadius: 0, transition: "background 0.2s",
                      borderBottom: i < results.length - 1 ? "1px solid var(--outline-variant)" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-dim)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <img
                      src={product.images[0]} alt={product.name}
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="font-serif" style={{ fontSize: 16, marginBottom: 2 }}>{product.name}</p>
                      <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{product.type} · {product.momentLabel}</p>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}>{formatPrice(product.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Icon name="search_off" size={40} />
                <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)", marginTop: 16 }}>
                  No pieces found for &ldquo;{query}&rdquo;
                </p>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginTop: 8, opacity: 0.7 }}>Try searching for "ring", "pendant", or "new beginnings"</p>
              </div>
            )
          ) : (
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14, color: "var(--on-surface-variant)" }}>Popular searches</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Ring", "Pendant", "Bracelet", "New Beginnings", "Gift", "Earrings"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={{
                      padding: "8px 18px", background: "var(--surface-dim)", border: "1px solid transparent",
                      borderRadius: 0, fontSize: 13, cursor: "pointer", color: "var(--charcoal)", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14, color: "var(--on-surface-variant)" }}>Browse by moment</p>
                {MOMENTS.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    onClick={() => { navigate("moment", m.id); onClose(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", cursor: "pointer",
                      borderRadius: 0, transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-dim)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ width: 32, height: 32, borderRadius: 0, background: "var(--surface-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="arrow_forward" size={14} />
                    </span>
                    <span className="font-serif" style={{ fontSize: 15, fontStyle: "italic" }}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Profile Page ---

function ProfilePage({ navigate }: { navigate: (page: string, param?: string | null) => void }) {
  const auth = useAuth();
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState("wishlist");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddr, setEditingAddr] = useState<string | null>(null);
  const [addrForm, setAddrForm] = useState({ label: "", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [nameVal, setNameVal] = useState(auth.user?.name || "");
  const [phoneVal, setPhoneVal] = useState(auth.user?.phone || "");

  const wishlistProducts = products.filter(p => auth.wishlist.includes(p.id));
  const memberSince = auth.user?.createdAt
    ? new Date(auth.user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "";

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", border: "1px solid var(--outline-variant)",
    background: "white", fontSize: 14, fontFamily: "'DM Sans', sans-serif", borderRadius: 0,
  };

  const resetAddrForm = () => {
    setAddrForm({ label: "", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
    setShowAddAddress(false);
    setEditingAddr(null);
  };

  const handleSaveAddr = () => {
    if (!addrForm.label || !addrForm.name || !addrForm.line1 || !addrForm.city || !addrForm.pincode) return;
    if (editingAddr) {
      auth.updateAddress(editingAddr, addrForm);
    } else {
      auth.addAddress({ ...addrForm, isDefault: auth.addresses.length === 0 });
    }
    resetAddrForm();
  };

  const startEditAddr = (addr: SavedAddress) => {
    setAddrForm({ label: addr.label, name: addr.name, phone: addr.phone, line1: addr.line1, line2: addr.line2, city: addr.city, state: addr.state, pincode: addr.pincode });
    setEditingAddr(addr.id);
    setShowAddAddress(true);
  };

  const tabs = [
    { id: "wishlist", label: "Wishlist", icon: "favorite" },
    { id: "addresses", label: "Addresses", icon: "location_on" },
    { id: "settings", label: "Settings", icon: "settings" },
    { id: "orders", label: "Orders", icon: "receipt_long" },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Profile Header */}
      <div className="profile-header" style={{ background: "var(--surface-dim)", padding: "48px 32px" }}>
        <div className="profile-header-inner" style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 24 }}>
          <div className="profile-avatar" style={{
            width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="person" size={36} color="white" />
          </div>
          <div>
            <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 4 }}>{auth.user?.name || "Guest"}</h1>
            <p style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{auth.user?.email}</p>
            {memberSince && <p style={{ fontSize: 11, color: "var(--gold)", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Member since {memberSince}</p>}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs" style={{ borderBottom: "1px solid var(--outline-variant)", position: "sticky", top: 64, background: "var(--ivory)", zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
                borderBottom: activeTab === tab.id ? "2px solid var(--primary)" : "2px solid transparent",
                color: activeTab === tab.id ? "var(--charcoal)" : "var(--on-surface-variant)",
                fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: activeTab === tab.id ? 600 : 400,
                transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap",
              }}
            >
              <Icon name={tab.icon} size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="profile-content" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 32px" }}>
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 24 }}>Order History</h2>
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="order-card" style={{
                border: "1px solid var(--outline-variant)", borderRadius: 0, padding: 24, marginBottom: 16,
                background: "white",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{order.id}</p>
                    <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{order.date}</p>
                  </div>
                  <span style={{
                    padding: "4px 12px", borderRadius: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
                    background: order.status === "Delivered" ? "rgba(201,169,110,0.15)" : "rgba(117,89,57,0.1)",
                    color: order.status === "Delivered" ? "var(--gold)" : "var(--primary)",
                  }}>
                    {order.status}
                  </span>
                </div>
                <div className="order-items" style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate("product", item.id)}
                      style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <img src={item.images[0]} alt={item.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 0 }} />
                      <div>
                        <p className="font-serif" style={{ fontSize: 14, fontStyle: "italic" }}>{item.name}</p>
                        <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--outline-variant)", paddingTop: 12 }}>
                  <span style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>Total</span>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 24 }}>Your Wishlist</h2>
            {wishlistProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Icon name="favorite_border" size={48} color="var(--outline-variant)" />
                <p className="font-serif" style={{ fontSize: 18, marginTop: 16, marginBottom: 8 }}>Your wishlist is empty</p>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 24 }}>Browse our collections and tap the heart to save pieces you love.</p>
                <button onClick={() => navigate("moments")} style={{
                  padding: "14px 36px", background: "var(--primary)", color: "white", border: "none",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                }}>Shop by Moment</button>
              </div>
            ) : (
              <div className="wishlist-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                {wishlistProducts.map((product) => (
                  <div key={product.id} style={{
                    border: "1px solid var(--outline-variant)", borderRadius: 0, overflow: "hidden", background: "white",
                    cursor: "pointer", transition: "transform 0.2s",
                  }} className="hover-lift" onClick={() => navigate("product", product.id)}>
                    <div style={{ position: "relative" }}>
                      <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                      <button onClick={(e) => { e.stopPropagation(); auth.toggleWishlist(product.id); }} style={{
                        position: "absolute", top: 10, right: 10, width: 32, height: 32,
                        background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#c0392b",
                      }}>
                        <Icon name="favorite" size={16} filled />
                      </button>
                    </div>
                    <div style={{ padding: 16 }}>
                      <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", marginBottom: 4 }}>{product.name}</p>
                      <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 8 }}>{product.type} · {product.momentLabel}</p>
                      <span style={{ fontSize: 16, fontWeight: 500 }}>{formatPrice(product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400 }}>Saved Addresses</h2>
              <button onClick={() => { resetAddrForm(); setShowAddAddress(true); }} style={{
                padding: "10px 20px", background: "none", border: "1px solid var(--primary)", color: "var(--primary)",
                fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: 0,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <Icon name="add" size={16} /> Add Address
              </button>
            </div>

            {/* Add/Edit address form */}
            {showAddAddress && (
              <div style={{ background: "white", border: "1px solid var(--outline-variant)", padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{editingAddr ? "Edit Address" : "New Address"}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="address-grid">
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Label *</label>
                      <input value={addrForm.label} onChange={e => setAddrForm({ ...addrForm, label: e.target.value })} placeholder="Home, Office..." style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Recipient Name *</label>
                      <input value={addrForm.name} onChange={e => setAddrForm({ ...addrForm, name: e.target.value })} placeholder="Full name" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Phone</label>
                    <input value={addrForm.phone} onChange={e => setAddrForm({ ...addrForm, phone: e.target.value })} placeholder="+91 98765 43210" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Address Line 1 *</label>
                    <input value={addrForm.line1} onChange={e => setAddrForm({ ...addrForm, line1: e.target.value })} placeholder="House/Flat, Street" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Address Line 2</label>
                    <input value={addrForm.line2} onChange={e => setAddrForm({ ...addrForm, line2: e.target.value })} placeholder="Landmark (optional)" style={inputStyle} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }} className="address-grid">
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>City *</label>
                      <input value={addrForm.city} onChange={e => setAddrForm({ ...addrForm, city: e.target.value })} placeholder="Mumbai" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>State</label>
                      <input value={addrForm.state} onChange={e => setAddrForm({ ...addrForm, state: e.target.value })} placeholder="Maharashtra" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Pincode *</label>
                      <input value={addrForm.pincode} onChange={e => setAddrForm({ ...addrForm, pincode: e.target.value })} placeholder="400001" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <button onClick={handleSaveAddr} style={{
                      padding: "12px 28px", background: "var(--primary)", color: "white", border: "none",
                      fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                    }}>{editingAddr ? "Update" : "Save Address"}</button>
                    <button onClick={resetAddrForm} style={{
                      padding: "12px 28px", background: "none", border: "1px solid var(--outline-variant)", color: "var(--on-surface-variant)",
                      fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
                    }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {auth.addresses.length === 0 && !showAddAddress ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Icon name="location_on" size={48} color="var(--outline-variant)" />
                <p className="font-serif" style={{ fontSize: 18, marginTop: 16, marginBottom: 8 }}>No saved addresses</p>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Add an address for faster checkout.</p>
              </div>
            ) : (
              <div className="address-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                {auth.addresses.map((addr) => (
                  <div key={addr.id} style={{
                    border: addr.isDefault ? "2px solid var(--gold)" : "1px solid var(--outline-variant)",
                    borderRadius: 0, padding: 24, background: "white", position: "relative",
                  }}>
                    {addr.isDefault && (
                      <span style={{
                        position: "absolute", top: 12, right: 12, padding: "3px 10px", background: "var(--gold)", color: "white",
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>Default</span>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Icon name="location_on" size={18} color="var(--primary)" />
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{addr.label}</p>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{addr.name}</p>
                    {addr.phone && <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 4 }}>{addr.phone}</p>}
                    <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />{addr.city}{addr.state ? `, ${addr.state}` : ""} — {addr.pincode}
                    </p>
                    <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                      <button onClick={() => startEditAddr(addr)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>Edit</button>
                      {!addr.isDefault && <button onClick={() => auth.setDefaultAddress(addr.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--gold)", fontWeight: 500 }}>Set Default</button>}
                      <button onClick={() => auth.deleteAddress(addr.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 24 }}>Account Settings</h2>
            <div style={{ background: "white", border: "1px solid var(--outline-variant)", borderRadius: 0, overflow: "hidden" }}>
              {/* Name */}
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--outline-variant)" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Full Name</p>
                  {editName ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={nameVal} onChange={e => setNameVal(e.target.value)} style={{ padding: "8px 12px", border: "1px solid var(--outline-variant)", fontSize: 14, flex: 1 }} />
                      <button onClick={() => { auth.updateProfile({ name: nameVal }); setEditName(false); }} style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 16px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Save</button>
                      <button onClick={() => setEditName(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)" }}>Cancel</button>
                    </div>
                  ) : (
                    <p style={{ fontSize: 15 }}>{auth.user?.name}</p>
                  )}
                </div>
                {!editName && <button onClick={() => { setNameVal(auth.user?.name || ""); setEditName(true); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>Edit</button>}
              </div>
              {/* Email (read-only) */}
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--outline-variant)" }}>
                <div>
                  <p style={{ fontSize: 11, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Email</p>
                  <p style={{ fontSize: 15 }}>{auth.user?.email}</p>
                </div>
              </div>
              {/* Phone */}
              <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Phone</p>
                  {editPhone ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input value={phoneVal} onChange={e => setPhoneVal(e.target.value)} style={{ padding: "8px 12px", border: "1px solid var(--outline-variant)", fontSize: 14, flex: 1 }} />
                      <button onClick={() => { auth.updateProfile({ phone: phoneVal }); setEditPhone(false); }} style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 16px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Save</button>
                      <button onClick={() => setEditPhone(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)" }}>Cancel</button>
                    </div>
                  ) : (
                    <p style={{ fontSize: 15 }}>{auth.user?.phone || "Not added"}</p>
                  )}
                </div>
                {!editPhone && <button onClick={() => { setPhoneVal(auth.user?.phone || ""); setEditPhone(true); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>Edit</button>}
              </div>
            </div>

            <button onClick={() => { auth.logout(); navigate("home"); }} style={{
              marginTop: 32, padding: "14px 32px", background: "none", border: "1px solid var(--primary)",
              color: "var(--primary)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600,
              cursor: "pointer", borderRadius: 0, width: "100%",
            }}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Checkout Page ---
function CheckoutPage({ navigate, cart, onRemoveFromCart, onClearCart, checkoutUrl, isShopifyConnected }: {
  navigate: (page: string, param?: string | null) => void;
  cart: CartItem[];
  onRemoveFromCart: (index: number) => void;
  onClearCart: () => void;
  checkoutUrl?: string | null;
  isShopifyConnected?: boolean;
}) {
  const [step, setStep] = useState(1); // 1=Address, 2=Payment, 3=Confirmation
  const auth = useAuth();
  const defaultAddr = auth.getDefaultAddress();
  const [address, setAddress] = useState(() => ({
    name: defaultAddr?.name || "", phone: defaultAddr?.phone || "", email: "",
    line1: defaultAddr?.line1 || "", line2: defaultAddr?.line2 || "",
    city: defaultAddr?.city || "", state: defaultAddr?.state || "",
    pincode: defaultAddr?.pincode || "",
    buyerName: auth.user?.name || "", buyerPhone: auth.user?.phone || "",
    buyerEmail: auth.user?.email || "",
  }));
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1999 ? 0 : 99;
  const total = subtotal + shipping;
  const hasGift = cart.some((item) => item.isGift);

  const isAddressValid = address.name && address.phone && address.line1 && address.city && address.state && address.pincode && address.buyerName && address.buyerPhone && address.buyerEmail;

  const handlePlaceOrder = () => {
    if (isShopifyConnected && checkoutUrl) {
      // Redirect to Shopify's secure payment gateway
      setProcessingPayment(true);
      // Append shipping address as query params to Shopify checkout URL
      const separator = checkoutUrl.includes("?") ? "&" : "?";
      const shopifyUrl = `${checkoutUrl}${separator}checkout[shipping_address][first_name]=${encodeURIComponent(address.name.split(" ")[0])}&checkout[shipping_address][last_name]=${encodeURIComponent(address.name.split(" ").slice(1).join(" ") || " ")}&checkout[shipping_address][address1]=${encodeURIComponent(address.line1)}&checkout[shipping_address][address2]=${encodeURIComponent(address.line2)}&checkout[shipping_address][city]=${encodeURIComponent(address.city)}&checkout[shipping_address][province]=${encodeURIComponent(address.state)}&checkout[shipping_address][zip]=${encodeURIComponent(address.pincode)}&checkout[shipping_address][phone]=${encodeURIComponent(address.phone)}&checkout[email]=${encodeURIComponent(address.buyerEmail)}`;
      window.location.href = shopifyUrl;
      return;
    }
    // Fallback for non-Shopify mode
    setOrderPlaced(true);
    setStep(3);
    onClearCart();
  };

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirmed" },
  ];

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
        <div style={{ opacity: 0.2, marginBottom: 20 }}><Icon name="shopping_bag" size={56} /></div>
        <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 12 }}>Nothing to checkout</h1>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 28 }}>Add some pieces to your collection first.</p>
        <button onClick={() => navigate("moments")} style={{
          padding: "14px 36px", background: "var(--primary)", color: "white", border: "none",
          fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
        }}>Shop Now</button>
      </div>
    );
  }

  const inputStyle = {
    width: "100%", padding: "14px 16px", border: "1px solid var(--outline-variant)",
    background: "white", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.3s ease", borderRadius: 0,
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <div className="content-padding" style={{ maxWidth: 960, margin: "0 auto", padding: "24px 32px 96px" }}>
        {/* Steps indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: step >= s.num ? "var(--charcoal)" : "var(--surface-dim)",
                  color: step >= s.num ? "white" : "var(--on-surface-variant)",
                  fontSize: 12, fontWeight: 600, transition: "all 0.3s ease",
                }}>
                  {step > s.num ? <Icon name="check" size={16} /> : s.num}
                </div>
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: step >= s.num ? "var(--charcoal)" : "var(--on-surface-variant)" }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 60, height: 1, background: step > s.num ? "var(--charcoal)" : "var(--outline-variant)", margin: "0 12px", marginBottom: 20, transition: "background 0.3s ease" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }} className="product-layout">
          {/* Left: Form */}
          <div>
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="animate-fade-up">
                {/* Section 1: Your Details (buyer) */}
                <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Your Details</h2>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 24 }}>We&apos;ll send order updates and tracking info here.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                  <div>
                    <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Your Name *</label>
                    <input value={address.buyerName} onChange={(e) => setAddress({ ...address, buyerName: e.target.value })} placeholder="Your full name" style={inputStyle} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="address-grid">
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Phone *</label>
                      <input value={address.buyerPhone} onChange={(e) => setAddress({ ...address, buyerPhone: e.target.value })} placeholder="+91 98765 43210" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Email *</label>
                      <input value={address.buyerEmail} onChange={(e) => setAddress({ ...address, buyerEmail: e.target.value })} placeholder="you@email.com" type="email" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Section 2: Delivery Address (recipient) */}
                <div style={{ borderTop: "1px solid var(--outline-variant)", paddingTop: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Icon name="redeem" size={20} />
                    <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400 }}>Delivery Address</h2>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 24 }}>Where should we deliver this gift? No pricing will be shown on the package.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="address-grid">
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Recipient&apos;s Name *</label>
                        <input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="Her name" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Recipient&apos;s Phone *</label>
                        <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="+91 98765 43210" style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Address Line 1 *</label>
                      <input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="House/Flat no., Street name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Address Line 2</label>
                      <input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} placeholder="Landmark, Area (optional)" style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="address-grid">
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>City *</label>
                        <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Mumbai" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>State *</label>
                        <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="Maharashtra" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Pincode *</label>
                        <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} placeholder="400001" style={inputStyle} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* What she'll receive */}
                <div style={{ marginTop: 32, padding: 20, background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 12 }}>What she&apos;ll receive</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { icon: "inventory_2", text: "Premium Memoir gift box" },
                      { icon: "auto_stories", text: "Handwritten story card with her piece's inspiration" },
                      { icon: "mail", text: "Your personal message (if added)" },
                      { icon: "visibility_off", text: "No pricing or invoice — just the gift" },
                    ].map((item) => (
                      <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--on-surface-variant)" }}>
                        <Icon name={item.icon} size={15} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => isAddressValid && setStep(2)}
                  style={{
                    width: "100%", marginTop: 32, padding: "16px", background: isAddressValid ? "var(--primary)" : "var(--surface-dim)",
                    color: isAddressValid ? "white" : "var(--on-surface-variant)", border: "none",
                    fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
                    cursor: isAddressValid ? "pointer" : "default", transition: "all 0.3s ease",
                  }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="animate-fade-up">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--on-surface-variant)" }}>
                    <Icon name="arrow_back" size={20} />
                  </button>
                  <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400 }}>Payment</h2>
                </div>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 32 }}>All transactions are secure and encrypted.</p>

                {/* Shipping to summary */}
                <div style={{ padding: 20, background: "var(--surface-dim)", marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Delivering to</span>
                      <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{address.name}</p>
                      <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>{address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />{address.city}, {address.state} — {address.pincode}</p>
                    </div>
                    <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--primary)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Edit</button>
                  </div>
                  <div style={{ borderTop: "1px solid var(--outline-variant)", paddingTop: 12 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 4 }}>Order updates to</span>
                    <p style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{address.buyerName} &nbsp;•&nbsp; {address.buyerEmail}</p>
                  </div>
                </div>

                {/* Payment methods */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: "account_balance" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: "credit_card" },
                    { id: "netbanking", label: "Net Banking", desc: "All major banks supported", icon: "account_balance_wallet" },
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: "local_shipping" },
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      style={{
                        padding: "16px 20px", border: paymentMethod === method.id ? "2px solid var(--gold)" : "1px solid var(--outline-variant)",
                        background: paymentMethod === method.id ? "rgba(201,169,110,0.04)" : "white",
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", border: paymentMethod === method.id ? "6px solid var(--gold)" : "2px solid var(--outline-variant)",
                        transition: "all 0.3s ease", flexShrink: 0,
                      }} />
                      <div style={{ width: 40, height: 40, background: "var(--surface-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={method.icon} size={20} />
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{method.label}</p>
                        <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === "upi" && (
                  <div style={{ marginTop: 20, padding: 20, background: "var(--surface-dim)" }}>
                    <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>UPI ID</label>
                    <input placeholder="yourname@upi" style={inputStyle} />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div style={{ marginTop: 20, padding: 20, background: "var(--surface-dim)", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Card Number</label>
                      <input placeholder="1234  5678  9012  3456" style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="address-grid">
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>Expiry</label>
                        <input placeholder="MM / YY" style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", display: "block", marginBottom: 6 }}>CVV</label>
                        <input placeholder="•••" type="password" style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={processingPayment}
                  style={{
                    width: "100%", marginTop: 32, padding: "16px",
                    background: processingPayment ? "var(--on-surface-variant)" : "var(--primary)",
                    color: "white", border: "none",
                    fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600,
                    cursor: processingPayment ? "wait" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    opacity: processingPayment ? 0.7 : 1, transition: "all 0.3s ease",
                  }}
                >
                  {processingPayment ? (
                    <>Redirecting to Payment...</>
                  ) : (
                    <><Icon name="lock" size={14} /> {isShopifyConnected && checkoutUrl ? "Proceed to Secure Payment" : `Pay ${formatPrice(total)}`}</>
                  )}
                </button>
                <p style={{ textAlign: "center", fontSize: 11, color: "var(--on-surface-variant)", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Icon name="verified_user" size={14} /> {isShopifyConnected ? "Secured by Shopify — 256-bit SSL encryption" : "Secured by 256-bit SSL encryption"}
                </p>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="animate-fade-up" style={{ textAlign: "center", paddingTop: 20 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: "rgba(201,169,110,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                }}>
                  <Icon name="check_circle" size={40} filled />
                </div>
                <h2 className="font-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 8 }}>Order Confirmed</h2>
                <p className="font-serif" style={{ fontSize: 16, fontStyle: "italic", color: "var(--on-surface-variant)", marginBottom: 8 }}>
                  A memory is on its way to {address.name ? address.name.split(" ")[0] : "her"}.
                </p>
                <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 32 }}>
                  Order #MEM{Math.floor(100000 + Math.random() * 900000)} &nbsp;•&nbsp; Confirmation sent to {address.buyerEmail}
                </p>

                <div style={{ background: "var(--surface-dim)", padding: 24, textAlign: "left", marginBottom: 24 }}>
                  <h3 style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: 16 }}>Delivery Details</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="address-grid">
                    <div>
                      <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 4 }}>Delivering to</p>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{address.name}</p>
                      <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>{address.line1}<br />{address.city}, {address.state} — {address.pincode}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 4 }}>Estimated Delivery</p>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>4–7 business days</p>
                      <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>Tracking details will be sent to {address.buyerEmail}</p>
                    </div>
                  </div>
                </div>

                {/* What she'll receive */}
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)", padding: 24, textAlign: "left", marginBottom: 24 }}>
                  <h3 style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 12 }}>What {address.name ? address.name.split(" ")[0] : "she"} will receive</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { icon: "inventory_2", text: "Premium Memoir gift box — no pricing included" },
                      { icon: "auto_stories", text: "A story card with the piece's inspiration" },
                      { icon: "mail", text: "Your personal message, handwritten on a note" },
                    ].map((item) => (
                      <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--on-surface-variant)" }}>
                        <Icon name={item.icon} size={15} />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                    <button onClick={() => navigate("profile")} style={{
                      padding: "14px 32px", background: "var(--primary)", color: "white", border: "none",
                      fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                    }}>View Orders</button>
                    <button onClick={() => navigate("moments")} style={{
                      padding: "14px 32px", background: "transparent", color: "var(--charcoal)", border: "1px solid var(--outline-variant)",
                      fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                    }}>Continue Shopping</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary (visible on steps 1 & 2) */}
          {step < 3 && (
            <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
              <details className="order-summary-details" open>
                <summary className="order-summary-toggle" style={{ listStyle: "none", cursor: "pointer", display: "none", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "var(--surface-dim)", marginBottom: 0, fontSize: 13, fontWeight: 600 }}>
                  <span>Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {formatPrice(total)} <span className="accordion-icon"><Icon name="expand_more" size={18} /></span>
                  </span>
                </summary>
              <div style={{ background: "var(--surface-dim)", padding: 28 }}>
                <h3 className="order-summary-title" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: 20 }}>Order Summary</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 12 }}>
                      <div style={{ aspectRatio: "1", overflow: "hidden", position: "relative" }}>
                        <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {item.isGift && (
                          <div style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="redeem" size={10} />
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <p className="font-serif" style={{ fontSize: 14, marginBottom: 2 }}>{item.name}</p>
                          <p style={{ fontSize: 11, color: "var(--on-surface-variant)" }}>{item.type}</p>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--outline-variant)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--on-surface-variant)" }}>
                    <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: shipping === 0 ? "var(--gold)" : "var(--on-surface-variant)" }}>
                    <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--gold)" }}>
                    <span>Gift Box & Story Card</span><span>Included</span>
                  </div>
                  <div style={{ borderTop: "1px solid var(--outline-variant)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600, marginTop: 4 }}>
                    <span>Total</span><span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              </details>
              {/* Trust signals */}
              <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {[
                  { icon: "local_shipping", text: subtotal >= 1999 ? "Free shipping on this order" : "Free shipping on orders above ₹1,999" },
                  { icon: "verified_user", text: "BIS Hallmarked 925 sterling silver" },
                  { icon: "replay", text: "15-day easy returns" },
                  { icon: "redeem", text: "Gift-ready — no pricing on the package" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--on-surface-variant)" }}>
                    <Icon name={item.icon} size={16} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Footer ---
function Footer({ navigate }: { navigate: (page: string, param?: string | null) => void }) {
  return (
    <footer className="footer-inner" style={{ background: "var(--surface-dim)", padding: "64px 32px", marginTop: 0 }}>
      <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
        <div>
          <span className="font-serif" style={{ fontSize: 24, fontStyle: "italic", display: "block", marginBottom: 12 }}>Memoir</span>
          <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>Jewellery, as a memory you can touch.</p>
          <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginTop: 16, opacity: 0.6 }}>&copy; 2026 Memoir. Crafted for moments that matter.</p>
        </div>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Shop</p>
          {MOMENTS.map((m) => (
            <button key={m.id} onClick={() => navigate("moment", m.id)} className="font-serif line-reveal" style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "var(--on-surface-variant)", marginBottom: 10, paddingBottom: 2 }}>
              {m.name}
            </button>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>About</p>
          {[
            { label: "Our Story", page: "about" },
            { label: "Care Guide", page: "care-guide" },
            { label: "Shipping Policy", page: "shipping" },
            { label: "Returns & Exchange", page: "shipping" },
            { label: "My Account", page: "profile" },
          ].map((item) => (
            <button key={item.label} onClick={() => navigate(item.page)} className="font-serif line-reveal" style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "var(--on-surface-variant)", marginBottom: 10, paddingBottom: 2 }}>
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Connect</p>
          <a href="mailto:hello@memoir.in" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 12 }}>
            <Icon name="mail" size={16} /> hello@memoir.in
          </a>
          <a href="https://wa.me/919999999999?text=Hi%20Memoir!" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 12 }}>
            <Icon name="chat" size={16} /> WhatsApp Us
          </a>
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", opacity: 0.6 }}>925 Sterling Silver</span>
            <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-surface-variant)", opacity: 0.6 }}>BIS Hallmarked</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// --- Scroll Reveal Hook ---
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// --- Back to Top Button ---
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <Icon name="arrow_upward" size={20} />
    </button>
  );
}

// --- Mobile Cart Bar (Swiggy/Blinkit style) ---
function MobileCartBar({ cart, onViewCart }: {
  cart: CartItem[];
  onViewCart: () => void;
}) {
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="sticky-mobile-cart" style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "var(--primary)", borderTop: "none",
      padding: "0 20px", paddingBottom: "env(safe-area-inset-bottom, 20px)",
      display: "none", alignItems: "stretch", justifyContent: "space-between",
      zIndex: 50, boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
    }}>
      <button
        onClick={onViewCart}
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", cursor: "pointer", color: "white",
          padding: "16px 0", minHeight: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <Icon name="shopping_bag" size={22} />
            <span style={{
              position: "absolute", top: -6, right: -8, width: 18, height: 18,
              background: "var(--gold)", color: "white", fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "50%",
            }}>
              {totalItems}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block" }}>
              {totalItems} {totalItems === 1 ? "item" : "items"} · {formatPrice(totalPrice)}
            </span>
            <span style={{ fontSize: 10, opacity: 0.75, display: "block", marginTop: 1 }}>
              Free shipping above ₹1,999
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          View Cart
          <Icon name="arrow_forward" size={16} />
        </div>
      </button>
    </div>
  );
}

// APP
// ============================================================
// Hash-based routing helpers
function pageToHash(page: string, param: string | null): string {
  switch (page) {
    case "home": return "#/";
    case "moments": return "#/shop";
    case "moment": return `#/collection/${param || ""}`;
    case "product": return `#/product/${param || ""}`;
    case "about": return "#/about";
    case "care-guide": return "#/care-guide";
    case "shipping": return "#/shipping";
    case "profile": return "#/profile";
    case "checkout": return "#/checkout";
    default: return "#/";
  }
}

function hashToPage(hash: string): { page: string; param: string | null } {
  const path = hash.replace("#/", "").replace("#", "") || "";
  if (!path || path === "/") return { page: "home", param: null };
  if (path === "shop") return { page: "moments", param: null };
  if (path.startsWith("collection/")) return { page: "moment", param: path.replace("collection/", "") || null };
  if (path.startsWith("product/")) return { page: "product", param: path.replace("product/", "") || null };
  if (path === "about") return { page: "about", param: null };
  if (path === "care-guide") return { page: "care-guide", param: null };
  if (path === "shipping") return { page: "shipping", param: null };
  if (path === "profile") return { page: "profile", param: null };
  if (path === "checkout") return { page: "checkout", param: null };
  return { page: "home", param: null };
}

export default function App() {
  // Initialize from current URL hash
  const initial = hashToPage(window.location.hash);
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [pageParam, setPageParam] = useState<string | null>(initial.param);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [giftGuideOpen, setGiftGuideOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Auth
  const authValue = useAuthProvider();

  // Shopify integration — fetches products & collections from Shopify
  const { products, isShopifyConnected } = useProducts(FALLBACK_PRODUCTS);
  const { collections } = useCollections();
  const shopifyCart = useShopifyCart(isShopifyConnected);

  // Persist cart to user account when it changes
  useEffect(() => {
    if (authValue.isLoggedIn && shopifyCart.cart.length > 0) {
      authValue.saveCart(shopifyCart.cart);
    }
  }, [shopifyCart.cart, authValue.isLoggedIn]);

  // Listen for browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const { page, param } = hashToPage(window.location.hash);
      setCurrentPage(page);
      setPageParam(param);
      setSearchOpen(false);
      setGiftGuideOpen(false);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((page: string, param: string | null = null) => {
    if (page === "gift-guide") { setGiftGuideOpen(true); return; }
    // Auth gate: profile requires login
    if (page === "profile" && !authValue.isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    const hash = pageToHash(page, param);
    window.location.hash = hash;
    setCurrentPage(page);
    setPageParam(param);
    setSearchOpen(false);
    setGiftGuideOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [authValue.isLoggedIn]);

  const handleAddToCart = useCallback((product: MemoirProduct, isGift = false, giftMessage = "") => {
    shopifyCart.addItem(product, isGift, giftMessage);
  }, [shopifyCart.addItem]);

  const handleCheckout = useCallback(() => {
    // Always use built-in checkout page — Shopify checkout URL is used
    // only at the final "Pay" step to hand off to Shopify's payment gateway
    navigate("checkout");
  }, [navigate]);

  // Build the store context value
  const storeValue: StoreContextType = {
    products,
    collections,
    cart: shopifyCart.cart,
    cartCount: shopifyCart.cart.length,
    subtotal: shopifyCart.subtotal,
    checkoutUrl: shopifyCart.checkoutUrl,
    isShopifyConnected,
    addToCart: handleAddToCart,
    removeFromCart: shopifyCart.removeItem,
    clearCart: shopifyCart.clearAll,
    goToCheckout: handleCheckout,
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} onAddToCart={handleAddToCart} />;
      case "moments":
        return <MomentsPage navigate={navigate} onAddToCart={handleAddToCart} />;
      case "moment":
        return <MomentsPage navigate={navigate} onAddToCart={handleAddToCart} momentId={pageParam} />;
      case "product":
        return <ProductPage productId={pageParam} navigate={navigate} onAddToCart={handleAddToCart} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "care-guide":
        return <CareGuidePage navigate={navigate} />;
      case "shipping":
        return <ShippingPolicyPage navigate={navigate} />;
      case "profile":
        return <ProfilePage navigate={navigate} />;
      case "checkout":
        return <CheckoutPage navigate={navigate} cart={shopifyCart.cart} onRemoveFromCart={shopifyCart.removeItem} onClearCart={shopifyCart.clearAll} checkoutUrl={shopifyCart.checkoutUrl} isShopifyConnected={isShopifyConnected} />;
      default:
        return <HomePage navigate={navigate} onAddToCart={handleAddToCart} />;
    }
  };

  useScrollReveal();

  return (
    <AuthContext.Provider value={authValue}>
    <StoreContext.Provider value={storeValue}>
      <style>{GLOBAL_STYLES}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <Header currentPage={currentPage} navigate={navigate} cartCount={shopifyCart.cart.length} onCartClick={() => setCartOpen(true)} onSearchClick={() => setSearchOpen(true)} onGiftGuideClick={() => setGiftGuideOpen(true)} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={shopifyCart.cart} navigate={navigate} onRemoveFromCart={shopifyCart.removeItem} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
      <GiftGuideModal isOpen={giftGuideOpen} onClose={() => setGiftGuideOpen(false)} navigate={navigate} />
      {currentPage !== "checkout" && <MobileCartBar cart={shopifyCart.cart} onViewCart={() => setCartOpen(true)} />}
      <BackToTop />
      <AuthModal isOpen={authModalOpen} onClose={() => { setAuthModalOpen(false); if (authValue.isLoggedIn) navigate("profile"); }} />
    </StoreContext.Provider>
    </AuthContext.Provider>
  );
}

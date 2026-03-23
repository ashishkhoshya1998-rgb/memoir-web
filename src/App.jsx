import { useState, useEffect, useCallback } from "react";

// ============================================================
// MEMOIR — Complete Website
// "Jewellery, memory you can touch."
// ============================================================

// --- Data Layer ---
const PRODUCTS = [
  {
    id: "first-chapter",
    name: "The First Chapter",
    type: "Ring",
    price: 2499,
    originalPrice: 2999,
    moment: "new-beginnings",
    momentLabel: "New Beginnings",
    hook: "For the woman who just turned the page. A new job, a new city, a new version of herself. This ring holds that quiet courage.",
    gifterHook: "When she's starting something new, this ring says 'I believe in you' without needing the words.",
    story: "We designed The First Chapter Ring for a specific kind of woman — one who's standing at the start of something new and wants to carry that feeling with her. New beginnings are brave. They deserve to be marked, not just lived through. Wear it daily reminder that you chose to begin.",
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
  { id: "partner", label: "My Partner", emoji: "\u{1F495}" },
  { id: "sister", label: "My Sister", emoji: "\u{1F46F}" },
  { id: "friend", label: "My Friend", emoji: "\u{2728}" },
  { id: "colleague", label: "My Colleague", emoji: "\u{1F91D}" },
  { id: "daughter", label: "My Daughter", emoji: "\u{1F338}" },
  { id: "someone", label: "Someone Special", emoji: "\u{1F381}" },
];

const GIFT_MOMENTS = [
  { id: "birthday", label: "Her Birthday" },
  { id: "new-beginning", label: "A New Beginning" },
  { id: "just-because", label: "Just Because" },
  { id: "achievement", label: "She Achieved Something" },
  { id: "miss-her", label: "I Miss Her" },
  { id: "sorry", label: "I Want to Say Sorry" },
];

// --- Utility ---
const formatPrice = (p) => `\u20B9${p.toLocaleString("en-IN")}`;

// --- Styles ---
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Caveat:wght@400;500;600&display=swap');
  :root {
    --ivory: #FAF7F2;
    --charcoal: #2C2C2C;
    --gold: #C9A96E;
    --taupe: #B5A69A;
    --primary: #755939;
    --surface: #FAF7F2;
    --surface-dim: #F0EDE8;
    --surface-container: #EFEEEB;
    --on-surface: #1a1c1a;
    --on-surface-variant: #5E554C;
    --outline: #80756B;
    --outline-variant: #D2C4B8;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body, #root {
    font-family: 'DM Sans', sans-serif;
    background: var(--ivory);
    color: var(--charcoal);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  .font-serif { font-family: 'Cormorant Garamond', serif; }
  .font-handwritten { font-family: 'Caveat', cursive; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .stagger-1 { animation-delay: 0.1s; opacity: 0; }
  .stagger-2 { animation-delay: 0.2s; opacity: 0; }
  .stagger-3 { animation-delay: 0.3s; opacity: 0; }
  .stagger-4 { animation-delay: 0.4s; opacity: 0; }
  .hover-lift { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(26,28,26,0.08); }
  .img-zoom { overflow: hidden; }
  .img-zoom img { transition: transform 0.7s ease; }
  .img-zoom:hover img { transform: scale(1.05); }
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
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
  }
  @media (min-width: 769px) {
    .mobile-nav { display: none !important; }
  }
  @media (max-width: 768px) {
    .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .unbox-grid { grid-template-columns: 1fr !important; }
    .unbox-item { transform: none !important; }
  }
  @media (max-width: 968px) {
    .product-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
    .product-layout > div:last-child { position: static !important; }
  }
`;

// --- Icon Component ---
function Icon({ name, size = 24, filled = false }) {
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
function Header({ currentPage, navigate, cartCount, onCartClick }) {
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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span className="font-serif" style={{ fontSize: 26, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500 }}>
              Memoir
            </span>
          </button>
          <nav style={{ display: "flex", gap: 28 }} className="desktop-nav">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button onClick={onCartClick} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
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
            style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
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
              onClick={() => { navigate(l.page); setMobileMenuOpen(false); }}
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, padding: "14px 32px", background: "var(--surface-dim)", flexWrap: "wrap" }}>
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
function ProductCard({ product, navigate, style: cardStyle = {} }) {
  return (
    <div className="hover-lift" style={{ cursor: "pointer", ...cardStyle }} onClick={() => navigate("product", product.id)}>
      <div className="img-zoom" style={{ aspectRatio: "3/4", background: "var(--surface-container)", marginBottom: 16 }}>
        <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

function HomePage({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={PRODUCTS[0].images[0]} alt="Memoir hero" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) saturate(0.9)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(250,247,242,0.85) 0%, rgba(250,247,242,0.4) 50%, transparent 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 560 }}>
            <p className="font-handwritten animate-fade-up stagger-1" style={{ fontSize: 18, color: "var(--gold)", marginBottom: 16 }}>
              Jewellery, memory you can touch
            </p>
            <h1 className="font-serif animate-fade-up stagger-2" style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1, fontWeight: 400, color: "var(--charcoal)", marginBottom: 20 }}>
              Designed around the<br />moments that matter
            </h1>
            <p className="animate-fade-up stagger-3" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--on-surface-variant)", marginBottom: 36, maxWidth: 420 }}>
              Handcrafted 925 sterling silver. For birthdays, new beginnings, and every moment worth remembering.
            </p>
            <div className="animate-fade-up stagger-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("moments")}
                style={{
                  padding: "16px 36px", background: "var(--primary)", color: "white", border: "none",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target).style.background = "#5b4223")}
                onMouseLeave={(e) => ((e.target).style.background = "var(--primary)")}
              >
                Shop by Moment
              </button>
              <button
                onClick={() => navigate("gift-guide")}
                style={{
                  padding: "16px 36px", background: "transparent", color: "var(--charcoal)",
                  border: "1px solid var(--outline-variant)", fontSize: 11, letterSpacing: "0.2em",
                  textTransform: "uppercase", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.target).style.borderColor = "var(--primary)"; (e.target).style.color = "var(--primary)"; }}
                onMouseLeave={(e) => { (e.target).style.borderColor = "var(--outline-variant)"; (e.target).style.color = "var(--charcoal)"; }}
              >
                Find the Perfect Gift
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Shop by Moment */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 12 }}>
            Shop by Moment
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: "var(--charcoal)" }}>
            What&apos;s her moment?
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {MOMENTS.map((moment) => (
            <div
              key={moment.id}
              className="hover-lift"
              style={{ cursor: "pointer", position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "var(--surface-container)" }}
              onClick={() => navigate("moment", moment.id)}
            >
              <img
                src={PRODUCTS.find((p) => p.moment === moment.id)?.images[0]}
                alt={moment.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(0.85)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,44,44,0.7) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32 }}>
                <h3 className="font-serif" style={{ fontSize: 28, color: "white", fontWeight: 400, marginBottom: 8 }}>{moment.name}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{moment.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ background: "var(--surface-container)", padding: "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 12 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 32 }}>
            {PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="story-grid">
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
            <div style={{ transform: "rotate(2deg)", background: "white", padding: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
              <img src={PRODUCTS[5].images[0]} alt="Memoir story" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "saturate(0.9)" }} />
            </div>
            <div className="font-handwritten" style={{ position: "absolute", bottom: -20, right: -10, fontSize: 24, color: "var(--gold)", transform: "rotate(-3deg)" }}>
              Moments, not things &hearts;
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ background: "var(--charcoal)", padding: "96px 32px", textAlign: "center" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 16 }}>
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

function MomentsPage({ navigate, momentId = null }) {
  const activeMoment = momentId ? MOMENTS.find((m) => m.id === momentId) : null;
  const filteredProducts = momentId ? PRODUCTS.filter((p) => p.moment === momentId) : PRODUCTS;

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 32px", textAlign: "center" }}>
        {activeMoment ? (
          <>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 12 }}>Shop the Moment</span>
            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, marginBottom: 16 }}>{activeMoment.name}</h1>
            <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)", maxWidth: 500, margin: "0 auto" }}>{activeMoment.tagline}</p>
          </>
        ) : (
          <>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 12 }}>All Pieces</span>
            <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, marginBottom: 16 }}>Shop by Moment</h1>
            <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)", maxWidth: 500, margin: "0 auto" }}>Every piece is designed around a moment worth remembering.</p>
          </>
        )}
      </section>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 48px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("moments")}
          style={{
            padding: "10px 24px",
            border: !momentId ? "1px solid var(--primary)" : "1px solid var(--outline-variant)",
            background: !momentId ? "var(--primary)" : "transparent",
            color: !momentId ? "white" : "var(--on-surface-variant)",
            fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease",
          }}
        >
          All Pieces
        </button>
        {MOMENTS.map((m) => (
          <button
            key={m.id}
            onClick={() => navigate("moment", m.id)}
            style={{
              padding: "10px 24px",
              border: momentId === m.id ? "1px solid var(--primary)" : "1px solid var(--outline-variant)",
              background: momentId === m.id ? "var(--primary)" : "transparent",
              color: momentId === m.id ? "white" : "var(--on-surface-variant)",
              fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease",
            }}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductPage({ productId, navigate, onAddToCart }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(0);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.moment === product.moment).slice(0, 2);
  if (relatedProducts.length < 2) {
    PRODUCTS.filter((p) => p.id !== product.id && !relatedProducts.find((r) => r.id === p.id))
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
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px" }}>
        <nav style={{ display: "flex", gap: 8, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: 32 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit", letterSpacing: "inherit" }}>Shop</button>
          <span>/</span>
          <button onClick={() => navigate("moment", product.moment)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "inherit", letterSpacing: "inherit" }}>{product.momentLabel}</button>
          <span>/</span>
          <span style={{ color: "var(--charcoal)" }}>{product.name}</span>
        </nav>

        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 64 }} className="product-layout">
          {/* Gallery */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridColumn: "span 2", aspectRatio: "4/5", overflow: "hidden", background: "var(--surface-container)", cursor: "crosshair" }}>
                <img src={product.images[activeImage]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
              </div>
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1", overflow: "hidden", cursor: "pointer", background: "var(--surface-container)",
                    border: activeImage === i + 1 ? "2px solid var(--gold)" : "2px solid transparent",
                    transition: "border 0.3s ease",
                  }}
                  onClick={() => setActiveImage(i + 1)}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: activeImage === i + 1 ? 1 : 0.7, transition: "opacity 0.3s ease" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
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
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Send</p>
                    <p style={{ fontSize: 10, color: "var(--on-surface-variant)" }}>Includes handwritten story note & premium box</p>
                  </div>
                </div>
                <div style={{ width: 40, height: 22, borderRadius: 11, background: isGift ? "var(--gold)" : "#ccc", position: "relative", transition: "background 0.3s ease", padding: 3 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "white", transform: isGift ? "translateX(18px)" : "translateX(0)", transition: "transform 0.3s ease" }} />
                </div>
              </div>

              {/* Gift Message */}
              {isGift && (
                <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label className="font-serif" style={{ fontSize: 15, fontStyle: "italic", color: "var(--primary)" }}>
                    What would you say to her if she were here right now?
                  </label>
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write your message..."
                    rows={3}
                    style={{
                      width: "100%", padding: 16, border: "1px solid var(--outline-variant)",
                      background: "white", fontSize: 14, fontFamily: "'Caveat', cursive",
                      resize: "vertical", lineHeight: 1.6,
                    }}
                  />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["For your new beginning. I'm so proud of you.", "Because you deserve something beautiful.", "I chose this for the same reason I chose you."].map((msg) => (
                      <button
                        key={msg}
                        onClick={() => setGiftMessage(msg)}
                        style={{
                          padding: "6px 12px", fontSize: 11, border: "1px solid var(--outline-variant)",
                          background: giftMessage === msg ? "var(--primary)" : "transparent",
                          color: giftMessage === msg ? "white" : "var(--on-surface-variant)",
                          cursor: "pointer", transition: "all 0.2s ease", fontStyle: "italic",
                        }}
                      >
                        {msg}
                      </button>
                    ))}
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
                      <Icon name="expand_more" size={18} />
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
      <section style={{ background: "var(--surface-container)", padding: "96px 32px", marginTop: 80 }}>
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
            <img src={product.images[product.images.length - 1]} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", filter: "grayscale(0.2) saturate(0.9)" }} />
          </div>
        </div>
      </section>

      {/* Unboxing */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 12 }}>The Ritual</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400 }}>How She&apos;ll Receive It</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="unbox-grid">
          {[
            { step: "01", title: "The Opening", subtitle: "The Ink-Pressed Box", desc: "A heavy, linen-textured box sealed with care, ensuring the moment feels metal inside.", img: PRODUCTS[1].images[0] },
            { step: "02", title: "The Narrative", subtitle: "The Story Card", desc: "Each piece comes with a hand-lettered card detailing its emotional inspiration — the story that makes it hers.", img: PRODUCTS[3].images[1], offset: 32 },
            { step: "03", title: "The Heirloom", subtitle: "The First Glimpse", desc: "Protected by silk velvet, the silver is polished one final time before shipment to ensure a mirror-like reveal.", img: PRODUCTS[4].images[2], offset: 64 },
          ].map((item) => (
            <div key={item.step} style={{ transform: `translateY(${item.offset || 0}px)` }} className="unbox-item">
              <div className="img-zoom" style={{ aspectRatio: "3/4", position: "relative", marginBottom: 20 }}>
                <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.3)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                  {item.step}. {item.title}
                </div>
              </div>
              <h3 className="font-serif" style={{ fontSize: 20, fontStyle: "italic", marginBottom: 8 }}>{item.subtitle}</h3>
              <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 96px" }}>
          <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: "italic", marginBottom: 32 }}>Complete the Moment</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function GiftGuidePage({ navigate }) {
  const [step, setStep] = useState(0);
  const [relationship, setRelationship] = useState(null);
  const [giftMoment, setGiftMoment] = useState(null);

  const getRecommendations = () => {
    let recs = [...PRODUCTS];
    if (giftMoment === "new-beginning") recs = recs.sort((a) => (a.moment === "new-beginnings" ? -1 : 1));
    else if (giftMoment === "achievement") recs = recs.sort((a) => (a.moment === "because-you-deserve-it" ? -1 : 1));
    else if (giftMoment === "miss-her") recs = recs.sort((a) => (a.id === "still-here" ? -1 : 1));
    return recs.slice(0, 3);
  };

  const relationshipCopy = {
    partner: "your partner",
    sister: "your sister",
    friend: "your friend",
    colleague: "your colleague",
    daughter: "your daughter",
    someone: "someone special",
  };

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
          {[0, 1, 2].map((s) => (
            <div key={s} style={{ flex: 1, height: 2, background: step >= s ? "var(--gold)" : "var(--outline-variant)", transition: "background 0.4s ease", opacity: step >= s ? 1 : 0.3 }} />
          ))}
        </div>

        {step === 0 && (
          <div className="animate-fade-up">
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: 16 }}>Find the Perfect Gift</span>
            <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 400, marginBottom: 12 }}>Who are you gifting?</h1>
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 36 }}>This helps us recommend pieces with the right emotional tone.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {GIFT_RELATIONSHIPS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRelationship(r.id); setStep(1); }}
                  style={{
                    padding: "20px 16px", border: "1px solid var(--outline-variant)", background: "white",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 12,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "var(--gold)"; (e.currentTarget).style.background = "rgba(201,169,110,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "var(--outline-variant)"; (e.currentTarget).style.background = "white"; }}
                >
                  <span style={{ fontSize: 24 }}>{r.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-up">
            <button onClick={() => setStep(0)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 24, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="arrow_back" size={16} /> Back
            </button>
            <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 400, marginBottom: 12 }}>What&apos;s the moment?</h1>
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 36 }}>Every piece carries a different feeling. Help us match the right one.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {GIFT_MOMENTS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setGiftMoment(m.id); setStep(2); }}
                  style={{
                    padding: "20px 24px", border: "1px solid var(--outline-variant)", background: "white",
                    cursor: "pointer", textAlign: "left", fontSize: 15, fontWeight: 400, transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "var(--gold)"; (e.currentTarget).style.background = "rgba(201,169,110,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "var(--outline-variant)"; (e.currentTarget).style.background = "white"; }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 24, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="arrow_back" size={16} /> Back
            </button>
            <h1 className="font-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 8 }}>
              Here&apos;s what we&apos;d recommend for {relationshipCopy[relationship]}
            </h1>
            <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 40 }}>Each piece arrives gift-wrapped with a personal message card.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {getRecommendations().map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: "grid", gridTemplateColumns: "120px 1fr", gap: 20, padding: 16,
                    background: i === 0 ? "rgba(201,169,110,0.06)" : "white",
                    border: i === 0 ? "1px solid var(--gold)" : "1px solid var(--outline-variant)",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate("product", p.id)}
                  onMouseEnter={(e) => { if (i !== 0) (e.currentTarget).style.borderColor = "var(--gold)"; }}
                  onMouseLeave={(e) => { if (i !== 0) (e.currentTarget).style.borderColor = "var(--outline-variant)"; }}
                >
                  <div style={{ aspectRatio: "1", overflow: "hidden" }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {i === 0 && (
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 4 }}>Our Top Pick</span>
                    )}
                    <h3 className="font-serif" style={{ fontSize: 20, marginBottom: 6 }}>{p.name}</h3>
                    <p style={{ fontSize: 12, color: "var(--on-surface-variant)", lineHeight: 1.5, marginBottom: 8 }}>{p.gifterHook}</p>
                    <span style={{ fontSize: 15, fontWeight: 400 }}>{formatPrice(p.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setStep(0); setRelationship(null); setGiftMoment(null); }}
              style={{ marginTop: 32, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              Start Over
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden" }}>
        <img src={PRODUCTS[0].images[2]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} />
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

      <section style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
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
          <div style={{ background: "var(--surface-dim)", padding: 40, borderLeft: "3px solid var(--gold)" }}>
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
                { title: "Gifting First-Class Experience", desc: "We built the entire gifting experience from scratch — the box, the story card, the personal message, the price-hidden packaging. Because giving a gift should feel one." },
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

      <section style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
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
function CareGuidePage({ navigate }) {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ position: "relative", height: "40vh", minHeight: 300, overflow: "hidden" }}>
        <img src={PRODUCTS[3].images[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
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

      <section style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {/* Intro */}
          <div>
            <p className="font-serif" style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.8, color: "var(--primary)" }}>
              Every Memoir piece is crafted from 925 sterling silver with rhodium plating. With a little care, your jewellery will stay moment it represents.
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
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
          <div style={{ background: "var(--surface-dim)", padding: 40, borderLeft: "3px solid var(--gold)" }}>
            <h3 className="font-serif" style={{ fontSize: 22, fontStyle: "italic", marginBottom: 12 }}>A Note on Rhodium Plating</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--on-surface-variant)" }}>
              All Memoir pieces are rhodium plated for extra shine and tarnish resistance. With daily wear, rhodium plating naturally wears over time (typically 12-18 months). This is normal and reveals the warm tone of the sterling silver beneath. If you prefer the bright rhodium finish, any local jeweller can re-plate your piece affordably.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
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
function ShippingPolicyPage({ navigate }) {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ position: "relative", height: "40vh", minHeight: 300, overflow: "hidden" }}>
        <img src={PRODUCTS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
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

      <section style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px" }}>
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
                We understand that sometimes a piece doesn&apos;t feel right. Our return policy is designed to make the process.
              </p>

              <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>How to Return</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
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
                { q: "Can I change my delivery address after placing an order?", a: "Yes, order hasn't been shipped yet. Reach out to us at hello@memoir.in and we'll update it for you." },
                { q: "What if my order arrives damaged?", a: "We're truly sorry if this happens. Contact us within 48 hours of delivery with photos, and we'll send a replacement immediately at no extra cost." },
                { q: "Can I return a gift order?", a: "Yes. The recipient can initiate a return by contacting us directly. The refund will be processed to the original buyer's payment method." },
                { q: "Do you offer express shipping?", a: "Not at this time. Our standard shipping (4-7 business days) ensures every piece is carefully inspected and beautifully packaged before it reaches you." },
              ].map((item) => (
                <details key={item.q} style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                  <summary style={{ listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "18px 0", fontSize: 15, fontWeight: 500 }}>
                    {item.q}
                    <Icon name="expand_more" size={18} />
                  </summary>
                  <div style={{ paddingBottom: 18, fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--charcoal)", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="font-serif" style={{ fontSize: 32, color: "white", fontWeight: 300, marginBottom: 12 }}>Still have questions?</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>We&apos;re here to help — reach out anytime.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--charcoal)", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="mail" size={16} /> Email Us
          </button>
          <button style={{ padding: "16px 36px", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="chat" size={16} /> WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

// --- Cart Drawer ---
function CartDrawer({ isOpen, onClose, cart, navigate, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 59, transition: "opacity 0.3s ease" }} onClick={onClose} />
      )}
      <div
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
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 400 }}>Your Anthology</h2>
            <p style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>{cart.length} {cart.length === 1 ? "piece" : "pieces"} curated</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="close" size={24} /></button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "24px 32px" }} className="no-scrollbar">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <div style={{ opacity: 0.2, marginBottom: 16 }}><Icon name="shopping_bag" size={48} /></div>
              <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", color: "var(--on-surface-variant)" }}>Your anthology is empty</p>
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
                  <div style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer" }} onClick={() => { onClose(); navigate("product", item.product.id); }}>
                    <img src={item.product.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 className="font-serif" style={{ fontSize: 16, marginBottom: 4 }}>{item.product.name}</h4>
                      {item.isGift && (
                        <span style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          <Icon name="redeem" size={12} /> Gift wrapped
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 400 }}>{formatPrice(item.product.price)}</span>
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

// --- Footer ---
function Footer({ navigate }) {
  return (
    <footer style={{ background: "var(--surface-dim)", padding: "64px 32px", marginTop: 0 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
        <div>
          <span className="font-serif" style={{ fontSize: 24, fontStyle: "italic", display: "block", marginBottom: 12 }}>Memoir</span>
          <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>Jewellery, memory you can touch.</p>
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
          ].map((item) => (
            <button key={item.label} onClick={() => navigate(item.page)} className="font-serif line-reveal" style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "var(--on-surface-variant)", marginBottom: 10, paddingBottom: 2 }}>
              {item.label}
            </button>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Connect</p>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 12 }}>
            <Icon name="mail" size={16} /> hello@memoir.in
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 12 }}>
            <Icon name="chat" size={16} /> WhatsApp Us
          </button>
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
// APP
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageParam, setPageParam] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useCallback((page, param = null) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addToCart = useCallback((product, isGift = false, giftMessage = "") => {
    setCart((prev) => [...prev, { product, isGift, giftMessage }]);
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} onAddToCart={addToCart} />;
      case "moments":
        return <MomentsPage navigate={navigate} onAddToCart={addToCart} />;
      case "moment":
        return <MomentsPage navigate={navigate} onAddToCart={addToCart} momentId={pageParam} />;
      case "product":
        return <ProductPage productId={pageParam} navigate={navigate} onAddToCart={addToCart} />;
      case "gift-guide":
        return <GiftGuidePage navigate={navigate} onAddToCart={addToCart} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "care-guide":
        return <CareGuidePage navigate={navigate} />;
      case "shipping":
        return <ShippingPolicyPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} onAddToCart={addToCart} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <Header currentPage={currentPage} navigate={navigate} cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} navigate={navigate} onRemoveFromCart={removeFromCart} />
    </>
  );
}

# Memoir

**Jewellery, as a memory you can touch.**

Memoir is a luxury jewelry e-commerce web app that connects handcrafted sterling silver pieces to meaningful life moments and emotions. Browse curated collections, discover the perfect gift, and checkout seamlessly — all in one place.

## Features

- **Shop by Moments** — Browse jewelry organized by emotional themes: *New Beginnings*, *Because You Deserve It*, and *Gift Someone Special*
- **Interactive Gift Guide** — A questionnaire-driven flow that recommends the perfect piece based on recipient, occasion, style, and budget
- **Product Stories** — Each piece comes with its own narrative, specs, and styling details
- **Shopping Cart & Checkout** — Full cart management with Shopify-powered checkout and payment processing
- **Gift Messaging** — Add personalized messages when purchasing jewelry as a gift
- **User Accounts** — Sign up via email, phone OTP, or Google OAuth. Save addresses, manage wishlists, and view order history
- **Search & Discovery** — Global search, collection browsing, related products, and trending sections
- **Responsive Design** — Mobile-first layouts with touch-optimized interactions

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, MUI Icons, Lucide |
| Animation | Motion |
| Forms | React Hook Form |
| E-Commerce | Shopify Storefront API (GraphQL) |
| Auth | Firebase (Email, Phone OTP, Google OAuth) |
| Notifications | Sonner |
| Charts | Recharts |

## Project Structure

```
src/
├── main.tsx                  # Entry point
├── app/
│   ├── App.tsx               # Main app component, routing, and state
│   ├── components/
│   │   ├── gift-questionnaire.tsx
│   │   └── ui/               # 46+ reusable UI components
│   └── lib/
│       └── shopify/          # Shopify integration helpers
├── lib/
│   ├── firebase.ts           # Firebase config & auth
│   ├── shopify.ts            # Shopify Storefront API client
│   └── useShopify.ts         # React hooks for products, cart & collections
└── styles/
    ├── index.css             # Main stylesheet
    ├── fonts.css             # Typography (Playfair Display, Outfit, Bodoni)
    ├── tailwind.css
    └── theme.css             # Theme variables & animations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/ashishkhoshya1998-rgb/memoir-web.git
cd memoir-web
git checkout staging
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

## Collections

Memoir organizes its catalog around three core moments:

- **New Beginnings** — Pieces for life transitions, new chapters, and fresh starts
- **Because You Deserve It** — Self-love, personal milestones, and everyday luxury
- **Gift Someone Special** — Occasion-based gifting for the people who matter most

## License

This project is proprietary. All rights reserved.

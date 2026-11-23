# FORGE — Fitness Store (React Frontend)

> **Train Stronger. Live Louder.**
> A professional, fully functional e-commerce **frontend** for a fitness store selling supplements and training gear — built with React. No backend, no APIs: the entire store runs in the browser.

![React](https://img.shields.io/badge/React-19-61DAFB) ![Vite](https://img.shields.io/badge/Vite-7-646CFF) ![License](https://img.shields.io/badge/License-MIT-green)

## About

FORGE is a portfolio-grade e-commerce experience modelled on real Indian fitness stores, reimagined with a premium minimal aesthetic. It ships with a complete catalogue of **24 realistic products** — whey protein, pre-workout, creatine, vitamins and pro-grade gear — with INR pricing, discounts, ratings and stock states.

Everything a real store does on the client side works here: browsing, filtering, searching, cart, wishlist, promo codes, accounts, checkout and order history. State persists in `localStorage`, so your cart, wishlist and orders survive page refreshes.

> **Demo only:** This is a frontend-only project. There is no server, no real payment processing and no real user database — accounts and orders live in your browser's localStorage. Do not use this pattern for real credentials in production.

## Demo Credentials

Log in instantly with the seeded demo account (also shown on the login page):

| Email | Password |
|---|---|
| `demo@forge.fit` | `demo123` |

Or create your own account from the Sign Up page — it works fully, stored locally.

**Try the promo codes at cart:** `FORGE10` (10% off) · `FIRSTBUY` (15% off). Shipping is free above ₹999.

## Features

- **Home** — bold hero, benefits strip, category tiles, bestsellers & new arrivals, promo banner, testimonials, working newsletter signup state
- **Shop** — category / brand / price-range filters, in-stock toggle, 4 sort modes, live search via header
- **Product pages** — gallery image, ratings, discount %, quantity selector, add to cart / wishlist, related products
- **Cart** — quantity controls, MRP vs price savings, promo codes, free-shipping progress bar
- **Wishlist** — save products, move them to cart
- **Auth** — split-screen login & signup with full form validation, protected routes, user menu, logout
- **Dashboard** — order / wishlist / cart-value / reward-point stats, recent orders, wishlist preview, editable profile & address
- **Checkout** — address form with validation, UPI / Card / COD options, order summary, order-confirmation screen with order ID
- **Orders** — full order history with items, totals and status
- **Plus** — About & Contact pages (with working form state), toast notifications, 404 page, fully responsive with mobile menu

## Tech Stack

- **React 19** + **Vite 7**
- **React Router DOM** — client-side routing with protected routes
- **Context API** — `AuthContext` (accounts/session) and `StoreContext` (cart, wishlist, orders, toasts)
- **Plain CSS** — one global stylesheet with CSS variables (no Tailwind, no UI libraries)
- **localStorage** — persistence for accounts, session, cart, wishlist and orders
- **Fonts** — Archivo (display) + Inter (body) via Google Fonts

## Run It Locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Folder Structure

```
forge-fitness-store/
├── index.html                # Fonts, title, meta
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + providers + layout
    ├── index.css             # Global stylesheet (design system)
    ├── data/
    │   └── products.js       # 24-product catalogue, categories, promo codes
    ├── context/
    │   ├── AuthContext.jsx   # Signup/login/logout, session, profile
    │   └── StoreContext.jsx  # Cart, wishlist, orders, toasts
    ├── components/
    │   ├── Header.jsx        # Sticky header, search, user menu, mobile nav
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx   # Card + star rating + image fallback
    │   ├── AuthLayout.jsx    # Split-screen auth layout
    │   ├── ProtectedRoute.jsx
    │   └── Toasts.jsx
    └── pages/
        ├── Home.jsx  ·  Shop.jsx  ·  ProductDetail.jsx
        ├── Cart.jsx  ·  Wishlist.jsx
        ├── Login.jsx ·  Signup.jsx
        ├── Dashboard.jsx · Checkout.jsx · Orders.jsx
        └── About.jsx · Contact.jsx · NotFound.jsx
```

## Design Notes

- Light premium theme: off-white `#FAFAF8`, near-black ink `#141414`, volt-green accent `#B4E33D`
- Archivo display type — heavy, uppercase, tight — paired with Inter for UI text
- Product imagery from Unsplash with automatic fallback placeholders, so cards never break

## Author

**Dhrumesh Makwana** — student developer, India
GitHub: [@dhrumeshmakwana-sudo](https://github.com/dhrumeshmakwana-sudo)

## License

MIT — free to learn from and build on.

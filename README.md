# Luxe — Premium E-commerce Frontend

A production-grade e-commerce storefront built with Next.js 16 (App Router) and TypeScript, consuming a separate ASP.NET Core 8 backend API. Built as a portfolio project with an emphasis on premium visual design, real state management, accessibility, and performance.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** React Context (Basket, Auth, Wishlist, Theme, Toast)
- **Forms:** React Hook Form + Zod
- **Data fetching:** Axios (with a centralized interceptor layer)
- **Payments:** Stripe.js / React Stripe.js
- **Cache:** Redis (used by the backend for basket storage)

## Features

- Product catalog with search, filtering (brand/category), sorting, and pagination
- Product detail pages with related products and recently-viewed tracking
- Persistent shopping basket synced with the backend (Redis-backed)
- Wishlist (client-side, persisted in `localStorage`)
- Full authentication flow (Register/Login/JWT session with auto-expiry warning)
- Multi-step checkout (Address → Delivery → Payment) with Stripe Elements
- Order history and order detail pages
- Admin dashboard (product CRUD, image upload, order management) — role-protected
- Light/Dark mode
- Fully responsive (320px → 2560px), keyboard-accessible, with focus traps on all modals

## Prerequisites

- Node.js 18+
- The companion **ASP.NET Core 8 backend** running (see its own README)
- **Redis** running locally (used by the backend for basket storage) — via WSL, Docker, or a native Windows build like Memurai
- SQL Server with the backend's databases already migrated

## Getting Started

1. Clone the repo and install dependencies:

```bash
   npm install
```

2. Copy the example environment file and fill in your values:

```bash
   cp .env.example .env.local
```

3. Make sure the backend API and Redis are both running (see [Backend Setup](#backend-setup) below).

4. Start the dev server:

```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for the full list. At minimum you need:

## Backend Setup

This frontend expects a running ASP.NET Core 8 API with:

- SQL Server (two databases: catalog/orders + Identity)
- Redis (for basket storage) — the backend will throw connection errors if Redis isn't running
- A user account with the `Admin` role to access `/admin`

### A note on local HTTPS certificates

Because the backend runs on a self-signed local HTTPS certificate, Node.js (which powers this app's Server Components) needs to be told to trust it in development. This project's `dev` script sets `NODE_TLS_REJECT_UNAUTHORIZED=0` for that reason.

**This must never be used in production** — it disables TLS certificate verification entirely. In production, the backend should be served behind a real, trusted certificate, and this flag should be removed.

## Accessing the Admin Dashboard

1. Log in with an account that has the `Admin` role assigned in the database.
2. Click your name in the navbar → a dropdown appears → select **"Admin Dashboard"** (or navigate directly to `/admin`).
3. From there you can manage products (create/edit/delete, image upload) and view/update order statuses.

Regular (non-admin) accounts are redirected away from `/admin` automatically.

## Known Limitations

- Stripe webhook handling (for async payment confirmation) requires the Stripe CLI for local testing — not covered in this setup.
- Product category images on the homepage use a placeholder gradient until real photography is added to `/public`.

## Project Structure

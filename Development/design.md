# Monza Kumas — Design Brief (v1)

> Master spec for the public website. Target stack: **Next.js 14 (App Router)**, **TypeScript**, **Tailwind**, **shadcn/ui**, **Framer Motion**. No Prisma; file-based JSON for demo, later Firestore.

## Goal

A single-catalog textile site for **Monza Kumas** with smooth, tasteful animations. Home shows a hero banner, a "New collection" mosaic, and 8 featured products; users can open **All Products**, view **Product Detail**, and **submit an order request** with contact info. Left hamburger opens a drawer with **About Us**, **Contact**, **Catalog**.

## Pages & routes

* `/` **Home**

  * Header: centered logo **Monza Kumas**; left hamburger → Drawer (About Us, Contact, Catalog).
  * **Hero banner** (big image, subtle parallax, headline + CTA to Products).
  * **New collection** mosaic (3–4 images).
  * **Products (featured)**: grid of **8** items; card shows image, name, optional price per meter, **Stock: X m** chip.
  * "**See all**" link/button → `/products`.
  * Footer with socials + copyright.

* `/products` **All Products**

  * Client-side filters: **Pattern**, **Colors**, **Swatch Type**, **Price range**, **In stock**.
  * Sort: **Newest**, **Price**, **Stock**.
  * Responsive grid; pagination or infinite scroll.

* `/products/[slug]` **Product Detail**

  * Large gallery with thumbnails.
  * Right info pane:

    * Name, optional **Price (per meter)**, **Stock: X m**.
    * Attributes list with labels: **Pattern**, **Colors**, **Swatch Type**, **Length (m)**.
    * **Order Request** form (qty in meters, name, company optional, email, phone, note). Submit → POST `/api/orders` → success toast **“We’ll get back to you shortly.”** and redirect to `/order-success`.
    * **Call to order** button `tel:+90...`.

* `/catalog` **Catalog (Swatches)**

  * Grid of swatch cards (image + key attributes). Click → Product Detail.

* `/about` **About Us** — short story, capabilities, photos.

* `/contact` **Contact** — info + map/embed + contact form (POST `/api/contact`).

* `/order-success` **Order Confirmation** — success message, link back to products.

## Components

* **Header** (logo center, hamburger → Drawer).
* **Drawer** (About, Contact, Catalog) with trap focus and ESC close.
* **Hero** (parallax background, gradient overlay, motion entrance).
* **ProductCard** (image, name, price per m, stock chip, hover lift, optional quick-view modal). Uses **shared layout** on image.
* **FiltersBar** (selects, chips, reset) reading/writing URL query.
* **ProductGallery** (main + thumbs, keyboard accessible, swipe on mobile).
* **OrderForm** (react-hook-form + zod). Validate qty ≤ stock.
* **Footer** (copyright + socials).
* **Toast/Skeletons**.

## Data model (TypeScript)

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  images: string[];
  pattern: string;       // Pattern
  colors: string[];      // Colors
  swatchType: string;    // Swatch Type
  lengthMeters: number;  // available stock
  pricePerMeter?: number;
  createdAt: string;     // ISO
};

export type Order = {
  id: string;
  productId: string;
  qtyMeters: number;
  name: string;
  company?: string;
  email: string;
  phone: string;
  note?: string;
  createdAt: string;     // ISO
};
```

**Seed files**: `/data/fabrics.json` (array of `Product`), `/data/orders.json` (created at runtime), `/data/messages.json` (contact).

## API (demo)

* `GET /api/fabrics?limit=8&pattern=&color=&swatchType=&min=&max=` → list products.
* `GET /api/fabrics/[slug]` → product detail by slug.
* `POST /api/orders` → create order (persist JSON, return `orderId`).
* `POST /api/contact` → save message (later email).

## Visual & motion

* **Palette**: neutral black/white/gray + warm accent (coral `#FF6B6B`).
* **Typography**: Inter/Manrope. Headings semibold.
* **Corners**: rounded-2xl, soft shadows.
* **Framer Motion**:

  * Page fade + 8px rise (220ms). Use `AnimatePresence`.
  * Staggered grid reveal (40ms item, 240ms).
  * Drawer slide-in left (spring 320/28).
  * Shared layout image from card → detail.
  * Respect `prefers-reduced-motion`.

## UX details

* English attribute labels everywhere: **Pattern**, **Colors**, **Swatch Type**, **Length (m)**, **Price**.
* Out-of-stock state disables order, offers contact.
* Keep list context when returning from detail.
* Show success toast: *“Order received. We’ll get back to you shortly.”*

## Acceptance checklist

* [ ] Home includes hero, mosaic, featured 8, animations.
* [ ] Drawer works and is accessible.
* [ ] `/products` filters & sorts.
* [ ] Product detail shows attributes & stock; order form validates and posts.
* [ ] Orders persist; success page renders.
* [ ] Footer copyright & socials.
* [ ] Lighthouse ≥ 90 on mobile for Perf/Access/BP.

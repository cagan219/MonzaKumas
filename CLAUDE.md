# CLAUDE.md — Engineering Guide (v1)

## Role

Act as a senior Next.js engineer inside Cursor. Implement exactly what `design.md` specifies. Favor composable components, strong typing, and a11y.

## Stack

* Next.js 14 App Router, TypeScript
* Tailwind CSS + shadcn/ui (Button, Input, Drawer/Sheet, Badge, Toast)
* Framer Motion for animations
* No Prisma. Use file-based JSON via `fs.promises` (later Firestore).

## Setup

1. Node ≥ 18.17
2. `npm install`
3. `npm run dev`

## Folder layout (target)

```
app/
  layout.tsx
  page.tsx
  products/
    page.tsx
    [slug]/page.tsx
  catalog/page.tsx
  about/page.tsx
  contact/page.tsx
  order-success/page.tsx
  api/
    fabrics/route.ts
    fabrics/[slug]/route.ts
    orders/route.ts
    contact/route.ts
components/
  header.tsx
  drawer.tsx
  hero.tsx
  product-card.tsx
  product-gallery.tsx
  order-form.tsx
  filters-bar.tsx
  footer.tsx
  skeletons.tsx
lib/
  data.ts
  types.ts
data/
  fabrics.json
  orders.json
  messages.json
public/
  images/...
```

## Data helpers (`lib/data.ts`)

* `readJson<T>(p: string): Promise<T>`
* `writeJson<T>(p: string, data: T): Promise<void>`
* Use `path.join(process.cwd(), 'data', ...)`.

## API routes

All run with `export const runtime = 'nodejs';` and `export const dynamic = 'force-dynamic';`.

* `GET /api/fabrics` — list with filters from query.
* `GET /api/fabrics/[slug]` — get one.
* `POST /api/orders` — validate body `{ productId, qtyMeters, name, email, phone, note? }`, clamp qty to stock, write to `/data/orders.json`.
* `POST /api/contact` — `{ name, email, phone?, message }` → `/data/messages.json`.

## Components — key requirements

* **Header**: centered brand, left hamburger → Drawer (About, Contact, Catalog). Close on route change.
* **Hero**: parallax image section with gradient overlay, CTA button.
* **ProductCard**: motion hover (scale 1.01, shadow), stock chip, use `layoutId` on image wrapper for shared transition.
* **FiltersBar**: controlled selects + chips, sync to URL query.
* **ProductGallery**: main image + thumbs; keyboard and swipe; `next/image`.
* **OrderForm**: `react-hook-form + zod`; qty ≤ stock; toast on success; redirect to `/order-success`.
* **Footer**: socials + copyright.

## Animations (Framer Motion)

* Page transition: fade + 8px rise, 220ms; use `AnimatePresence` in `layout.tsx`.
* Grid reveal: stagger 40ms per card (delayChildren + staggerChildren).
* Drawer: slide-in from left (`spring` stiffness 320, damping 28).
* Shared layout: ProductCard image → ProductDetail hero image (`layoutId` = `img-<product.id>`).
* Respect `prefers-reduced-motion`.

## Coding standards

* No `any` in components. Export props types.
* A11y: roles/aria on Drawer, focus trap, ESC, return focus. Form labels tied to inputs.
* Use `next/font` (Inter/Manrope). Images must have meaningful `alt`.
* Error boundaries and loading states where relevant.

## Prompts (use inside Cursor)

* *Scaffold components*: “Create `components/product-card.tsx` using Tailwind + Framer Motion hover, props `{ product: Product }`, add stock badge and price-per-meter.”
* *Product detail*: “Implement `app/products/[slug]/page.tsx` reading product by slug via `lib/data.ts`, render gallery, attributes (Pattern, Colors, Swatch Type, Length (m)), and `OrderForm` posting to `/api/orders` then redirect to `/order-success` with toast.”
* *Filters*: “Build `/products/page.tsx` with `FiltersBar`, query-synced filters for pattern/colors/swatchType/price/inStock, client-side filter for demo.”
* *Animations*: “Add shared element transition from card image to detail image using `layoutId`.”

## Definition of Done

* All routes exist and match `design.md`.
* Animations enabled and disabled when `prefers-reduced-motion`.
* Orders persist, success page shows confirmation text: **“Order received. We’ll get back to you shortly.”**
* ESLint passes; Lighthouse mobile ≥ 90.

## Next steps (future)

* Move to Firestore; add Admin Panel (CRUD with auth).

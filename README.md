# StudioSpace

Peer-to-peer creative workspace and production studio sharing platform.

**Live site:** https://your-studiospace-site.vercel.app
**Server repo:** https://github.com/builtbyshakil/studiospace-server

## Features

- Interactive Swiper hero slider with 3 slides and call-to-action buttons
- Featured studios fetched from MongoDB (`.limit(6)`, top rated first) plus category cards that open Explore with the category pre-selected
- Explore page with search, category filter, sorting, skeleton loaders and friendly empty states
- Studio details with gallery carousel, amenities, host details, reviews and a booking modal with live price calculation
- Full studio CRUD (add, list mine, update, delete with confirmation modal) with imgbb image upload
- Booking system with Pending, Confirmed, Completed and Cancelled statuses, plus a host dashboard to confirm or reject requests
- Double-booking prevention: overlapping times against Confirmed bookings are rejected with a clear message
- JWT stored in an HTTPOnly cookie; protected API routes answer `401 Unauthorized` without it
- Dark and light theme toggle across the whole site
- Optional extras: PDF booking invoice and saved-studios wishlist (heart icon)
- Toast notifications and custom modals everywhere, no browser alerts

## Tech stack

Next.js 16 (App Router), Tailwind CSS 4, DaisyUI 5, BetterAuth with MongoDB adapter, JWT, Swiper, react-hot-toast, jsPDF, Express.js and MongoDB on the server.

## Local setup

1. Clone this repo and the server repo.
2. Client: `npm install`, copy `.env.example` to `.env.local` and fill in the values.
3. Server: `npm install`, copy `.env.example` to `.env`, fill it in, then run `npm run seed` and `npm run dev`.
4. Client: `npm run dev` and open http://localhost:3000.

`JWT_SECRET` and `DB_NAME` must be identical in the client and the server. The client proxies `/api/studios`, `/api/bookings` and `/api/wishlist` to `API_URL`, which keeps the HTTPOnly cookie first-party.

## Examiner test credentials

Register this account once on the live site, then log in with it:

- Email: `examiner@studiospace.dev`
- Password: `Studio123`

To test double-booking, book the first three seeded studios (Cyclorama White Box, Golden Hour Loft, Monolith Sound Stage) between 10:00 and 14:00 on any of the next 14 days. Those hours are already confirmed, so the booking is rejected.

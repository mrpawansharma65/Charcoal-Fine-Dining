# 🔥 Charcoal Fine Dining — Premium Restaurant Website

**Varanasi's finest fine dining restaurant website** — a high-converting, production-ready business website built with pure HTML, CSS, and JavaScript.

---

## 🌟 Live Project

**Entry Point:** `index.html`

---

## ✅ Completed Features

### Pages & Sections
- **Hero Section** — Full-screen background image with restaurant name, tagline, CTA buttons (Call Now + Book Table), and key stats
- **Navigation** — Fixed, transparent → frosted glass on scroll; mobile hamburger menu with slide-in panel
- **Features Strip** — Quick-glance icons for Fine Dining, Hotel Rooms, Banquet Hall, Family Dining, Premium Ambience
- **Menu Section** — Tabbed layout (Vegetarian / Non-Veg / Drinks) with 3 items each, pricing, descriptions, tags
- **About Section** — Two-column layout with dual floating images, feature list (dining, hotel, banquet, family), and story copy
- **Gallery Section** — Masonry-style 4-column grid with hover overlays and full lightbox viewer (keyboard + arrow navigation)
- **Testimonials Section** — 6 customer reviews with star ratings and author details
- **Table Booking Form** — Name, Phone, Date, Time, Guests, Special Requests with API persistence
- **WhatsApp Booking Button** — Direct deep link to WhatsApp chat
- **FAQ Section** — 7 Q&As with accordion expand/collapse
- **Contact Section** — Address, phone, WhatsApp, hours, social links, embedded Google Map, directions link
- **Footer** — Brand, quick links, services, contact info, social icons, copyright

### Advanced Features
- **Smooth scrolling** with active nav link highlighting via IntersectionObserver
- **AOS scroll animations** throughout all sections
- **CSS-only hover effects** on cards, buttons, images, nav links
- **Ripple effect** on all buttons
- **Gold particle animation** in hero section
- **Image lightbox** with gallery navigation, keyboard support, close on overlay/Esc
- **Loader screen** with elegant animation
- **Back-to-Top button** (appears after 400px scroll)
- **Floating Call + WhatsApp buttons** (always visible)
- **Booking form** with success state and API integration
- **Mobile-responsive** at 1024px, 900px, 768px, 480px breakpoints

### SEO
- Full meta tags (description, keywords, robots)
- Open Graph social tags
- Semantic HTML5 structure (header, nav, section, article, footer)
- Keyword-rich content: "best restaurant in Varanasi", "fine dining in Varanasi", "restaurant near Sigra Varanasi"
- Image alt tags on all images
- Descriptive page title

---

## 📄 File Structure

```
index.html          ← Main single-page website
css/
  style.css         ← Full dark luxury theme (CSS variables, responsive)
js/
  main.js           ← All JS: loader, navbar, tabs, FAQ, booking, lightbox, AOS
README.md
```

---

## 🗄️ Data Models

### Table: `bookings`
| Field | Type | Description |
|-------|------|-------------|
| id | text | Auto-generated UUID |
| name | text | Guest full name |
| phone | text | Guest phone number |
| date | text | Reservation date (YYYY-MM-DD) |
| time | text | Reservation time (HH:MM) |
| guests | text | Number of guests |
| requests | rich_text | Special requests / dietary needs |
| status | text | pending / confirmed / cancelled |

**API Endpoint:** `POST tables/bookings`

---

## 🌐 Entry URIs

| Path | Description |
|------|-------------|
| `/` or `index.html` | Main website |
| `index.html#home` | Hero section |
| `index.html#menu` | Menu section |
| `index.html#about` | About section |
| `index.html#gallery` | Gallery section |
| `index.html#testimonials` | Reviews section |
| `index.html#booking` | Table booking form |
| `index.html#faq` | FAQ section |
| `index.html#contact` | Contact & map |

---

## 📞 Business Information

- **Restaurant:** Charcoal Fine Dining
- **Phone:** +91 93369 29765
- **Address:** Sigra - Mahmoorganj Road, Varanasi, Uttar Pradesh, India
- **Hours:** 12:00 PM – 11:00 PM Daily
- **Services:** Fine Dining, Hotel Rooms, Banquet Hall, Family Dining

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` (deep black) |
| Gold Primary | `#c9a84c` |
| Gold Light | `#e8c96a` |
| Gold Dark | `#9a7c2e` |
| Text | `#cccccc` |
| Font Serif | Playfair Display |
| Font Elegant | Cormorant Garamond |
| Font Sans | Montserrat |

---

## 🚀 Recommended Next Steps

1. **Connect WhatsApp Business API** for automated booking confirmations
2. **Add Google Analytics** (GA4) for traffic tracking
3. **Integrate payment gateway** for prepaid table deposits
4. **Add more menu items** and seasonal specials
5. **Connect to a real CRM** for managing reservations
6. **Add Google My Business** structured data (Schema.org LocalBusiness)
7. **Multi-language support** (Hindi version for local customers)
8. **Add a live chat widget** (e.g., Crisp, Tawk.to)

---

## 📦 External Dependencies (CDN)

- **Google Fonts** — Playfair Display, Cormorant Garamond, Montserrat
- **Font Awesome 6.4** — Icons
- **AOS 2.3.4** — Scroll animations

All loaded via CDN — no build step required.

---

*© 2025 Charcoal Fine Dining, Varanasi. All Rights Reserved.*

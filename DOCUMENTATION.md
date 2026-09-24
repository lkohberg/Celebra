# celebra.at Product Documentation

This file describes the celebra.at software as it exists in the code today. It is written for people who have never used the product and who need to explain it in videos, ads, demos, tutorials, onboarding material or sales presentations.

Status markers used throughout:

| Marker | Meaning |
|---|---|
| **Implemented** | Works in the current software |
| **Partially implemented** | Parts work, parts are missing or inconsistent |
| **UI only** | Visible, but does not do what it suggests |
| **Not implemented** | Mentioned somewhere (texts, legal terms), but not built |
| **Unable to verify** | Depends on settings outside the code |

---

## Table of Contents

1. Product Overview
2. Complete Product Map
3. Navigation
4. Page by Page Documentation
5. Feature by Feature Documentation
6. Complete User Journeys
7. UI Element Reference
8. Settings
9. Automation and Background Processing
10. Errors and Edge Cases
11. Roles and Permissions
12. Data, Pricing and Reference Tables
13. Known Gaps and Inconsistencies
14. Video Production Guide
15. Glossary
16. Completeness Checklist

---

# 1. Product Overview

## What the software is

celebra.at is an Austrian web service for creating **digital event invitations**. A customer picks a premium design, adds optional content blocks (for example a dress code, a food menu, a quiz or background music), fills in the event details, pays once, and gets a personal invitation website under their own address, for example `celebra.at/anna-und-max`.

Guests open that link on their phone, watch a short opening animation (an envelope, a gift box or a badge scan), see all event information and reply directly on the page. The host follows replies, page views and guest activity in a personal dashboard and can export guest lists as Excel files.

## Core purpose and problem solved

Printed invitations are expensive, slow and wasteful. Messenger groups are chaotic and cannot collect replies in an orderly way. celebra.at replaces both with one link that contains everything: date, place, map, program, reply form, and interactive extras.

## Primary target users

| User | Description |
|---|---|
| **Host / customer** | Person planning a wedding, birthday, party or company event. Buys and manages the invitation. |
| **Guest** | Anyone who receives the link. Needs no account and no login. |
| **Administrator** | celebra.at staff. Reviews orders with manual work, publishes events, manages promo codes, handles copyright reports, reads reviews. |

## Main use cases

1. Wedding invitations (three wedding designs, envelope animation).
2. Birthday and party invitations (three party designs, gift box animation).
3. Corporate events, conferences and galas (three business designs, badge scan animation).
4. Collecting replies (RSVP) including companions, dietary choice and personal messages.
5. Multilingual invitations (up to 3 of 11 languages, each with its own link and QR code).

## Core value proposition

* Starts at €19 one time, no subscription.
* Premium designs with animated intros.
* Reply form with guest list and Excel export.
* QR code for printing or sharing.
* Up to three languages per invitation.
* Environmentally friendly compared with paper.
* Online for 6 months, extendable.

## High level workflow

```text
Landing page -> Choose design -> Choose blocks/packages -> Enter event details
-> Preview -> Contact + payment (Stripe) -> Invitation goes live
-> Share link / QR code -> Guests reply -> Host reads results in dashboard
```

If the order contains blocks that need manual work by the celebra.at team (custom illustration, Music Pro), the invitation first goes to **review** and an admin publishes it after finishing the work.

---

# 2. Complete Product Map

```text
celebra.at
├── Landing page  (/)
│   ├── Top navigation (Templates, Features, How it works, Language/Currency, Login or Dashboard)
│   ├── Hero area (headline, "Choose design" button, "How it works" button)
│   ├── Feature grid (3 cards)
│   ├── Comparison table (Paper vs WhatsApp vs celebra.at)
│   ├── USP section (6 cards)
│   ├── Eco section
│   ├── Template selection (tabs: Birthday / Wedding / Corporate, demo buttons)
│   ├── "Discover all" button -> /templates
│   ├── Demo preview window (full demo invitation)
│   ├── How it works window (6 steps)
│   ├── Login / register window
│   ├── Footer (Imprint, Privacy, Terms windows)
│   └── Cookie banner
├── Templates page  (/templates)
├── Order flow  (/order/:templateId)
│   ├── Step 1 Blocks
│   ├── Step 2 Event details
│   ├── Step 3 Preview
│   └── Step 4 Contact + payment
├── Legacy configure page  (/configure/:templateId)  [older flow, still reachable]
├── Success page  (/success/:eventLink)  live or pending version
├── Dashboard  (/dashboard)
│   ├── Event list
│   ├── Event detail (tabs: Analytics, Guests, Music, Results, Payment, Fulfillment[admin])
│   ├── Edit event window
│   ├── Review form + Suggestion box
│   └── Admin extras: pending queue, copyright reports, reviews panel, Admin Tools button
├── Admin Tools  (/admin-tools)  promo codes
├── Reset password  (/reset-password)
├── Unsubscribe  (/unsubscribe?token=...)
├── Live invitation  (/:eventLink  and  /:eventLink/:lang)
└── 404 page  (any unknown address)
```

How the areas connect: the landing and templates pages feed the order flow. The order flow creates the event and sends the customer to Stripe. After payment the success page gives the link and QR code. The live invitation is what guests use. Everything guests do flows back into the dashboard.

---

# 3. Navigation

## 3.1 Landing page top bar (Implemented)

| Item | Location | What happens |
|---|---|---|
| **celebra.at logo** | Top left | Stays on / returns to landing page |
| **Templates** | Top bar (desktop), menu (mobile) | Scrolls to the template section |
| **Features** | Top bar | Scrolls to the features section |
| **How it works** | Top bar | Opens the 6 step explanation window |
| **DE / EN toggle** | Top bar | Switches website language between German and English |
| **Currency selector** | Next to language | Switches displayed prices between 15 currencies |
| **Login** | Top right, when logged out | Opens the login / register window |
| **Dashboard** | Top right, when logged in | Goes to `/dashboard`; shows a small number badge with new guest activity since the last dashboard visit |
| **Hamburger menu** | Mobile only | Opens a menu with the same items |

## 3.2 Order flow top bar

| Item | What happens |
|---|---|
| **Back** | In step 1: goes back to the previous page. In later steps: goes one step back |
| **Logo** | Brand only |
| **Language / currency switcher** | Same as above |
| **Step progress bar** (Blocks, Event, Preview, Contact) | Shows progress. Clicking a completed step goes back to it. Jumping forward is not possible |

## 3.3 Dashboard top bar

| Item | What happens |
|---|---|
| **Back arrow** | Goes to the landing page |
| **Logo** | Brand |
| **Language / currency switcher** | Same as above |
| **User email** | Shown on desktop, informational |
| **Logout** | Signs out |
| **Admin Tools** (admin only) | Goes to `/admin-tools` |
| **Reviews button** (admin only) | Opens the reviews and suggestions window |

## 3.4 Admin Tools top bar

Back arrow returns to `/dashboard`.

## 3.5 Footer (all marketing pages)

Imprint, Privacy and Terms each open a window with the legal text in the current language. There are no separate legal pages.

## 3.6 Access conditions

| Address | Who can open it |
|---|---|
| `/`, `/templates`, `/order/...`, demos | Everyone |
| Order payment step | Requires login (a login window appears automatically) |
| `/dashboard` | Logged in users; otherwise a "login required" screen |
| `/admin-tools` | Admins only; others see the "login required" screen |
| `/:eventLink` | Everyone, no account needed, but only if the event is **live** |

---

# 4. Page by Page Documentation

## 4.1 Landing Page (`/`)

**Purpose:** Explain the product, show the designs, lead visitors into ordering.
**Who uses it:** New visitors, returning customers.

**What the user sees, top to bottom**

1. **Top bar** (see 3.1).
2. **Hero area**, full screen. Small badge "Für unsere Erde 🌍" (For our planet), two line headline, subline "Modern · Persönlich · Mit Rückmeldungs-Formular", short description. Buttons:
   * **"Jetzt Design auswählen" / Choose design now** → `/templates`.
   * **"So funktioniert es" / How it works** → opens the How it works window.
   * Three short trust statements underneath.
3. **Feature grid**: three animated cards (personal link, QR code, fair price).
4. **Comparison table**: Paper invitations vs WhatsApp vs celebra.at across 10 rows (cost, design, RSVP, QR code, menu, multiple languages, eco, dashboard, export, guest management). Each cell shows a check, a cross or a dash. celebra.at has a check in every row.
5. **USP section**: six cards: cheap, quality, QR, language, dashboard, export.
6. **Eco section**: green section with three badges about sustainability.
7. **Template selection** (anchor `#templates`): tabs **Birthday / Wedding / Corporate**. Each tab shows three design cards. On the landing page the cards only have a **Demo view** button (no Select button). Below: **"Discover all"** → `/templates`.
8. **Footer** with legal links.
9. **Cookie banner** appears after 1.5 seconds on first visit.

**States:** No loading indicator beyond the general app spinner (logo with "celebra.at"). Logged in vs logged out changes only the top right button.

**Connections:** Templates page, demo window, order flow, dashboard, login.

**Video demonstration:** Start on the hero, scroll slowly through the comparison table, switch template tabs, open a wedding demo and let the envelope animation play.

## 4.2 Templates Page (`/templates`)

**Purpose:** Browse all nine designs and start an order.
**What the user sees:** Back button, headline ("handpicked" badge, title, subtitle), tabs Birthday / Wedding / Corporate with a short category description, a three column grid of design cards, a note at the bottom about custom requests.

**Each design card shows:** preview image, name, tagline, "from €19" badge (in the chosen currency), description, up to four feature tags, **Select** button, **Demo view** button.

**Actions:**
* **Select** → `/order/<templateId>` (order flow).
* **Demo view** → opens the demo window.

## 4.3 Demo Window (overlay)

**Purpose:** Show exactly what a finished invitation looks like, filled with sample content.
**What happens:** A full screen window renders the real invitation design with fake data (event date 20 June 2027 so the countdown runs, sample menu, hotels, wishlist, shuttle, quiz, games, potluck, agenda, products, sponsors depending on category). All interactive blocks are shown but do not save anything. A bouncing arrow hints to scroll; it fades after the intro animation and after scrolling more than 60 pixels.
**Button:** **"Choose this design"** → closes the window and opens the order flow for this design.
Note: corporate demos do not include background music.

## 4.4 How It Works Window

Six numbered steps with icons: Choose design → Choose blocks → Preview → Enter contact details → Pay → Share and celebrate. Footer line shows "from €19" (in the selected currency) and a price note.

## 4.5 Login / Register Window

Five screens:

| Screen | Content |
|---|---|
| Choose | Buttons **Login** and **Register** |
| Login | Email, password (eye icon to show/hide), **Login**, "Forgot password" link |
| Register | Email, password (min 6 characters), **Register** |
| Forgot | Email, **Send reset link** |
| Verify | Envelope icon, "check your inbox" message, **Back to login** |

Details:
* If the email field contains no `@`, the system automatically adds `@celebra.at` (username style login).
* After registration a welcome email is sent and the verify screen appears. The account must be confirmed by email.
* Successful login: toast "logged in", window closes.
* Forgot password: sends an email with a link to `/reset-password`, toast confirms.
* Errors from the login service are shown as red toasts.
* While working, the button is disabled and shows a loading text.

## 4.6 Order Flow (`/order/:templateId`)

The central page for buying an invitation. Four steps. See section 5.3 to 5.8 for full feature details.

**Step 1 Blocks**
* Package cards (bundles) with price, savings versus individual purchase, "Popular" crown badge on the biggest package, icons of included blocks. Click selects, click again deselects.
* Individual block cards with icon, name, description and price. Blocks over €12 carry a **PREMIUM** tag. Blocks already in the selected package are greyed out with "in package". Blocks needing manual work show "✋ created manually".
* If a manual block is selected, an amber info box appears:
  * Custom illustration: upload a reference photo plus a description field.
  * Other manual blocks: a notes field.
* Price sidebar (sticky): base page €19, package, extra blocks, total, manual work note, **Continue** button, small note about the 6 month online period.

**Step 2 Event details**
* Event title*, date*, time*, location name, address (street, postal code, city; used for Google Maps), description. Placeholders change by category.
* Wedding only: ceremony venue + address, reception venue + address, "children welcome" choice (Yes / No / Don't show).
* Languages: German is fixed as main language; up to 3 languages in total from 11. Each extra language costs €3.
* Hero image: drag and drop / click to upload, or **choose from library** (image gallery window).
* RSVP switch; when on: reply deadline, maximum guests, maximum companions per guest (0 to 20, default 5).
* Intro animation switch (turn the opening animation off).
* Style: main color picker, font (Playfair Display, DM Sans, Georgia).
* Event link: `celebra.at/` + your text. Live check with messages: invalid characters, reserved word, already taken, available (green).
* Block configurator: forms for the content of each selected block (see 5.9).
* **Continue** is enabled only when title, date, time and a valid, free link (min 3 characters) exist.

**Step 3 Preview**
* Live preview of the real design with the entered data. Where content is missing, sample text is used.
* Desktop / mobile toggle (on larger screens).

**Step 4 Contact and payment**
* First name*, last name*, email*.
* Promo code field + **Apply**. Valid code: green chip with discount, **Remove** link. Invalid: red toast.
* Summary: design, base price, package, blocks, discount, total (crossed out original price if discounted), manual work note.
* Checkbox "I accept the Terms and Privacy policy" with clickable links that open the legal windows.
* **Pay now €X** button. Disabled until all fields and checkbox are valid; shows "Processing..." while working.
* If not logged in, the login window opens first.
* Then the customer is sent to Stripe Checkout.

## 4.7 Legacy Configure Page (`/configure/:templateId`) (Partially implemented)

An older single page order form that is still reachable by direct address but not linked anywhere. It uses different base prices (€49 standard, €99 premium) than the current order flow (€19). Not recommended for videos.

## 4.8 Success Page (`/success/:eventLink`)

**Live version:** check icon, "Your event page is live!", QR code, link (or one link per language with flag and copy button), buttons **Copy link**, **Download QR** (PNG), **Open event**, **Back home**.

**Pending version** (`?pending=true`, for orders with manual work): clock icon, "we are working on it" text, three step "what happens now" box, buttons **Dashboard** and **Home**.

## 4.9 Dashboard (`/dashboard`)

**Not logged in:** "login required" screen with button home.
**Loading:** spinner.
**Empty:** "no events yet" + **Create first event** → `/templates`.

**Normal view:**
* Left: list of events. Each card: title, status badge (Unpaid for draft, Live, Archived, Paid, In review), date, `/link`. Unpaid drafts have an amber border.
* Right: details of the selected event or "select an event" placeholder.
* Bottom: **Review form** (1 to 5 stars + feedback) and **Suggestion box**.

Opening the dashboard resets the notification badge on the landing page.

**Event detail tabs:**

| Tab | Shown when | Contents |
|---|---|---|
| Analytics | Always | Expiry warning, 4 stat cards (Page views, QR scans, Accepted, Declined), Edit event, Archive / Go live, language links with QR codes, QR download, Open event |
| Guests | Always | Guest list, **Export XLSX** |
| Music | Music Pro or Music wish block booked | Song list, export button |
| Results | Potluck, quiz or games booked | Potluck claims, quiz statistics, game votes |
| Payment | Always | Status, amount paid, Stripe payment ID, **Delete event** |
| Fulfillment | Admin only | Manual work panel |

**Admin additions:** Admin Tools button, Reviews panel, copyright reports panel, "pending review" queue at the top (amber cards listing which manual blocks are needed), owner email on every event card, all events of all users visible.

## 4.10 Admin Tools (`/admin-tools`)

Promo code management only. List of codes with code, Active/Inactive badge, discount (% or €), uses (current / max), expiry date, Edit and Delete buttons. **New** button opens the form (see 5.20).

## 4.11 Reset Password (`/reset-password`)

Opened from the email link. States: checking (spinner), invalid or expired link (key icon + Home button), or form with new password and confirmation (min 6 characters, must match). On success: toast and redirect to the dashboard.

## 4.12 Unsubscribe (`/unsubscribe?token=...`)

German only. States: loading, confirm ("Abmelden bestätigen" button), success, already unsubscribed, invalid link, error.

## 4.13 Live Invitation (`/:eventLink`, `/:eventLink/:lang`)

The page guests see. Described in detail in 5.10 to 5.18.
* While loading, and until the hero image has loaded, the page is intentionally empty (no spinner) so guests never see a half built page.
* Unknown or non live link: "event not found" message and button to the homepage.
* Every visit records a page view.
* The language part of the address (for example `/anna-und-max/en`) selects the guest language; without it German is used.

## 4.14 404 Page

Any unknown address that is not an event shows "404 Oops! Page not found" with a link home. Only in English.

---

# 5. Feature by Feature Documentation

## 5.1 Designs (Templates) (Implemented)

**What it is:** Nine premium designs in three categories.

| Category | Design | Font | Intro |
|---|---|---|---|
| Birthday | Neon Party | DM Sans | Gift box |
| Birthday | Glamour Night | Playfair Display | Gift box |
| Birthday | Garden Party | Playfair Display | Gift box |
| Wedding | Floral Romance | Playfair Display | Envelope |
| Wedding | Classic Elegance | Playfair Display | Envelope |
| Wedding | Modern Love | DM Sans | Envelope |
| Corporate | Executive Summit | DM Sans | Badge scan |
| Corporate | Tech Conference | DM Sans | Badge scan |
| Corporate | Gala Evening | Playfair Display | Badge scan |

The three wedding designs have clearly different layouts: Floral (botanical frame, soft wave dividers), Classic (monogram initials, symmetrical serif style, diamond ornaments), Modern (huge stacked names, diagonal section cuts, horizontal schedule on desktop). All birthday designs share one page layout with different colors; the same applies to corporate.

**Simple explanation:** "Pick one of nine professionally designed looks: wedding, party or business."

## 5.2 Language and Currency Switch (Implemented)

* Website language: German or English. New visitors see English by default; the choice is remembered on the device.
* Currency: 15 currencies with fixed exchange rates (EUR, USD, GBP, CHF, JPY, CAD, AUD, CNY, INR, BRL, MXN, SEK, NOK, DKK, PLN). Block and package prices are always rounded **up** in foreign currencies. Payment is charged in the selected currency.

## 5.3 Packages (Implemented)

Bundles of blocks at a lower price. Selecting a package greys out its blocks in the individual list. Deselecting removes overlapping blocks. See section 12 for contents and prices.

## 5.4 Individual Blocks (Implemented)

Optional content sections added to the invitation. Can be combined with a package (only blocks not in the package are charged). See section 12.

## 5.5 Manual Work Blocks (Implemented)

**Custom illustration** (wedding, €29) and **Music Pro** (wedding, €19) are created or checked by the celebra.at team.
* Customer uploads a reference photo and describes the wish (illustration) or leaves notes.
* After payment the event goes to status **In review** instead of live.
* The success page shows the pending version.
* An admin completes the work in the Fulfillment tab and publishes the event.

## 5.6 Event Link (Implemented)

* Only lowercase letters, numbers and hyphens.
* At least 3 characters.
* Checked for availability while typing.
* Reserved words are blocked: templates, configure, success, dashboard, admin, login, signup, settings, api, auth, order.

## 5.7 Hero Image and Image Library (Implemented)

Upload your own picture, or choose from a gallery: wedding 13 images, birthday 13, corporate 12. The template's own photos are marked "Original". Clicking an image selects it and closes the gallery.

## 5.8 Promo Codes at Checkout (Implemented)

1. Enter a code (automatically uppercase) and press Apply.
2. The system checks: code exists, active, not expired, not used up.
3. Valid: discount shown (percentage or fixed euro amount, never more than the total).
4. At payment the server checks again, applies the discount and counts one use.

## 5.9 Block Configurator (Implemented)

Forms inside step 2 of the order flow and inside the dashboard edit window. Only forms for booked blocks appear.

| Block | What the host enters |
|---|---|
| Story | Text |
| Timeline | List of time + label |
| Dress code | Text for men, text for women (corporate: one text) |
| Menu | Course, dish, description |
| Hotels | Name, address, link |
| Shuttle | Time, from, to |
| Wishlist | Item, link, note |
| Potluck | Item names |
| Quiz | Question, answer options, correct answer |
| Games | Game names (+ optional starting votes) |
| Agenda | Time, title, speaker |
| Sponsors | Name, link, logo upload |
| Slideshow | Image uploads |
| Products | Name, description, several images |
| Video message | Upload a video or audio file |
| Background music | MP3 upload (max 10 MB), must confirm owning the rights; warning about copyright |

## 5.10 Intro Animations (Implemented)

| Intro | Used by | What happens |
|---|---|---|
| **Envelope** | Weddings | A sealed envelope with the couple's initials. "Tap to open" hint above it. Tap: wax seal breaks into pieces, hint fades out, flap opens, invitation appears (~2 seconds) |
| **Gift box** | Birthdays | Tap: box shakes, lid flies off, confetti burst (~2.4 seconds) |
| **Badge scan** | Corporate | Badge slides in; tap: red laser scans, "ACCESS GRANTED" with green check (~3 seconds) |

Hosts can switch the intro off in step 2 or later.

## 5.11 Countdown (Implemented)

Days, hours, minutes and seconds until the event, updated every second with a flip animation. Stops at zero (no special "started" message). No decorative bar.

## 5.12 Reply Form (RSVP) (Implemented)

**Guest steps:**
1. Enter name (required) and optionally email.
2. Choose **I'll come** or **I can't come**.
3. If coming: number of companions (0 up to the host's limit) and a name field for each companion.
4. If the host activated menu choice: pick Standard, Vegetarian, Vegan, Gluten free or Lactose free.
5. Optional message.
6. Send → thank you animation.

The reply appears in the host's Guests tab and in the notification badge. The deadline is displayed but not enforced (see section 13). No account needed.

## 5.13 Map and Calendar (Implemented)

* Google Maps map of the address (no API key needed).
* Wedding designs (Classic, Floral, Modern): "Add to calendar" with Google Calendar and an .ics download for Apple and Outlook. Event length assumed 4 hours.

## 5.14 Background Music (Implemented)

* Starts on the guest's first tap, scroll or touch (browsers forbid auto play).
* Loops at 30% volume; a button with animated bars toggles it.
* Uses the host's MP3 or a demo track.
* When a video message plays, the music automatically lowers to 5% and returns afterwards.
* Guests can **report a copyright violation** (optional email + reason). The music stops immediately for that guest and an admin sees the report.

## 5.15 Interactive Guest Blocks (Implemented)

| Block | Guest action | What the host sees |
|---|---|---|
| **Quiz** | Answers questions one at a time, sees right/wrong instantly, score at the end | Percentage per answer, correct answer highlighted |
| **Games vote** | Enters name, votes for one game; live vote counts | Bar chart of votes |
| **Potluck** | Claims one open item with their name; claimed items show who brings them | List of item + person |
| **Music wish** (party) | Enters a song title | Music tab |
| **Music Pro** (wedding) | Song, artist, own name | Music tab + Excel export for the DJ |

The name typed once (for example in the reply form) is prefilled in the other blocks during the same visit. It is not remembered after reloading.

## 5.16 Display Blocks (Implemented)

Story, Timeline, Dress code (men/women), Menu, Hotels, Shuttle, Wishlist (with links), Agenda (with speakers), Products (each with its own 4 second image slideshow), Sponsors (logo grid with links), Slideshow (swipeable, 4 second autoplay, full screen view on tap), Custom illustration, Video / audio message. Slideshow, illustration and video show a friendly "coming soon" placeholder when no content is uploaded yet. Other blocks hide themselves when empty.

## 5.17 Multiple Languages (Implemented)

11 guest languages: German, English, Spanish, Portuguese, French, Italian, Polish, Romanian, Dutch, Turkish, Chinese. The fixed labels on the invitation (for example "Countdown", "RSVP", "Location") are translated; the host's own texts stay as entered. Each language has its own address (`/link/en`) and QR code.

## 5.18 Page View and QR Tracking (Partially implemented)

Every visit stores a page view with referrer and browser info. The dashboard shows "Page views" and "QR scans"; the code only records page views, so the QR scan counter stays at zero unless scans are recorded elsewhere (Unable to verify).

## 5.19 Dashboard Event Management (Implemented)

* **Edit event:** window with all main fields and the block configurator; available for live, paid and draft events.
* **Archive / Go live:** takes a live event offline or back online. Reactivating as a normal user may be blocked by the security rules (see section 13).
* **Delete:** with confirmation; permanent.
* **Excel exports:** guests (name, email, reply, companions, menu, message, date) as `guests-<link>.xlsx`; music wishes as `musikwuensche-<link>.xlsx`.
* **QR download:** PNG, per language when several languages exist.
* **Expiry warning:** from day 170 after creation a yellow banner with **Renew now** (€10 for 6 more months, Stripe opens in a new tab); after day 180 a red "expired" banner.

## 5.20 Admin: Promo Codes (Implemented)

Fields: code, type (percentage or fixed), value (percentage must be above 0 and at most 100), max uses (optional), expiry date (optional), active switch. Create, edit, delete (with confirmation).

## 5.21 Admin: Fulfillment and Publishing (Implemented)

* Shows the customer's reference image and notes.
* Upload the finished illustration (inserted into the invitation automatically).
* Upload other files (images, audio, PDF, ZIP) and delete them.
* **Preview** opens the invitation in a new tab.
* **Go live / Publish now** with confirmation.

## 5.22 Admin: Copyright Reports (Implemented)

Refreshes every 30 seconds. For each open report: **Disable music**, **Delete music** (confirmation), **Dismiss** (music re-enabled). Resolved reports are listed collapsed (last 10).

## 5.23 Reviews and Suggestions (Implemented)

Customers give 1 to 5 stars plus feedback (max 500 characters) and one suggestion (max 1000 characters). Both can be edited later. Admins see average rating, all reviews and all suggestions.

## 5.24 Cookie Banner (UI only)

Accept and Decline both just hide the banner and remember the choice. The site only uses technically necessary storage, so nothing else changes.

## 5.25 Legal Windows (Implemented)

Imprint, Privacy (GDPR, Stripe, 30 day deletion after deactivation) and Terms (6 month runtime, notice 10 days before expiry, €10 extension, 14 day withdrawal right, Austrian law), in German and English.

---

# 6. Complete User Journeys

## 6.1 Host orders a wedding invitation (no manual blocks)

1. Opens celebra.at, clicks **Choose design now**.
2. Wedding tab, **Demo view** on Floral Romance, watches the envelope, clicks **Choose this design**.
3. Step 1: selects the **Wedding Plus** package, adds **Slideshow**. Sidebar shows the total. **Continue**.
4. Step 2: enters "Anna & Max", date, time, venue, address; adds English as second language (+€3); picks an image from the library; turns RSVP on with a deadline; types the link `anna-und-max` (green "available"); fills timeline, dress code, menu. **Continue**.
5. Step 3: checks the preview on mobile and desktop.
6. Step 4: enters name and email, applies a promo code, ticks the terms box, clicks **Pay now**.
7. Logs in or registers if needed.
8. Pays in Stripe. Payment confirmation switches the event to **live** automatically.
9. Success page: copies the link, downloads the QR code.

## 6.2 Order with manual work

Same as 6.1, but with Custom illustration. In step 1 the host uploads a reference photo and describes the wish. After payment: status **In review**, pending success page. Admin opens the Fulfillment tab, uploads the illustration, previews, clicks **Go live**. The invitation is now public.

## 6.3 Guest replies

1. Opens the link or scans the QR code on the phone.
2. Taps the envelope / gift / badge.
3. Music starts, sees countdown, story, program, map.
4. Fills in the reply form with two companions and a vegetarian choice, sends.
5. Votes in games or claims a potluck item; the name is already filled in.

## 6.4 Host follows up

1. Sees a number badge on **Dashboard** on the landing page.
2. Opens the dashboard, selects the event.
3. Analytics tab: page views, accepted, declined.
4. Guests tab: reads replies, **Export XLSX** for the caterer.
5. Music tab: exports songs for the DJ.
6. Results tab: quiz and game results.
7. Edits the time via **Edit event**, saves; the invitation updates instantly.

## 6.5 Renewal

From day 170 a yellow banner appears. **Renew now** opens Stripe for €10. (See section 13: the payment currently does not extend the runtime in the code.)

## 6.6 Password reset

Login window → **Forgot password** → email → link → `/reset-password` → new password twice → dashboard.

## 6.7 Admin creates a promo code

Dashboard → **Admin Tools** → **New** → code "SUMMER20", percentage 20, max 50 uses, expiry date, active → save. Customers can now use it in step 4.

## 6.8 Copyright report

Guest taps "report" in the music section → admin sees the report on the dashboard → chooses Disable, Delete or Dismiss.

---

# 7. UI Element Reference

| Element | Location | What it does |
|---|---|---|
| Choose design now | Landing hero | Opens templates page |
| How it works | Top bar, hero | Opens 6 step window |
| DE/EN | Top bar | Switches website language |
| Currency dropdown | Top bar | Changes displayed and charged currency |
| Login | Top bar | Opens login window |
| Dashboard (with badge) | Top bar | Opens dashboard; badge counts new replies and guest activity since last visit (refreshes every minute) |
| Template tabs | Template sections | Switch category |
| Demo view | Design card | Opens demo window |
| Select | Design card (templates page) | Starts order flow |
| Choose this design | Demo window | Starts order flow |
| Package card | Order step 1 | Selects / deselects bundle |
| Block card | Order step 1 | Selects / deselects block |
| Reference photo upload | Order step 1 (illustration) | Stores the customer's sample image |
| Continue | Order steps | Next step (only when valid) |
| Step bar | Order flow | Go back to earlier steps |
| Language pills | Order step 2 | Pick up to 3 languages; German cannot be removed |
| Children welcome buttons | Order step 2 (wedding) | Yes / No / Don't show |
| Choose from library | Order step 2 | Opens image gallery |
| RSVP switch | Order step 2, edit window | Shows/hides the reply form on the invitation |
| Disable intro switch | Order step 2 | Removes the opening animation |
| Color picker / font select | Order step 2, edit window | Styles the invitation |
| Event link field | Order step 2 | Defines the address, live availability check |
| Desktop / mobile toggle | Order step 3 | Changes preview size |
| Apply / Remove promo | Order step 4 | Applies or removes discount |
| Terms checkbox | Order step 4 | Required before payment |
| Pay now | Order step 4 | Creates the event and opens Stripe |
| Copy link | Success page, dashboard | Copies address |
| Download QR | Success page, dashboard | Saves QR as PNG |
| Open event | Success page, dashboard | Opens invitation |
| Envelope / gift / badge | Invitation | Starts intro, reveals page |
| Music button | Invitation | Play / pause |
| Report copyright | Invitation music section | Sends report, stops music |
| Add to calendar | Wedding invitations | Google or .ics file |
| RSVP Send | Invitation | Saves reply |
| Vote / Claim / Answer / Send song | Invitation blocks | Saves guest interaction |
| Slideshow image | Invitation | Opens full screen view |
| Edit event | Dashboard analytics | Opens edit window |
| Archive / Go live | Dashboard analytics | Takes event offline / online |
| Renew now | Dashboard expiry banner | Opens €10 renewal payment |
| Export XLSX | Guests / Music tab | Downloads Excel file |
| Delete event | Payment tab | Permanently deletes after confirmation |
| Stars / Submit review | Dashboard bottom | Saves rating |
| Send suggestion | Dashboard bottom | Saves suggestion |
| Publish now / Go live | Admin fulfillment | Makes event public |
| Upload illustration / file | Admin fulfillment | Adds assets |
| Disable / Delete music, Dismiss | Admin copyright panel | Resolves report |
| New / Edit / Delete promo | Admin Tools | Manages codes |
| Accept / Decline | Cookie banner | Hides banner |

---

# 8. Settings

Each setting is chosen by the host in order step 2 and can mostly be changed later in **Edit event**.

| Setting | Default | Options | Effect |
|---|---|---|---|
| Event title | empty (required) | Free text | Headline, intro initials, footer |
| Date | empty (required) | Date | Countdown, date display, calendar |
| Time | empty (required) | Time | Countdown, display ("Uhr" added except English) |
| Location name | empty | Text | Details card |
| Address | empty | Street, postal code, city | Details card, map |
| Description | empty | Text | Hero subtitle |
| Ceremony / reception venue and address | empty | Text (wedding) | Separate cards on wedding page |
| Children welcome | Don't show | Yes / No / Don't show | Badge on wedding page |
| Languages | German only | Up to 3 of 11, +€3 each extra | Extra addresses and QR codes |
| Hero image | Design's own image | Upload or library | Top background |
| RSVP enabled | Off | On / Off | Shows reply form |
| RSVP deadline | empty | Date | Shown as text only |
| Max guests | empty | Number | Stored; not enforced on the invitation (Unable to verify further use) |
| Max companions | 5 | 0 to 20 | Limits companions per reply |
| Menu choice in RSVP | Off | On / Off (legacy form +€10; current flow tied to menu option) | Adds dietary dropdown |
| Disable intro | Off | On / Off | Skips opening animation |
| Main color | Design color | Any color | Accent color |
| Font | Design font | Playfair Display, DM Sans, Georgia | Page typography |
| Event link | empty (required) | a to z, 0 to 9, hyphen, min 3 | Web address |
| Website language | English on first visit | DE / EN | All marketing and dashboard texts |
| Currency | EUR | 15 currencies | Price display and charge |

---

# 9. Automation and Background Processing

There are **no AI features** in the product.

| Process | Trigger | What happens | Status |
|---|---|---|---|
| Server price calculation | Pay now | The server recalculates the price from the booked blocks, languages and promo code; the browser price is never trusted | Implemented |
| Stripe checkout | Pay now | Creates a payment page in the chosen currency | Implemented |
| Payment confirmation | Stripe reports success | Event becomes **live**, or **In review** if manual blocks exist; payment ID and a log entry saved | Implemented |
| Welcome email | Registration | Sent via email queue | Implemented |
| Account emails | Signup, reset, email change | Branded emails from notify.celebra.at | Implemented |
| Email queue | Every 5 seconds | Sends queued emails, retries up to 5 times, respects rate limits, respects unsubscribes | Implemented |
| Renewal reminder email | Event about 150 days old | Email "Your event expires soon, renew for €10" | Partially implemented: no schedule found in the project, Unable to verify |
| Renewal payment | Renew now | Stripe €10 payment | Partially implemented: payment does not extend the runtime in code |
| Expiry banners | Opening dashboard | Calculated from creation date (day 170 / 180) | Implemented (display only) |
| Automatic deactivation after 180 days | Legal terms | Not implemented in code | Not implemented |
| Notification badge | Every 60 seconds | Counts new replies and guest actions | Implemented |
| Copyright panel refresh | Every 30 seconds | Loads new reports | Implemented |

---

# 10. Errors and Edge Cases

| Situation | What the user sees |
|---|---|
| Link has invalid characters | Red "invalid" message, Continue disabled |
| Link reserved | "reserved" message |
| Link taken | "already taken" message |
| Required fields missing | Continue / Pay button disabled |
| Invalid email in step 4 | Pay disabled |
| Not logged in at payment | Login window opens |
| Invalid promo code | Red toast |
| Payment page could not be created | Toast "payment error" |
| Event creation failed | Toast with the error |
| Payment cancelled in Stripe | Returns to the order page; event stays as unpaid draft in dashboard |
| Invitation link unknown or not live | "Event not found" + home button |
| Slow connection on invitation | Empty page until image is loaded |
| Game already voted / item already claimed | Toast, second attempt rejected |
| MP3 over 10 MB or wrong format | Upload refused |
| Music rights box not ticked | Upload not possible |
| Reset link expired | "invalid link" screen |
| Passwords don't match / too short | Toast |
| Unsubscribe link invalid | "invalid or expired link" |
| Wrong address | 404 page |
| Event date passed | Countdown shows zeros |
| RSVP deadline passed | Form still works |
| Promo percentage over 100 (admin) | Toast "value must be between 0 and 100" |

---

# 11. Roles and Permissions

| Action | Guest | Host | Admin |
|---|---|---|---|
| View live invitation | Yes | Yes | Yes |
| Reply, vote, claim, quiz, song wish | Yes | Yes | Yes |
| Order an invitation | Must log in | Yes | Yes (payment skipped) |
| See own events and guests | No | Own only | All events |
| Edit / archive / delete event | No | Own | All |
| Set event live | No | No (only via payment) | Yes |
| Fulfillment, promo codes, copyright, reviews overview | No | No | Yes |

Admins placing an order skip payment: the event goes live (or to review) immediately.

Privacy: the event contact email and host data are never shown to guests; guests only read a filtered public view of live events.

---

# 12. Data, Pricing and Reference Tables

## 12.1 Base price

Invitation page: **€19** one time. Extra language: **€3** each. Renewal: **€10** for 6 months.

## 12.2 Wedding blocks

| Block | Price |
|---|---|
| Timeline, Story, Wishlist, Dress code, Background music, Video message | €9 each |
| Hotels, Slideshow, Menu, Shuttle | €19 each |
| Music Pro (manual) | €19 |
| Custom illustration (manual) | €29 |

Packages: **Starter €39** (timeline, dress code, hotels, shuttle, music), **Plus €49** (+ menu, video message), **Premium €79** (+ slideshow, story, wishlist; 10 blocks).

## 12.3 Corporate blocks

Timeline, Dress code, Background music, Promo video, Hotels, Menu, Agenda €9 each; Products, Sponsors €19 each.
Packages: **Business Starter €29** (timeline, dress code, hotels, agenda, music), **Business Pro €49** (+ products, sponsors, video, menu).

## 12.4 Birthday / party blocks

Timeline, Music wish, Wishlist, Dress code, Background music, Video message €5 each; Quiz, Menu, Games, Potluck, Hotels €9 each.
Packages: **Party Fun €25** (timeline, music wish, games, quiz, music), **Party Planer €25** (timeline, menu, potluck, dress code, music), **Party All in €45** (10 blocks).

## 12.5 Event statuses

| Status | Meaning | Set by |
|---|---|---|
| Draft (shown "Unpaid") | Created, not paid | Order flow |
| In review | Paid, manual work pending | Payment confirmation |
| Live | Public | Payment confirmation or admin |
| Archived | Offline | Host or admin |
| Paid | Legacy status | Rarely used |

---

# 13. Known Gaps and Inconsistencies

Mention these carefully (or avoid them) in public material.

1. **RSVP deadline not enforced:** the form stays open after the deadline.
2. **Renewal does not extend runtime:** the €10 payment is processed like a first purchase; no new end date is saved.
3. **Renewal reminder email:** built, but no automatic schedule was found in the project.
4. **Automatic deactivation after 180 days:** stated in the terms, not built; only a dashboard banner appears.
5. **Reactivating an archived event** as a normal user may be rejected by the security rules.
6. **Legacy configure page** with different prices is still reachable by direct address.
7. **QR scan counter** is displayed but only page views are recorded.
8. **Calendar buttons** exist only in the wedding designs.
9. **Reply form color** follows the category, not the host's chosen color.
10. **404 and unsubscribe pages** are single language (English / German).
11. **Cookie banner** Accept and Decline have the same effect.
12. **Hotels entered in the block configurator** may not show if the invitation reads hotels from a separate field (Unable to verify).

---

# 14. Video Production Guide

**30 second ad:** Envelope opening on a phone → scroll through countdown and program → guest taps "I'll come" → cut to host dashboard with the accepted counter rising → end card "from €19, celebra.at".

**2 minute walkthrough:** Landing hero → template tabs → demo → Select → pick package → fill details with link check turning green → mobile preview → promo code → Stripe → success page with QR → phone scan → dashboard Excel export.

**Category spots:** Wedding (envelope, Music Pro, calendar), Party (gift box, quiz, games vote, potluck), Business (badge scan, agenda, sponsors, products).

**Tips:** Use the demo window for guaranteed full content. Use a future event date so the countdown runs. Use the showcase event `sophie-und-alexander` for a live example. Record on a phone sized screen; the product is designed mobile first.

**One sentence pitch:** "celebra.at turns your invitation into a beautiful personal website with replies, music and a QR code, ready in minutes and from just €19."

---

# 15. Glossary

| Term | Meaning |
|---|---|
| Block | Optional content section of an invitation |
| Package | Discounted bundle of blocks |
| Intro | Opening animation (envelope, gift box, badge) |
| RSVP | Reply to the invitation |
| Companion | Additional person a guest brings |
| Event link | The address after celebra.at/ |
| Fulfillment | Admin work for manual blocks |
| Live | Publicly visible invitation |
| Promo code | Discount code at checkout |

---

# 16. Completeness Checklist

- [x] Every route / page documented (13 routes + 404)
- [x] Navigation of landing, order, dashboard, admin, footer
- [x] All 9 designs and 3 intro animations
- [x] All 32 blocks and 8 packages with prices
- [x] Order flow: every step, field, validation and state
- [x] Guest invitation: every section and interactive block
- [x] Dashboard: every tab, button, export and admin extra
- [x] Admin Tools, fulfillment, copyright, reviews
- [x] Authentication, password reset, unsubscribe
- [x] Emails, payment processing, background jobs
- [x] Settings table
- [x] Errors and edge cases
- [x] Permissions
- [x] Known gaps clearly marked
- [x] No AI features exist (confirmed)

# DocPulse 🏥

DocPulse is a full-stack hospital management web application that allows patients to browse doctors, register/login, book appointments, and view their own appointment history. Built with **React (Vite)** on the frontend and **Django REST Framework** on the backend, using **session-based authentication**.

---
## 🌐  Live Project

🔗 **Website:** https://hospital-management-project-25b4507.netlify.app/

---

## ✨ Features

### 🏠 Home Page
- Hero banner with hospital tagline and call-to-action.
- **About Us**, **Our Mission**, and **Contact Us** sections all live on the same page (not separate routes) — clicking those links in the navbar smooth-scrolls down to the right section instead of navigating away.
- Clicking "About Us" or "Contact" from any other page (Login, Doctors, etc.) first navigates back to Home, then auto-scrolls to that section using React Router's location state.
- Contact form with Name / Email / Message fields and hover/focus micro-interactions (card lift on hover, glowing input focus states).
- Subtle hover animations throughout (e.g., the "About Us" heading lifts slightly when the whole section is hovered).

### 🔐 User Authentication
- **Register** — collects username, email, phone number, date of birth, and password (with confirm-password match validation). Passwords are hashed automatically via Django's `create_user()`; phone/DOB are stored in a linked `Profile` model since Django's built-in `User` doesn't have those fields.
- **Login** — session-based (cookie + CSRF token), not JWT. On success, `userId` and `userName` are cached in `localStorage` purely for UI purposes (e.g., showing "Logout" instead of "Login" in the navbar) — actual access control always happens server-side via the session.
- **Logout** — clears the Django session server-side and wipes the cached `localStorage` values client-side.
- Navbar reacts live to login state: shows **Login/Register** when logged out, and **Appointment / Logout** when logged in.
- Users who click "Book Appointment" while logged out are redirected straight to the Login page with a toast prompt, instead of hitting a broken/empty form.

### 🩺 Doctors Page
- Responsive grid of doctor cards (photo, name, specialty, years of experience).
- "Book Appointment" on a doctor card checks login status first, then routes to the appointment form.

### 📅 Appointment Booking
- Logged-in users fill out a form with full name, email, phone, age, a short description of their issue, and preferred appointment date/time.
- On submit, the appointment is saved and linked to the logged-in user's account (`user` foreign key), so it can later be looked up per-user.
- Form resets and redirects home after a short success delay.

### 📋 My Appointments
- Shows only the **logged-in user's own** appointments — filtered entirely server-side (`Appointment.objects.filter(user=request.user)`), so there's no way for one patient to see another's booking details, even by tampering with the browser.
- Each appointment renders as a card with name, age, date, time, and a color-coded status badge (**Pending** / **Approved** / **Completed** / **Cancelled**).

### 🔔 Notifications & UX Polish
- Toast pop-ups (`react-toastify`) confirm or warn on every key action: login success/failure, registration errors (duplicate username, password mismatch), appointment booked/cancelled, and network errors — with a short auto-close duration so they don't linger.
- Loading states on buttons (e.g., "Booking..." / disabled state) prevent duplicate submissions while a request is in flight.

### 🦶 Footer
- Sticks to the bottom of short pages via a flex layout (instead of floating mid-page), and flows naturally after content on longer pages.


---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM** — client-side routing & navigation
- **react-icons** — icon library (`react-icons/fa`, `react-icons/md`, `react-icons/ci`, etc.)
- **react-toastify** — toast notifications
- Plain CSS (no framework) for styling

### Backend
- **Django** — core framework
- **Django REST Framework (DRF)** — API layer
- **django-cors-headers** — CORS handling for frontend-backend communication
- **SQLite** — default development database
- **Session Authentication** (Django's built-in `authenticate()` / `login()` / `logout()`) with CSRF protection






---

## 🔐 Authentication Flow (Session-Based)

1. User submits Login form → React sends `POST /api/login/` with `credentials: "include"`.
2. Django's `authenticate()` + `login()` verifies credentials and creates a session, returning `sessionid` + `csrftoken` cookies.
3. React stores `userId` / `userName` in `localStorage` (for UI state only — **not** used for actual authorization).
4. Every subsequent protected request sends `credentials: "include"` (cookie) + `X-CSRFToken` header (read from `document.cookie` via a `getCookie()` helper) for POST/DELETE requests.
5. Django identifies the user via `request.user` based on the session — this is the **only** trusted source of "who is logged in," ensuring one user can never see another's appointments even if `localStorage` is tampered with.



---

## 👨‍💻 Author

**Utkarsh Jaiswal**

Built as part of the WnCC Full Stack Web Development Learner's Space Week 4 Assignment.

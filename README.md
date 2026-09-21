<div align="center">

# Daykeep

**Keep the things worth remembering.**

A distraction-free, minimalist notes application crafted with the MERN stack. Designed for speed, clarity, and peace of mind.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-day--keep.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://day-keep.vercel.app)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js%2020+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express%205-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg?style=for-the-badge)](LICENSE)

[Features](#-features) • [Architecture](#-system-architecture) • [Security](#-security-architecture) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Project Structure](#-project-structure) • [Roadmap](#-roadmap)

</div>

---

## Overview

**Daykeep** is an intentional, distraction-free space to capture your ideas, plans, reminders, and unfinished thoughts. Unlike heavy productivity suites crammed with chatbots, complicated folders, and notification spam, Daykeep strips away cognitive overload to provide an honest, calm writing experience that gets out of your way.

Every note is tied to your secure account, sorted by most recently updated, and instantly available across all your devices with zero layout shift and sub-millisecond perceived latency.

---

## ✨ Features

### 📝 Note-Taking Experience
- **Frictionless Creation**: Start typing immediately with smart focus and keyboard-ready navigation.
- **Flexible Note Formats**: Write notes with a title only, content only, or both. Empty submissions are gracefully prevented.
- **Auto-Expanding Titles**: Dynamic multi-line title field adjusts height seamlessly as your thoughts expand.
- **Enforced Boundaries**: Built-in limits (100 characters for titles, 10,000 characters for content) with proactive user feedback.
- **Unsaved Changes Protection**: Powered by React Router's navigation blocker (`useBlocker`) to ensure you never accidentally lose uncommitted thoughts.
- **Smart Relative Timestamps**: Displays exact time for notes created within 24 hours, formatted calendar date for current year, and complete year timestamps thereafter.
- **Responsive Fluid Layout**: Minimalist cards on desktop, compact vertical flow on mobile, and a persistent floating action button (FAB) for quick capture on touchscreens.

### 🛡️ Enterprise-Grade Security
- **Dual-Token Architecture**: Short-lived (15 min) in-memory access tokens paired with long-lived (7 day) HttpOnly refresh cookies.
- **Refresh Token Rotation & Hashing**: Refresh tokens are hashed using HMAC-SHA256 prior to database persistence and validated with `crypto.timingSafeEqual` to thwart timing attacks.
- **Strict Rate Limiting**: Built-in protection against brute-force attacks on authentication routes using `express-rate-limit`.
- **Payload Sanitization & Size Guard**: Express body parser restricted to `50kb` to mitigate JSON payload denial-of-service vulnerabilities.
- **Hardened HTTP Headers**: Fully guarded with `helmet` and streamlined via `compression`.
- **Tenant Isolation**: Every database query and mutation is strictly scoped to the authenticated user's ID at the database layer.

### ⚡ Performance & Frontend Engineering
- **Zero-Flash Session Restoration**: Leverages lightweight localStorage session hints to prevent layout shift (CLS) during silent token hydration.
- **Silent Refresh Interceptors**: Seamless Axios interceptor pipeline queues outgoing requests during token refreshes to eliminate token expiry interruptions.
- **Stale Chunk Auto-Recovery**: Window-level `vite:preloadError` handler detects new deployments and automatically recovers from outdated asset chunks.
- **Code-Splitting**: Route-level lazy loading with React `Suspense` keeps initial bundle sizes tiny.
- **Toast Management**: Centralized `sonner` notifications with automatic cleanup on route transitions (`useToastCleanup`).

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern UI library with latest concurrent rendering features |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) | Client-side routing, protected routes, and navigation blockers |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | High-speed ESM bundler and development server |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation zero-config utility-first CSS framework |
| **Typography** | [Plus Jakarta Sans](https://fontsource.org/fonts/plus-jakarta-sans) | Premium geometric sans-serif loaded locally via Fontsource |
| **HTTP Client** | [Axios](https://axios-http.com/) | HTTP requests with request/response interceptor pipeline |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Opinionated, accessible toast notifications |
| **Linter** | [Oxlint](https://oxc.rs/) | High-performance Rust-based JavaScript linter |
| **Hosting** | [Vercel](https://vercel.com/) | Production edge CDN hosting with asset caching rules |

### Backend
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | [Node.js 20+ (ESM)](https://nodejs.org/) | Modern server-side JavaScript environment |
| **Framework** | [Express 5](https://expressjs.com/) | Next-gen web framework with built-in promise error handling |
| **Database** | [MongoDB](https://www.mongodb.com/) & [Mongoose 9](https://mongoosejs.com/) | Document database with strict schema validation and indexing |
| **Authentication** | [JSON Web Tokens (JWT)](https://jwt.io/) | Stateless access tokens and rotating refresh tokens |
| **Password Security** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Salted one-way password hashing (10 rounds) |
| **Security Headers** | [Helmet](https://helmetjs.github.io/) | Sets critical HTTP response headers for protection |
| **Rate Limiter** | [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Brute-force mitigation on auth endpoints |
| **Compression** | [compression](https://github.com/expressjs/compression) | Gzip/Brotli payload compression for API responses |
| **Hosting** | [Render](https://render.com/) | Cloud application hosting with automatic HTTPS |

---

## 🏛️ System Architecture

Daykeep follows a decoupled client-server architecture with an authenticated API boundary and client-side reverse proxy routing.

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT BROWSER                       │
│  React 19 SPA • Vite • Tailwind v4 • Plus Jakarta Sans │
│                                                        │
│   ┌───────────────────────────┐                        │
│   │   Axios HTTP Client       │                        │
│   │   - Bearer Token Header   │                        │
│   │   - 401 Interceptor Queue │                        │
│   └─────────────┬─────────────┘                        │
└─────────────────┼──────────────────────────────────────┘
                  │  /api/v1/* (withCredentials: true)
                  ▼
┌────────────────────────────────────────────────────────┐
│                   EXPRESS 5 API                        │
│  Helmet • Compression • Rate Limiting • Cookie Parser  │
│                                                        │
│  ┌───────────────────────┐  ┌───────────────────────┐  │
│  │   /api/v1/auth        │  │   /api/v1/notes       │  │
│  │   - Register / Login  │  │   - CRUD Operations   │  │
│  │   - Refresh / Logout  │  │   - Owner Isolation   │  │
│  └───────────┬───────────┘  └───────────┬───────────┘  │
└──────────────┼──────────────────────────┼──────────────┘
               ▼                          ▼
┌────────────────────────────────────────────────────────┐
│                 MONGODB DATABASE                       │
│  Users (Hashed Password + Hashed Refresh Token)        │
│  Notes (Owner Indexed, Timestamps Indexed)             │
└────────────────────────────────────────────────────────┘
```

### Authentication Lifecycle & Silent Refresh Flow

1. **Sign-In / Register**:
   - User submits credentials (`/auth/login` or `/auth/register`).
   - Server returns user info + short-lived `accessToken` (15 minutes) in the JSON body.
   - Server sets an `HttpOnly`, `SameSite`, `Secure` cookie containing the `refreshToken` (7 days).
   - The frontend stores `accessToken` exclusively in memory and sets a session hint flag in `localStorage`.
2. **Authenticated Requests**:
   - Axios attaches `Authorization: Bearer <accessToken>` to all outgoing requests.
3. **Silent Token Renewal**:
   - When the access token expires, the backend responds with `401 Unauthorized`.
   - The Axios response interceptor intercepts the failure, locks parallel calls into a single `refreshPromise`, and issues a `POST /auth/refresh-token`.
   - The server verifies the cookie, checks the HMAC-SHA256 hash in MongoDB using timing-safe comparisons, rotates the refresh token, and issues a new access token.
   - The queued requests are replayed automatically without disrupting the user.
4. **Sign-Out**:
   - `POST /auth/logout` clears the token from MongoDB and removes the HttpOnly cookie.

---

## 📁 Project Structure

```text
Daykeep/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Mongoose connection setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    # Register, login, refresh, logout logic
│   │   │   └── note.controller.js    # Note CRUD operations & validation
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    # JWT verification & req.userId attachment
│   │   │   └── rateLimit.middleware.js # express-rate-limit configuration
│   │   ├── models/
│   │   │   ├── note.model.js         # Note schema (owner ref, length limits)
│   │   │   └── user.model.js         # User schema (email indexing, hidden password)
│   │   ├── routes/
│   │   │   ├── auth.route.js         # /api/v1/auth routes
│   │   │   └── note.route.js         # /api/v1/notes routes
│   │   ├── utils/
│   │   │   ├── cookieOptions.js      # Environment-aware cookie settings
│   │   │   ├── hashToken.js          # HMAC-SHA256 & timingSafeEqual utilities
│   │   │   └── token.js              # Access and refresh token generation
│   │   └── app.js                    # Express application configuration
│   ├── .env.example                  # Backend environment template
│   ├── package.json                  # Backend dependencies and scripts
│   └── server.js                     # HTTP server entry point
│
├── frontend/
│   ├── public/                       # Static web assets, manifests, icons
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js               # Auth API service calls
│   │   │   ├── client.js             # Axios instance & token refresh interceptors
│   │   │   └── notes.js              # Notes API service calls
│   │   ├── components/
│   │   │   ├── AuthBootstrap.jsx     # Router provider shell
│   │   │   ├── ConfirmDialog.jsx     # Reusable accessible confirmation modal
│   │   │   ├── FAQ.jsx               # Expandable accordion FAQ on landing page
│   │   │   ├── Footer.jsx            # Application footer
│   │   │   ├── LoadingSpinner.jsx    # Smooth loading state indicator
│   │   │   ├── Navbar.jsx            # Adaptive sticky header with auth actions
│   │   │   ├── NoteCard.jsx          # Individual note card in dashboard grid
│   │   │   ├── ProtectedRoute.jsx    # Route guard for authenticated users
│   │   │   ├── PublicRoute.jsx       # Route guard redirecting authenticated users
│   │   │   ├── RootErrorBoundary.jsx # Catch-all UI crash recovery boundary
│   │   │   └── RootRoute.jsx         # Landing page route handler
│   │   ├── config/
│   │   │   └── toast.js              # Sonner toast styling & positioning
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Authentication state, login/logout actions
│   │   │   └── NoteContext.jsx       # Notes CRUD state management
│   │   ├── hooks/
│   │   │   └── useToastCleanup.js    # Dismisses dangling toasts across routes
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Notes dashboard view
│   │   │   ├── Landing.jsx           # Public marketing & hero page
│   │   │   ├── Login.jsx             # Sign-in form with validation
│   │   │   ├── NoteEditor.jsx        # Full-featured note create/edit screen
│   │   │   ├── NotFound.jsx          # Custom 404 page
│   │   │   └── Register.jsx          # Account registration view
│   │   ├── utils/
│   │   │   ├── formatNoteDate.js     # Relative and formatted date helper
│   │   │   └── sessionHint.js        # LocalStorage session indicator
│   │   ├── App.jsx                   # Context providers & Toast setup
│   │   ├── index.css                 # Custom theme variables & Tailwind imports
│   │   ├── main.jsx                  # React DOM mount & stale chunk handler
│   │   └── router.jsx                # React Router v7 browser router definition
│   ├── .env.example                  # Frontend environment template
│   ├── .oxlintrc.json                # Oxlint configuration
│   ├── index.html                    # HTML document entry with OpenGraph metadata
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── vercel.json                   # Vercel deployment rewrites & cache headers
│   └── vite.config.js                # Vite build config & dev API proxy
│
├── IMPROVEMENTS.md                   # Feature tracking & planned enhancements
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to set up and run Daykeep locally on your machine.

### Prerequisites

- **Node.js**: Version `20.0.0` or higher
- **npm**: Version `10.0.0` or higher
- **MongoDB**: A running local instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Clone the Repository

```bash
git clone https://github.com/shivamkumartech/NoteNest.git
cd NoteNest
```

### 2. Configure Backend

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```bash
cp .env.example .env
```

Populate the `.env` variables:

```env
PORT=4001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/daykeep?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_super_secret_jwt_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key_min_32_chars
NODE_ENV=development
```

Start the backend in development mode:

```bash
npm run dev
```

The API will start listening at: `http://localhost:4001`

### 3. Configure Frontend

Open a second terminal window, navigate to the `frontend` directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```bash
cp .env.example .env
```

Ensure the environment variable is configured:

```env
# In development, Vite proxies /api/v1 to http://localhost:4001
VITE_API_URL=/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

The application will be live at: `http://localhost:5173`

---

## 📡 API Reference

Base Endpoint: `/api/v1`

### 🩺 System

#### Health Check
```http
GET /api/v1/health
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Daykeep API is running"
}
```

---

### 🔐 Authentication

All auth endpoints are guarded by IP-based rate limiting (10 attempts per 15-minute window).

#### Register Account
```http
POST /api/v1/auth/register
Content-Type: application/json
```
**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "strongpassword123"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": "66f1234567890abcdef12345",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```
*Note: Sets an `HttpOnly` refresh token cookie automatically.*

#### User Login
```http
POST /api/v1/auth/login
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "strongpassword123"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": "66f1234567890abcdef12345",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

#### Refresh Access Token
```http
POST /api/v1/auth/refresh-token
```
*Requires valid `refreshToken` HttpOnly cookie.*

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Access token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": "66f1234567890abcdef12345",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

#### User Logout
```http
POST /api/v1/auth/logout
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

---

### 📒 Notes

All note routes require an `Authorization: Bearer <accessToken>` header.

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notes` | Get all notes for the authenticated user | None |
| `POST` | `/api/v1/notes` | Create a new note | `{ "title"?: string, "content"?: string }` |
| `PUT` | `/api/v1/notes/:id` | Update an existing note | `{ "title"?: string, "content"?: string }` |
| `DELETE` | `/api/v1/notes/:id` | Permanently delete a note | None |

#### Create Note Example
```http
POST /api/v1/notes
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Project Architecture Thoughts",
  "content": "Keep dependencies lean and focus on zero-bloat primitives."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "note": {
    "_id": "6702a8b9f1a23c4d5e6f7890",
    "title": "Project Architecture Thoughts",
    "content": "Keep dependencies lean and focus on zero-bloat primitives.",
    "owner": "66f1234567890abcdef12345",
    "createdAt": "2026-09-21T09:30:00.000Z",
    "updatedAt": "2026-09-21T09:30:00.000Z"
  }
}
```

---

## ⚙️ Available Scripts

### Backend (`/backend`)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the API server with live reloading via `nodemon` |
| `npm start` | Runs the API server in production mode using Node.js |

### Frontend (`/frontend`)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Compiles optimized production bundle into `dist/` |
| `npm run preview`| Previews the production build locally |
| `npm run lint` | Runs the ultra-fast `oxlint` static code checker |

---

## 🌐 Production Deployment

### Frontend (Vercel)
The frontend is optimized for deployment on Vercel.
- The included [`vercel.json`](frontend/vercel.json) configures edge rewrites directing `/api/v1/:path*` to the Render backend service.
- Disables caching on `index.html` (`no-cache, no-store, must-revalidate`) while serving hashed static assets with immutable 1-year cache headers (`max-age=31536000, immutable`).

### Backend (Render / Cloud VPS)
When deploying the Express backend to Render, Railway, or VPS:
1. Ensure the Node environment is set: `NODE_ENV=production`.
2. Configure `FRONTEND_URL` with your production domain (e.g. `https://day-keep.vercel.app`).
3. Cookies are automatically configured with `secure: true` and `sameSite: "none"` when `NODE_ENV === "production"`.
4. The backend includes `app.set("trust proxy", 1)` to guarantee accurate IP tracking behind cloud reverse proxies.

---

## 🗺️ Roadmap

- [x] **v1.0 — Core Notes Release**
  - [x] Minimalist, distraction-free markdown-free note taking
  - [x] Secure dual-token authentication with rotation & HMAC-SHA256 token hashing
  - [x] Mobile-responsive layout with quick FAB
  - [x] Unsaved changes warning modal
  - [x] Stale chunk deployment recovery
  - [x] Cumulative Layout Shift (CLS) optimizations

- [ ] **v2.0 — Todos & Reminders**
  - [ ] Full-text search across titles and note contents
  - [ ] Interactive todo checklists inside notes
  - [ ] Scheduled note reminders with date and time pickers

- [ ] **v3.0 — Sharing & Offline**
  - [ ] Read-only public note links
  - [ ] Selective user-to-user note collaboration
  - [ ] Offline caching and Progressive Web App (PWA) support

---

## 📄 License

Copyright (c) 2026 **Shivam Kumar**. All rights reserved.

Daykeep is a proprietary personal product. Unauthorized copying, modification, distribution, or commercial use of any part of this repository is strictly prohibited. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shivam Kumar**
- GitHub: [@shivamkumartech](https://github.com/shivamkumartech)
- Website: [day-keep.vercel.app](https://day-keep.vercel.app)

---

<div align="center">
  <sub>Built with focus, intention, and calm. If you find Daykeep helpful, give it a ⭐️!</sub>
</div>

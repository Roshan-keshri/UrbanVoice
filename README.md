<div align="center">

# 🏙️ UrbanVoice
### Community Issue Reporting Platform

**Empowering citizens. Enabling authorities. Building better cities.**

A full-stack MERN application that bridges the gap between citizens and local governments — allowing people to report civic issues and track their resolution in real time.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Frontend-4CAF50?style=for-the-badge)](https://urban-voice-beta.vercel.app)
[![API](https://img.shields.io/badge/Backend%20API-Live-2196F3?style=for-the-badge)](https://urbanvoice-1.onrender.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

</div>

---

## 📖 What is UrbanVoice?

UrbanVoice is a civic-tech platform that allows **citizens** to report local issues — potholes, broken streetlights, sanitation problems, water supply failures — and enables **government administrators** to track, prioritize, and resolve them efficiently through a region-specific dashboard.

The platform is designed around three core principles:

- **Transparency** — every report is trackable in real time, so citizens always know what's happening with their complaint
- **Accountability** — administrators can only see and manage issues within their assigned region, ensuring clear ownership
- **Community participation** — photo evidence, issue categories, and status updates make reporting as detailed and useful as possible

> **Real-world inspiration:** India's civic infrastructure often suffers not from lack of resources, but from lack of visibility. UrbanVoice is built to solve exactly that.

---

## ✨ Features

### 👤 For Citizens

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | JWT-based login and registration with bcrypt password hashing |
| 📝 Report Issues | Submit civic complaints with title, description, category, and optional photo evidence |
| 📍 Location Tagging | Attach state and area information to every report |
| 📊 Track Status | Monitor your reports through `Submitted → In Progress → Resolved` lifecycle |
| 📂 Report History | Full history of all your submitted issues in one place |
| 👤 Profile Management | Update personal information and preferences |

### 🛡️ For Administrators

| Feature | Description |
|---|---|
| 🗺️ Region-Based Access | Admins are assigned to specific states and areas — they can only see reports from their jurisdiction |
| 🔍 Advanced Filtering | Filter reports by category, status, date, and location |
| ✏️ Status Management | Update issue status and add resolution notes |
| 📈 Regional Overview | Monitor all open, in-progress, and resolved complaints in their region |
| 🚫 Cross-Region Isolation | Strict RBAC ensures no admin can view or modify issues outside their assigned area |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                        │
│  React.js  •  React Router  •  Tailwind CSS         │
│  Axios  •  Lucide React Icons                       │
└────────────────────┬────────────────────────────────┘
                     │  REST API (JSON)
┌────────────────────▼────────────────────────────────┐
│                     Backend                         │
│  Node.js  •  Express.js                             │
│  JWT Authentication  •  Multer (file uploads)       │
│  bcrypt  •  RBAC Middleware                         │
└────────────────────┬────────────────────────────────┘
                     │  Mongoose ODM
┌────────────────────▼────────────────────────────────┐
│                    Database                         │
│  MongoDB Atlas  (cloud-hosted, persistent)          │
└─────────────────────────────────────────────────────┘

DevOps:  Docker  •  Docker Compose  •  Vercel  •  Render
```

---

## 🏗️ Architecture & Design Decisions

### Why MERN?
MongoDB's flexible document schema is ideal for civic issue data — issue categories, status fields, and location metadata can evolve without requiring schema migrations. React's component model enables a dynamic, responsive dashboard with real-time filtering. Node.js and Express provide a lightweight, fast API layer.

### Role-Based Access Control (RBAC)
RBAC is implemented at both the middleware and query level:
- Every API route is protected by an auth middleware that validates the JWT and extracts the user's role and region
- Admin users have their MongoDB queries automatically scoped to their assigned state and area — they literally cannot query data outside their region
- User routes are scoped to the authenticated user's own reports

### Image Upload Strategy
Multer middleware handles multipart form data for image evidence uploads:
- File type validation (images only) before storage
- File size limits to prevent abuse
- Files stored in the `uploads/` directory with hashed filenames to prevent collisions

### State Management
React's built-in `useState` and `useEffect` hooks are used for local component state, with Axios handling all API communication. This keeps the frontend lightweight without needing Redux for a project of this scale in it.

---

## 📂 Project Structure

```
UrbanVoice/
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ReportIssue.jsx
│   │   ├── utils/            # Axios config, helpers
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── controllers/          # Route handler logic
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── roleMiddleware.js  # Admin/User RBAC
│   ├── models/
│   │   ├── User.js           # User schema (citizens + admins)
│   │   └── Issue.js          # Civic issue schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── issueRoutes.js
│   │   └── adminRoutes.js
│   ├── uploads/              # Stored issue images
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🔐 Security Implementation

UrbanVoice uses a multi-layer security approach:

```
Request
   │
   ▼
JWT Middleware ──── Invalid/Missing Token ──► 401 Unauthorized
   │
   ▼ Valid Token
Role Middleware ─── Wrong Role ──────────── ► 403 Forbidden
   │
   ▼ Authorized
Region Scoping ─── Query auto-scoped to admin's region
   │
   ▼
MongoDB Atlas ─── Encrypted at rest, TLS in transit
```

**Key security measures:**
- Passwords hashed with `bcrypt` (salt rounds: 10) before storage — raw passwords never hit the database
- JWTs are signed with a secret key and carry role + region claims
- All file uploads validated for MIME type before acceptance
- Environment variables used for all secrets — no hardcoded credentials
- Protected API routes reject unauthenticated requests before any business logic runs

---

## 🐳 Docker Setup

The project is fully containerized with Docker Compose — one command spins up both frontend and backend.

### Run with Docker

```bash
# Clone the repository
git clone https://github.com/Roshan-keshri/UrbanVoice.git
cd UrbanVoice

# Start all services
docker compose up --build

# Stop all services
docker compose down
```

### Services started by Docker Compose

| Service | Port | Description |
|---|---|---|
| `frontend` | `5173` | React dev server |
| `backend` | `5000` | Express API server |

---

## ⚙️ Local Setup (without Docker)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Roshan-keshri/UrbanVoice.git
cd UrbanVoice
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret_key
PORT=5000
```

```bash
npm start
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🌐 API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new citizen | No |
| `POST` | `/api/auth/login` | Login (citizen or admin) | No |

### Issues (Citizens)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/issues` | Submit a new civic issue | Yes (User) |
| `GET` | `/api/issues/my` | Get all issues by current user | Yes (User) |
| `GET` | `/api/issues/:id` | Get a specific issue | Yes (User) |

### Admin Dashboard

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/admin/issues` | Get all issues in admin's region | Yes (Admin) |
| `PATCH` | `/api/admin/issues/:id/status` | Update issue status | Yes (Admin) |
| `GET` | `/api/admin/issues/filter` | Filter by category/status/area | Yes (Admin) |

---

## 📊 Issue Lifecycle

```
Citizen submits report
         │
         ▼
    [ Submitted ]
         │
         │ Admin picks up the issue
         ▼
   [ In Progress ]
         │
         │ Issue resolved on ground
         ▼
    [ Resolved ]
```

Each status change is timestamped and visible to the reporting citizen in real time.

---

## 🚀 Deployment

| Layer | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Auto-deploys on push to `main` |
| Backend | Render | Always-on web service |
| Database | MongoDB Atlas | Free tier, cloud-hosted |

Live URLs:
- **Frontend:** https://urban-voice-beta.vercel.app
- **Backend API:** https://urbanvoice-1.onrender.com

---

## 🗺️ Roadmap — Future Enhancements

- [ ] **Cloudinary integration** — cloud-based image storage to replace local `uploads/` directory
- [ ] **Real-time notifications** — WebSocket-based alerts when issue status changes
- [ ] **Email notifications** — transactional emails on report submission and resolution
- [ ] **Interactive maps** — plot reported issues on a map with clustering by density
- [ ] **Analytics dashboard** — charts showing issue categories, resolution times, regional trends
- [ ] **AI-based complaint prioritization** — ML model to flag high-urgency issues automatically
- [ ] **Issue heatmaps** — visualize which areas have the most unresolved complaints
- [ ] **Progressive Web App (PWA)** — offline support and mobile install capability

---

## 📚 Key Learnings

Building UrbanVoice provided hands-on experience with:

- **Full-stack MERN development** from scratch — schema design to production deployment
- **JWT-based authentication** — implementing stateless auth with role claims
- **Role-Based Access Control** — building middleware that restricts data at both route and query level
- **File handling** — multipart form data, MIME validation, and secure upload pipelines with Multer
- **Docker & Docker Compose** — containerizing a multi-service application for consistent environments
- **MongoDB Atlas** — cloud-hosted database setup, connection pooling, and indexing for filtered queries
- **Responsive UI** — building a dashboard that works across screen sizes with Tailwind CSS
- **Production deployment** — deploying to Vercel (frontend) and Render (backend) with environment-based config

---

## 👨‍💻 Author

**Roshan Kumar Keshri**
B.Tech (ECE) — Indian Institute of Information Technology, Ranchi (2023–2027)

- GitHub: [github.com/Roshan-keshri](https://github.com/Roshan-keshri)
- LinkedIn: [linkedin.com/in/roshan-keshri](https://linkedin.com/in/roshan-keshri)
- Email: keshriroshan44@gmail.com

---

<div align="center">

If you found this project useful or interesting, consider giving it a ⭐ on GitHub — it helps others discover it!

</div>

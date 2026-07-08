<div align="center">

# 🏙️ UrbanVoice
### Community Issue Reporting Platform

**Empowering citizens. Enabling authorities. Building better cities.**

A full-stack MERN application that bridges the gap between citizens and local governments — with a fully automated CI/CD pipeline, cloud image storage, and production deployments on every push.

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)](https://your-frontend-url.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)](https://your-backend-url.onrender.com)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker)](https://docker.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

</div>

---

## 📖 What is UrbanVoice?

UrbanVoice is a civic-tech platform that allows **citizens** to report local issues — potholes, broken streetlights, sanitation problems, water supply failures — and enables **government administrators** to track, prioritize, and resolve them through a region-specific dashboard.

What makes this project production-grade beyond just the features is the **fully automated DevOps pipeline** — every push to `main` triggers GitHub Actions, builds and pushes a Docker image to Docker Hub, and automatically redeploys the backend on Render. Zero manual deployment steps.

> **Real-world inspiration:** India's civic infrastructure often suffers not from lack of resources, but from lack of visibility. UrbanVoice is built to solve exactly that.

---

## ✨ Features

### 👤 For Citizens

| Feature | Description |
|---|---|
| 🔐 Secure Authentication | JWT-based login and registration with bcrypt password hashing |
| 📝 Report Issues | Submit civic complaints with title, description, category, and location |
| 🖼️ Photo Evidence | Upload issue images via **Cloudinary** — cloud-stored, optimized, and persistent |
| 🔍 Filter & Browse | Filter all reported issues by category and location |
| 📊 Track Status | Monitor your reports through `Submitted → In Progress → Resolved` lifecycle |
| 👤 Profile Management | Update personal information and preferences |

### 🛡️ For Administrators

| Feature | Description |
|---|---|
| 🗺️ Region-Based Dashboard | View and manage issues only within assigned jurisdiction |
| 🔍 Advanced Filtering | Filter by category, region, status, and date |
| ✏️ Status Management | Update issue status and track resolution progress |
| 🗑️ Content Moderation | Delete inappropriate or duplicate reports |
| 📈 Platform Monitoring | Overview of all open, in-progress, and resolved issues |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | UI framework with fast HMR dev server |
| Tailwind CSS | Utility-first responsive styling |
| React Router | Client-side routing |
| Axios | HTTP client for API communication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server runtime and REST API framework |
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose ODM | Schema modeling and query layer |
| JWT + bcrypt | Authentication and password hashing |
| Cloudinary | Cloud image storage and optimization |
| Multer | Multipart file upload handling |

### DevOps & Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization for consistent environments |
| GitHub Actions | Automated CI/CD pipeline |
| Docker Hub | Docker image registry |
| Render | Backend deployment (pulls from Docker Hub) |
| Vercel | Frontend deployment with auto-deploy on push |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                     │
│        (Vite • Tailwind CSS • React Router)         │
└────────────────────┬────────────────────────────────┘
                     │  REST API (JSON over HTTPS)
┌────────────────────▼────────────────────────────────┐
│                Express.js Backend                   │
│  JWT Auth Middleware → RBAC Middleware → Controllers│
└──────┬─────────────────────────────────┬────────────┘
       │ Mongoose ODM                    │ Cloudinary SDK
┌──────▼──────────┐             ┌────────▼────────────┐
│  MongoDB Atlas  │             │     Cloudinary      │
│  (Issue data,   │             │  (Image storage &   │
│   user accounts)│             │   optimization)     │
└─────────────────┘             └─────────────────────┘
```

---

## 🔄 CI/CD Pipeline

UrbanVoice uses two separate GitHub Actions workflows — one for the backend, one for the frontend.

### Backend Pipeline

Every push to `main` triggers a full build → test → containerize → deploy cycle:

```
git push to main
       │
       ▼
GitHub Actions (backend.yml)
       │
       ├── Checkout repository
       ├── Install dependencies
       ├── Build Docker image
       ├── Login to Docker Hub (via GitHub Secrets)
       ├── Push image to Docker Hub
       └── Trigger Render Deploy Hook
                  │
                  ▼
         Render pulls latest image
                  │
                  ▼
       ✅ Backend live and updated
```

### Frontend Pipeline

```
git push to main
       │
       ▼
GitHub Actions (frontend.yml)
       │
       ├── Checkout repository
       ├── Install dependencies
       ├── Build React app (Vite production build)
       └── ✅ Build verified
                  │
                  ▼
       Vercel auto-deploys on push
                  │
                  ▼
       ✅ Frontend live and updated
```

### GitHub Secrets Required

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_TOKEN` | Docker Hub Personal Access Token |
| `RENDER_DEPLOY_HOOK` | Render webhook URL to trigger backend redeploy |

---

## 🔐 Security Implementation

```
Incoming Request
       │
       ▼
JWT Middleware ──── Invalid/Missing Token ──► 401 Unauthorized
       │
       ▼ Valid Token
Role Middleware ─── Wrong Role ──────────── ► 403 Forbidden
       │
       ▼ Authorized
Region Scoping ─── Queries auto-scoped to admin's assigned region
       │
       ▼
MongoDB Atlas ─── Encrypted at rest • TLS in transit
```

**Key security measures:**
- Passwords hashed with `bcrypt` (salt rounds: 10) — raw passwords never stored
- JWTs carry role and region claims, verified on every protected request
- File uploads validated for MIME type via Multer before reaching Cloudinary
- All secrets managed via environment variables — zero hardcoded credentials
- Admin queries are automatically region-scoped at the database layer

---

## 📂 Project Structure

```
UrbanVoice/
│
├── .github/
│   └── workflows/
│       ├── backend.yml        # Backend CI/CD — Docker build + Render deploy
│       └── frontend.yml       # Frontend CI — Vite build verification
│
├── backend/
│   ├── config/                # DB connection, Cloudinary config
│   ├── controllers/           # Route handler logic
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── roleMiddleware.js  # Admin/User RBAC
│   ├── models/
│   │   ├── User.js            # User schema (citizens + admins)
│   │   └── Issue.js           # Civic issue schema with status tracking
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── issueRoutes.js
│   │   └── adminRoutes.js
│   ├── uploads/               # Temporary local storage before Cloudinary upload
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml         # Local multi-service orchestration
```

---

## 🌐 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new citizen | No |
| `POST` | `/api/auth/login` | Login (citizen or admin) | No |

### Issues (Citizens)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/issues` | Submit a new civic issue with image | User |
| `GET` | `/api/issues` | Get all issues (with filters) | User |
| `GET` | `/api/issues/my` | Get current user's submitted issues | User |
| `GET` | `/api/issues/:id` | Get a specific issue | User |

### Admin Dashboard

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/admin/issues` | Get all issues in admin's region | Admin |
| `PATCH` | `/api/admin/issues/:id/status` | Update issue status | Admin |
| `GET` | `/api/admin/issues/filter` | Filter by category/status/area | Admin |
| `DELETE` | `/api/admin/issues/:id` | Delete inappropriate report | Admin |

---

## 📊 Issue Lifecycle

```
Citizen submits report + photo
           │
           ▼
      [ Submitted ]
           │
           │  Admin picks up the issue
           ▼
     [ In Progress ]
           │
           │  Issue resolved on ground
           ▼
      [ Resolved ] ✅
```

Each status change is timestamped and visible to the reporting citizen in real time.

---

## 🐳 Docker Setup

### Run with Docker Compose

```bash
# Clone the repository
git clone https://github.com/Roshan-keshri/UrbanVoice.git
cd UrbanVoice

# Start all services
docker-compose up --build

# Stop all services
docker-compose down
```

### Services

| Service | Port | Description |
|---|---|---|
| `frontend` | `5173` | React + Vite dev server |
| `backend` | `5000` | Express API server |

---

## ⚙️ Local Setup (without Docker)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
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

Create `.env` in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm start
# → http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` in `/frontend`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
# → http://localhost:5173
```

---

## 🚀 Deployment

| Layer | Platform | How |
|---|---|---|
| Frontend | Vercel | Auto-deploys on push to `main` |
| Backend | Render | Pulls Docker image from Docker Hub via deploy hook |
| Database | MongoDB Atlas | Cloud-hosted, free tier |
| Image Storage | Cloudinary | SDK integrated in backend |
| Docker Registry | Docker Hub | Images pushed by GitHub Actions |

---

## 📚 Key Learnings

Building UrbanVoice provided hands-on experience with:

- **Full-stack MERN development** — schema design to production deployment
- **Cloudinary integration** — cloud image upload, storage, and optimization pipeline
- **CI/CD with GitHub Actions** — writing multi-workflow YAML pipelines for separate frontend and backend
- **Docker & Docker Compose** — containerizing a multi-service application and publishing to Docker Hub
- **Render deployment via Docker** — triggering automated backend redeploys using deploy hooks
- **JWT + RBAC** — stateless auth with role and region claims enforced at middleware and query level
- **Multer file handling** — multipart upload validation before cloud storage
- **MongoDB Atlas** — cloud database setup with Mongoose schema design for flexible civic data

---

## 👨‍💻 Author

**Roshan Kumar Keshri**
B.Tech (ECE) — Indian Institute of Information Technology, Ranchi (2023–2027)

- 🌐 Portfolio: [roshan-portfolio-henna.vercel.app](https://roshan-portfolio-henna.vercel.app)
- GitHub: [github.com/Roshan-keshri](https://github.com/Roshan-keshri)
- LinkedIn: [linkedin.com/in/roshan-keshri](https://linkedin.com/in/roshan-keshri)
- Email: keshriroshan44@gmail.com

---

<div align="center">

If you found this project useful or interesting, consider giving it a ⭐ on GitHub!

</div>

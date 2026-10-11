
# MediCode — AI-Powered Personal Health Copilot

> **CODE BLOODED** · Team ID **XL0035** · Built for **Altrix Labs Round 1** (ByteXL HacXLerate 2026)

An AI-powered Personal Health Copilot that helps individuals understand, organize, and manage their healthcare journey through intelligent analysis of medical records, prescriptions, diagnostic reports, and wellness data.

![Status](https://img.shields.io/badge/status-live-22c55e)
![Stack](https://img.shields.io/badge/stack-MERN-8b5cf6)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-ff2d2d)
![Languages](https://img.shields.io/badge/languages-6-ec4899)

**🔗 Live App:** https://medi-code-two.vercel.app  
**🔗 Backend API:** https://medicode-zc19.onrender.com  
**🔗 Source Code:** https://github.com/mounika716/MediCode

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Demo Flow](#-demo-flow)
- [Safety & Compliance](#-safety--compliance)
- [Team](#-team)
- [License](#-license)

---

## 🎯 The Problem

Healthcare information is fragmented across prescriptions, lab reports, discharge summaries, and diagnostic records — making it difficult for patients to understand and manage their health effectively.

| Stat | Reality |
|------|---------|
| **2 hours/day** | Doctors spend on documentation instead of patients |
| **68%** | of patients can't interpret their own lab reports |
| **1 in 5** | ER critical cases slip through triage queues |
| **125,000/yr** | Preventable deaths from drug interactions |
| **30%** | Hospital beds wasted due to demand misjudgment |

**MediCode targets every one.**

---

## 💡 The Solution

MediCode turns fragmented medical records into **structured, explainable health intelligence** — in the patient's own language.

### Core Features (Altrix Round 1)

**1. Medical Record Intelligence & OCR**  
Ingest prescriptions, lab reports, discharge summaries, and diagnostic records. Extract medicines, dosages, test values, diagnoses, and dates using vision AI.

**2. Plain-Language AI Summaries**  
Explain every record in simple language, including what abnormal values mean and what the patient should do next.

**3. Unified Health Profile**  
Organize everything into one chronological timeline with severity color-coding, filtering, and full-text search.

### Bonus Features

**Multi-Language Support**  
English · Hindi · Telugu · Tamil · Bengali · Marathi. AI-generated summaries in the patient's mother tongue, plus text-to-speech read-aloud.

**ABDM / ABHA Readiness**  
FHIR-inspired schema with ABHA ID field. Data model designed to plug into India's digital health stack without schema changes.

### Platform Capabilities

| Module | What it does |
|--------|-------------|
| 🎙 **Ambient Scribe** | Live doctor–patient conversation → complete clinical note |
| 📝 **Clinical Notes** | Raw note → summary + diagnosis + ICD-10 codes |
| 🔬 **Lab Explainer** | Lab values → plain-English explanation with abnormal flags |
| 🚨 **Smart Triage** | Symptoms + vitals → ER urgency level (1–5) |
| 💊 **Medication Check** | Drug list → pairwise interaction risk analysis |
| 📈 **Resource Forecast** | Historical data → 7-day demand prediction |

### Trust Layer

- 📊 **Confidence score** on every AI output with color-coded bar
- 🧠 **Reasoning trace** — collapsible step-by-step explanation
- ⚠️ **Red-flag alerts** — priority queue for high-severity cases
- 📁 **Patient timeline** — longitudinal view across visits
- 📋 **Full audit trail** — every task saved, searchable, exportable
- 📄 **PDF export** — clinical-grade A4 layout

### Accessibility

- 🎤 **Voice input** — Web Speech API, works in 6 languages
- 🔊 **Voice output** — text-to-speech reads summaries aloud
- 📷 **Image input** — photograph a handwritten note or lab report
- 🌐 **Six Indian languages** — content, not just chrome

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)                     │
│   Upload UI · Review UI · Timeline · Alerts · Voice · TTS   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Axios + Socket.io
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Express + Node.js)                     │
│   Auth (JWT) · Records API · AI pipeline · Real-time alerts  │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌───────────┐      ┌─────────────┐    ┌──────────────┐
│  MongoDB  │      │  Groq AI    │    │  Nodemailer  │
│  Atlas    │      │  Vision +   │    │  (Email      │
│  (FHIR)   │      │  Text LLM   │    │   verify)    │
└───────────┘      └─────────────┘    └──────────────┘
```

### Data Pipeline

```
User uploads PDF / JPG / PNG
        ↓
Client-side: pdfjs-dist → image → base64
        ↓
POST /api/records  (multipart auth)
        ↓
Groq Qwen 3.8 27B vision model
        ↓
Structured JSON (FHIR-inspired fields)
        ↓
MongoDB MedicalRecord (status: extracted)
        ↓
User reviews & edits → PATCH /api/records/:id
        ↓
status: reviewed + full audit trail
        ↓
Plain-language summary (6 languages)
        ↓
Unified health timeline
```

### FHIR-Inspired Schema

| MediCode Field | FHIR Resource | Description |
|----------------|---------------|-------------|
| `observations[]` | `Observation` | Lab values, vitals, test results |
| `medications[]` | `MedicationRequest` | Prescribed drugs with dosage |
| `diagnoses[]` | `Condition` | Diagnosed conditions |
| `patientName`, `abhaId` | `Patient` | Patient identity |
| `recordDate`, `facilityName` | `Encounter` | Visit metadata |

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19 · Vite 8 · Tailwind CSS v4 · React Bits (40+ components) · React Three Fiber · Framer Motion |
| **Backend** | Node.js 24 · Express 4 · MongoDB Atlas · Mongoose 8 · Socket.io |
| **AI** | Groq API — Llama 3.3 70B (text) · Qwen 3.8 27B (vision) |
| **Auth** | JWT · bcryptjs · email verification · password reset |
| **Storage** | Multer (avatars) · MongoDB (records) |
| **Notifications** | react-hot-toast · Web Notifications API · Socket.io |
| **Export** | jsPDF (PDF) · jsPDF-Autotable |
| **Charts** | Recharts |
| **PDF Parsing** | pdfjs-dist (client) · pdf-parse (server) |
| **Email** | Nodemailer (Gmail SMTP) |
| **3D** | Three.js · @react-three/fiber · @react-three/drei |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- MongoDB Atlas account ([free tier](https://www.mongodb.com/cloud/atlas))
- Groq API key ([free](https://console.groq.com/keys))
- Gmail account with [App Password](https://myaccount.google.com/apppasswords) (for email verification)

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medicode
JWT_SECRET=your_random_48_char_secret
GROQ_API_KEY=gsk_your_groq_key
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
```

Start the backend:

```bash
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 📁 Project Structure

```
MediCode/
│
├── backend/
│   ├── config/
│   │   └── db.js                      MongoDB connection
│   ├── controllers/
│   │   ├── authController.js          Register, login, verify, reset
│   │   ├── aiController.js            6 AI workflows + streaming
│   │   └── recordsController.js       Medical record CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js          JWT verification
│   │   └── errorMiddleware.js         Centralized error handling
│   ├── models/
│   │   ├── User.js                    User + bcrypt
│   │   ├── AiTask.js                  AI task audit trail
│   │   └── MedicalRecord.js           FHIR-inspired records
│   ├── routes/
│   │   ├── authRoutes.js              /api/auth/*
│   │   ├── aiRoutes.js                /api/ai/*
│   │   ├── recordsRoutes.js           /api/records/*
│   │   └── uploadRoutes.js            /api/upload/*
│   ├── services/
│   │   ├── ai.js                      Groq SDK wrapper (text + vision + stream)
│   │   └── prompts/                   One file per AI workflow
│   │       ├── clinicalNote.js
│   │       ├── labExplainer.js
│   │       ├── triage.js
│   │       ├── medication.js
│   │       ├── resourceForecast.js
│   │       ├── ambientVisit.js
│   │       ├── medicalRecord.js
│   │       └── languages.js           6-language resolver
│   ├── utils/
│   │   ├── emailService.js            Nodemailer wrapper
│   │   └── generateToken.js           JWT signing
│   ├── uploads/                       Avatar uploads (gitignored)
│   ├── .env                           (gitignored)
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── icons.svg
    ├── src/
    │   ├── components/
    │   │   ├── animations/            Galaxy · Aurora · LogoLoop · ScrollExpand
    │   │   ├── dashboard/             WeeklyChart
    │   │   ├── gallery/               CircularGallery · InfiniteSpiral · Masonry
    │   │   ├── home/                  HeroSection · DemoModal · TrustBar · CTA
    │   │   ├── intro/                 MediCodeEntry transition
    │   │   ├── layout/                AppShell · GooeyNavbar · ProfileModal
    │   │   ├── micro/                 VoicePill · PromptBar · TearTicket
    │   │   ├── module/                AiForm · TaskResult · VoicePillInput
    │   │   ├── nav/                   GooeyNav · LineSidebar · Stepper
    │   │   ├── text/                  BlurText · SplitText · ShinyText · 15 more
    │   │   ├── three/                 StarField · SceneCanvas · Hero3D
    │   │   ├── ui-custom/             SpecularButton · SpotlightCard · GlideSelect
    │   │   ├── ErrorBoundary.jsx
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx        Global auth state
    │   ├── data/
    │   │   └── images.js              Centralized image URLs
    │   ├── hooks/
    │   │   ├── useBrowserNotifications.js
    │   │   ├── useLenis.js            Smooth scroll
    │   │   ├── useSpeechRecognition.js
    │   │   └── useSpeechSynthesis.js
    │   ├── lib/
    │   │   └── utils.js               cn() helper
    │   ├── pages/
    │   │   ├── modules/               6 AI workflow pages
    │   │   ├── Alerts.jsx             Priority queue
    │   │   ├── Dashboard.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── History.jsx
    │   │   ├── Home.jsx               Landing
    │   │   ├── Login.jsx
    │   │   ├── PatientTimeline.jsx
    │   │   ├── Playground3D.jsx
    │   │   ├── RecordDetail.jsx
    │   │   ├── Records.jsx
    │   │   ├── Register.jsx
    │   │   ├── ResetPassword.jsx
    │   │   ├── ReviewRecord.jsx
    │   │   ├── TaskDetail.jsx
    │   │   ├── TeamIntro.jsx          CODE BLOODED intro
    │   │   ├── UploadRecord.jsx
    │   │   └── VerifyEmail.jsx
    │   ├── services/
    │   │   ├── api.js                 Axios + JWT interceptor
    │   │   └── socket.js              Socket.io client
    │   ├── styles/
    │   │   └── team-intro.css         Cinematic intro styles
    │   ├── utils/
    │   │   ├── pdfExport.js           jsPDF export
    │   │   └── pdfToImage.js          Client-side PDF parsing
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── .env                           (gitignored)
    ├── .gitignore
    ├── components.json                shadcn config
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json                  Path aliases
    ├── package.json
    ├── vercel.json                    SPA routing
    └── vite.config.js
```

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Authenticate and return JWT |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/resend-verification` | Resend verification email |
| POST | `/api/auth/forgot-password` | Request reset link |
| POST | `/api/auth/reset-password` | Reset with token |
| GET | `/api/auth/me` | Get current user (protected) |

### AI Workflows

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/ai/:type` | Run AI task (clinical-note, lab-explainer, triage, medication-check, resource-forecast, ambient-visit) |
| POST | `/api/ai/:type/stream` | Same, streamed via Server-Sent Events |
| GET | `/api/ai/tasks/all` | List all tasks (filterable by type) |
| GET | `/api/ai/tasks/:id` | Get single task |
| PATCH | `/api/ai/tasks/:id/notes` | Update task notes |
| DELETE | `/api/ai/tasks/:id` | Delete task |
| GET | `/api/ai/stats/summary` | Aggregate stats by type + severity |

### Medical Records

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/records` | Create record (upload → extract) |
| GET | `/api/records` | List user's records |
| GET | `/api/records/:id` | Get single record |
| PATCH | `/api/records/:id` | Update reviewed record |
| DELETE | `/api/records/:id` | Delete record |
| GET | `/api/records/:id/translate` | Translate summary to another language |

### Uploads

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/upload/avatar` | Upload user avatar (protected) |

**All protected endpoints require:**
```
Authorization: Bearer <jwt_token>
```

---

## 🎬 Demo Flow

**A 3-minute walkthrough of MediCode in action:**

1. **Landing page** — Cinematic team intro with smooth scroll, mission statement, and feature overview
2. **Watch a demo** — Self-playing product walkthrough (no login required)
3. **Register** — Email verification → dashboard with live stats
4. **Upload medical record** — Drag a prescription or lab report (PDF/JPG/PNG)
5. **AI extraction** — Vision AI reads the document in ~3 seconds
6. **Review** — Edit any field before saving; status moves `extracted → reviewed`
7. **Language switch** — Change summary to Hindi, Telugu, Tamil, Bengali, or Marathi
8. **Listen** — AI reads the summary aloud using text-to-speech
9. **Health timeline** — Every record in chronological order
10. **Alerts** — Priority queue surfaces high-severity cases
11. **PDF export** — Download a clean, clinical-grade A4 record

---

## 🔐 Safety & Compliance

MediCode is designed with medical safety as a first-class concern.

- ✅ **Medical disclaimer on every output** — clearly states AI is not a diagnosis
- ✅ **Human-in-the-loop review required** — user must confirm before saving (`extracted → reviewed`)
- ✅ **No invented data** — prompts strictly forbid filling in missing values, dosages, or reference ranges
- ✅ **Confidence scores** — every AI output shows certainty level (High / Moderate / Low)
- ✅ **Reasoning traces** — users see *why* the AI decided, not just the answer
- ✅ **User-scoped records** — every API enforces ownership; no cross-user access
- ✅ **Sensitive data handling** — base64 images stripped before MongoDB persistence
- ✅ **ABDM-ready** — FHIR-inspired schema maps to national health standards
- ✅ **No public static uploads** — medical documents never exposed via direct URL
- ✅ **Encrypted transport** — HTTPS in production (Vercel + Render)

---

## 🎨 Design Highlights

- **Cinematic team intro** — CODE BLOODED, XL0035, with blood-red accents and letterbox preloader
- **Galaxy background** — full-page animated starfield on the landing page
- **40+ React Bits components** — BlurText, SplitText, GooeyNav, CircularGallery, InfiniteSpiral
- **Real-time 3D** — React Three Fiber for hero visuals
- **Smooth scroll** — Lenis-powered momentum scrolling
- **Custom cursor** — TargetCursor with magnetic interaction
- **Glass morphism** — backdrop blur throughout

---

## 👥 Team

**CODE BLOODED** · Team ID **XL0035**

- Frontend & Integration — React · Vite · Tailwind · React Bits
- Backend Engineering — Node · Express · MongoDB · Socket.io
- AI & Vision — Groq · Llama · Qwen · OCR pipeline

---

## 📄 License

MIT License · Built for **Altrix Labs Round 1** · **ByteXL HacXLerate 2026**

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) — blazing-fast LLM inference
- [React Bits](https://reactbits.dev) — 40+ cinematic React components
- [Altrix Labs](https://altrixlabs.ai) — for the challenge that sparked this
- [ByteXL](https://bytexl.in) — for hosting HacXLerate

---

**Built with 🩸 in India.**


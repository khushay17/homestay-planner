# 🏡 Homestay Planner

An end-to-end, full-stack web application for planning trips, discovering handpicked homestays, managing travel itineraries, and generating AI-powered personalized travel plans using **Google Gemini AI**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Local Development Setup](#-local-development-setup)
- [Deployment Guide](#-deployment-guide)
  - [1. Database Setup (MongoDB Atlas)](#1-database-setup-mongodb-atlas)
  - [2. Backend Deployment (Render / Railway)](#2-backend-deployment-render--railway)
  - [3. Frontend Deployment (Vercel / Netlify)](#3-frontend-deployment-vercel--netlify)
- [Security & Best Practices](#-security--best-practices)
- [License](#-license)

---

## 🌟 Overview

**Homestay Planner** provides a seamless trip planning experience for travelers looking for authentic homestay experiences. Users can register/login securely, plan customized itineraries based on destination, budget, duration, and interests, generate AI-enhanced daily activities via **Google Gemini**, browse curated homestays across top hill station destinations (Mussoorie, Nainital, Manali, Shimla, Rishikesh), and save their trips to a persistent cloud database.

---

## ✨ Key Features

- 🔐 **Authentication & Authorization**:
  - Secure Email & Password signup/login with password hashing (`bcrypt`).
  - JSON Web Token (JWT) session management stored safely in client local storage.
  - Optional Google OAuth 2.0 authentication integration (`passport-google-oauth20`).
  - Rate limiting on sensitive auth routes to prevent brute-force attacks (`express-rate-limit`).

- 🤖 **AI-Powered Itinerary Generation**:
  - Integration with **Google Gemini API** (`@google/genai`) to generate personalized travel itineraries.
  - Form fields for budget, length of stay, travel style, accommodations, and interests.
  - Intelligent fallback rule-based itinerary generator when offline or API is unavailable.

- 🏡 **Curated Homestay Directory**:
  - Filterable directory of homestays by destination.
  - Detailed stay info including price per night, ratings, amenities (WiFi, Mountain View, Bonfire, etc.), high-res photos, and descriptions.

- 🗺️ **Trip Management (CRUD)**:
  - Save planned trips directly to MongoDB.
  - View all upcoming & saved trips in a personalized "My Trips" dashboard.
  - Search trips by destination, update details, or remove past trips.

- 🎨 **Modern Responsive UI**:
  - Built with **React 19**, **Vite**, and **Tailwind CSS v4**.
  - Clean card-based layouts, dynamic icons (`lucide-react`), and markdown preview support (`react-markdown`).

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI Component Library |
| **Vite** | Next-generation frontend build tool |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Lucide React** | Modern iconography set |
| **React Markdown** | Markdown rendering engine for AI responses |

### **Backend**
| Technology | Description |
| :--- | :--- |
| **Node.js & Express.js** | Server environment & Web Application Framework |
| **MongoDB & Mongoose** | NoSQL Database & Object Data Modeling (ODM) |
| **JWT (jsonwebtoken)** | Secure authentication & authorization tokens |
| **Bcrypt.js** | Password encryption & hashing |
| **Google GenAI SDK** | Integration with Gemini AI Models (`gemini-flash-latest`) |
| **Passport.js** | Google OAuth 2.0 Authentication middleware |
| **Express Validator** | Request payload validation & sanitization |
| **Express Rate Limit** | Protection against DDoS & brute-force requests |

---

## 📁 Project Architecture

```
homestay-planner/
├── backend/                  # Express.js REST API Server
│   ├── config/
│   │   └── passport.js       # Google OAuth Passport strategy configuration
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT Bearer token authentication validator
│   │   └── rateLimiter.js    # Express rate limiter for authentication routes
│   ├── models/
│   │   ├── User.js           # Mongoose User Schema (Authentication)
│   │   └── Trip.js           # Mongoose Trip Schema (Itineraries & Bookings)
│   ├── routes/
│   │   ├── ai.js             # Gemini AI Itinerary generation endpoint
│   │   └── auth.js           # Register, Login, Google OAuth, Profile routes
│   ├── .env.example          # Sample environment variables for backend
│   ├── package.json          # Backend Node dependencies & scripts
│   └── server.js             # Express application entry point & API routes
│
├── src/                      # React Frontend Source Code
│   ├── components/           # Reusable UI Components
│   │   ├── Card.jsx          # Reusable Card container component
│   │   ├── Footer.jsx        # App Footer
│   │   ├── Hero.jsx          # Hero Banner component
│   │   └── Navbar.jsx        # Navigation bar
│   ├── config/
│   │   └── api.js            # API base URL configuration
│   ├── pages/                # Main Application Views / Pages
│   │   ├── About.jsx         # Project overview page
│   │   ├── Dashboard.jsx     # Main user hub after login
│   │   ├── Home.jsx          # Landing page
│   │   ├── Homestays.jsx     # Homestay listing & filtering page
│   │   ├── Itinerary.jsx     # Detailed trip itinerary view page
│   │   ├── Login.jsx         # User login form page
│   │   ├── MyTrips.jsx       # Saved trips dashboard page
│   │   ├── PlanTrip.jsx      # Trip creation & AI generator page
│   │   └── Signup.jsx        # New user registration page
│   ├── App.jsx               # Application container & state routing
│   ├── main.jsx              # React application DOM root mount
│   └── index.css             # Tailwind CSS import directives
│
├── package.json              # Frontend dependencies & Vite configuration
├── vite.config.js            # Vite build setup
└── README.md                 # Project documentation
```

---

## 🗄️ Database Schema

### 1. **User Model** (`User.js`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Full name of user |
| `email` | String | Yes (Unique) | User email address (lowercased) |
| `password` | String | No | Hashed password (optional if Google OAuth used) |
| `googleId` | String | No | Google Account ID (default: `null`) |
| `createdAt` | Date | Auto | Record creation timestamp |
| `updatedAt` | Date | Auto | Record update timestamp |

### 2. **Trip Model** (`Trip.js`)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `destination` | String | Yes | Destination name (e.g., "Mussoorie", "Manali") |
| `days` | Number | Yes | Trip duration in days |
| `travelers` | Number | No | Number of travelers (default: `1`) |
| `budget` | String | No | Budget range/category |
| `travelStyle` | String | No | Style of travel (e.g., Solo, Family, Adventure) |
| `accommodation`| String | No | Preferred accommodation type |
| `month` | String | No | Planned travel month |
| `activities` | Array[String]| No | List of selected activities |
| `notes` | String | No | Custom traveler notes |
| `itinerary` | Array[Object]| No | Day-wise activity schedule `[{ day: Number, activities: [String] }]` |
| `createdAt` | Date | Auto | Creation timestamp |

---

## 📡 API Documentation

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Login user & receive JWT token |
| `GET` | `/api/auth/google` | Public | Trigger Google OAuth 2.0 login |
| `GET` | `/api/auth/google/callback` | Public | Callback for Google OAuth 2.0 |
| `GET` | `/api/auth/profile` | Protected | Get authenticated user profile details |

### **Trip Routes** (`/api/trips`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/trips` | Protected | Fetch all saved trips |
| `GET` | `/api/trips/search?q=:query` | Public | Search trips by destination keyword |
| `GET` | `/api/trips/:id` | Protected | Fetch details of a single trip |
| `POST` | `/api/trips` | Protected | Create a new trip with generated itinerary |
| `PUT` | `/api/trips/:id` | Protected | Update existing trip details |
| `DELETE` | `/api/trips/:id` | Protected | Delete a trip by ID |

### **Homestay Routes** (`/api/homestays`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/homestays?destination=:name` | Protected | Get homestays filtered by destination |
| `GET` | `/api/homestays/:id` | Protected | Get single homestay details by ID |

### **AI Routes** (`/api/ai`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/itinerary` | Public | Generate Gemini AI itinerary based on trip parameters |

---

## 🔑 Environment Variables

### **Backend (`backend/.env`)**
Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/homestay-planner?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
GEMINI_API_KEY=your_google_gemini_api_key

# Optional: Google OAuth Setup
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
```

### **Frontend (`.env`)**
Create a `.env` file in the root project directory:

```env
VITE_API_URL=http://localhost:5000
```

---

## 💻 Local Development Setup

### **Prerequisites**
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- MongoDB Database (Local MongoDB server or MongoDB Atlas URI)
- Google Gemini API Key ([Get Key here](https://aistudio.google.com/))

### **Step 1: Clone Repository**
```bash
git clone https://github.com/khushay17/homestay-planner.git
cd homestay-planner
```

### **Step 2: Setup & Run Backend**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add MONGO_URI, JWT_SECRET, and GEMINI_API_KEY

# Start backend server in development mode
npm run dev
```
*Backend runs on `http://localhost:5000`*

### **Step 3: Setup & Run Frontend**
Open a new terminal window at the project root:

```bash
# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🚀 Deployment Guide

### **1. Database Setup (MongoDB Atlas)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster and Database named `homestay-planner`.
3. Under **Database Access**, create a database user with read/write credentials.
4. Under **Network Access**, add IP `0.0.0.0/0` to allow connections from deployment platforms.
5. Copy your MongoDB Connection String (`mongodb+srv://...`).

---

### **2. Backend Deployment (Render / Railway)**

#### **Deploying on Render:**
1. Log into [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the following configuration:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following **Environment Variables** in Render settings:
   - `PORT`: `5000` (or leave default assigned by Render)
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `your_production_jwt_secret`
   - `GEMINI_API_KEY`: `your_google_gemini_api_key`
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app`
5. Click **Deploy Web Service**. Render will output your live API URL (e.g. `https://homestay-planner-backend.onrender.com`).

---

### **3. Frontend Deployment (Vercel / Netlify)**

#### **Deploying on Vercel:**
1. Log into [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
2. Import your `homestay-planner` GitHub repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (Project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://homestay-planner-backend.onrender.com` (Your deployed backend URL)
5. Click **Deploy**. Vercel will build and publish your frontend application!

---

## 🛡️ Security & Best Practices

1. **Password Hashing**: User passwords are never stored in plain text. Salting and hashing are performed using `bcrypt` (10 rounds).
2. **JWT Authentication**: Protected API endpoints enforce Bearer Token headers and decode tokens securely on the server.
3. **Rate Limiting**: Auth endpoints utilize `express-rate-limit` to prevent brute force attacks.
4. **Input Validation**: API requests are validated with `express-validator` to prevent SQL/NoSQL injection and improper data payloads.
5. **CORS Configuration**: Server restricts cross-origin requests to configured frontend URLs.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

Developed with ❤️ for travelers and homestay enthusiasts.

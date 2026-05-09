# 🩺 Care Connect

A modern full-stack caregiving service platform where users can easily find and book trusted caregivers for children, elderly, and sick family members.

---

## 🌐 Live Site

https://care-connect-client-eight.vercel.app/

### 🎯 Admin id : "mahmudaoishi457@gmail.com"
### 🎯 Admin password : "123456"

---

## 🖼️ Project Overview

**Care Connect** is a full-stack web application designed to make caregiving simple, secure, and accessible for families.
Users can explore available services, view details, and securely book caregivers based on duration and location.

The platform supports babysitting, elderly care, and special patient care with dynamic cost calculation and booking tracking.

---

## 🚀 Tech Stack

### Frontend

* React.js / Next.js
* Firebase Authentication
* Tailwind CSS
* React Router
* React Hook Form
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* CORS
* Dotenv

---

## ⭐ Main Features

* 🔐 Email & Password Authentication
* 🔐 Google Social Login
* 🏠 Service Listing (Baby Care, Elderly Care, Sick Care)
* 📄 Service Details Page (Dynamic Route)
* 📍 Dynamic Booking (Duration + Location Selection)
* 💰 Automatic Cost Calculation
* 📊 Booking Status (Pending / Confirmed / Completed / Cancelled)
* 📂 My Bookings Page (Protected Route)
* 🔔 Email Invoice after Booking
* 🧭 Protected Routes with Auth Persistence
* 📱 Fully Responsive UI (Mobile, Tablet, Desktop)
* ❌ Custom 404 Page
* 🧭 Clean Navbar & Footer Navigation

---

## 📦 Dependencies

### Client

* react / next
* firebase
* react-router-dom
* react-hook-form
* react-hot-toast
* tailwindcss

### Server

* express
* mongodb
* cors
* dotenv
* nodemailer

---

## 🔐 Authentication

Firebase Authentication is used for secure login and protected routes.
Only authenticated users can book services and access the **My Bookings** page, while visitors can browse services publicly.

---

## 🧾 Booking System

Users can:

1. Select service
2. Choose duration (hour/day)
3. Select location (Division → District → City → Area)
4. View total cost automatically
5. Confirm booking (Status: Pending)

After booking, users receive an **email invoice**.

---

## 📌 Routes Summary

* `/` → Home Page
* `/login` → Login Page
* `/register` → Registration Page
* `/service/:service_id` → Service Details Page
* `/booking/:service_id` → Booking Page (Protected)
* `/my-bookings` → User Bookings Page (Protected)
* `*` → 404 Not Found

---

## 🧪 Environment Variables

All sensitive information is stored securely using environment variables.

### Client (.env)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Server (.env)

```
PORT=5000
MONGO_URI=
EMAIL_USER=
EMAIL_PASS=
```

---

## 🛠️ Setup & Installation

### Clone Repository

```
git clone https://github.com/your-username/care-connect.git
cd care-connect
```

---

### Client Setup

```
cd client
npm install
npm run dev
```

---

### Server Setup

```
cd server
npm install
npm run start
```

---

## 📬 Email Feature

After a successful booking, the system sends an **invoice email** to the user automatically.

---

## 📱 Responsive Design

The application is fully optimized for:

* Mobile
* Tablet
* Desktop

---

## 🎯 Project Goal

The goal of Care Connect is to make caregiving:

✔ Easy
✔ Secure
✔ Trusted
✔ Accessible

for every family.

---

## 👨‍💻 Author

Developed by **Mahmuda Afroz Oishi**

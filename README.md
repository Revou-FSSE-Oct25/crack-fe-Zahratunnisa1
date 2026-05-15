# ✈️ DestinaYo — Flight Booking Web Application

DestinaYo is a modern online flight booking web application built with **Next.js**, **NestJS**, **Prisma**, and **PostgreSQL**.

Users can search flights, book tickets, manage bookings, and admins can monitor customer reservations through a dedicated admin dashboard.

---

# 🌐 Features

## 👤 Authentication

* User Login
* User Sign Up
* JWT Authentication
* Role-based Authorization
* Admin & Customer Roles

---

## ✈️ Flight Features

* Browse available flights
* Flight detail page
* Flight search
* Booking system
* Passenger data input
* Booking history
* Cancel booking

---

## 🛠️ Admin Features

* View all customer bookings
* View booking passengers
* Accept booking
* Reject booking
* Delete booking
* Monitor booking status

---

# 🧰 Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* ShadCN UI

## Backend

* NestJS
* Prisma ORM
* JWT Authentication
* PostgreSQL

---

# 📁 Project Structure

```bash
flight-booking-frontend/
flight-booking-backend/
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/Revou-FSSE-Oct25/crack-be-Zahratunnisa1.git
git clone https://github.com/Revou-FSSE-Oct25/crack-fe-Zahratunnisa1.git
```

---

# ⚙️ Backend Setup

## Go to backend folder

```bash
cd flight-booking-backend
```

## Install dependencies

```bash
npm install
```

## Setup environment variables

Create `.env`

```env
DATABASE_URL="postgresql://YOUR_DATABASE_URL"
JWT_SECRET="SECRET_KEY"
```

## Run Prisma Migration

```bash
npx prisma migrate dev
```

## Run Backend Server

```bash
npm run start:dev
```

Backend will run on:

```bash
http://localhost:3000
```

---

# 💻 Frontend Setup

## Go to frontend folder

```bash
cd flight-booking-frontend
```

## Install dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:3001
```

---

# 🔑 Demo Accounts

## Admin Account

```txt
Email: admin@gmail.com
Password: ********
```

## Customer Account

```txt
Email: zahra@gmail.com
Password: ********
```

---

# 🗄️ Database

This project uses PostgreSQL with Prisma ORM.

Main models:

* User
* Flight
* Booking
* Passenger

---

# 📸 Screenshots


# 🌍 Deployment

## Frontend Deployment

Will be deployed using:

* Railway

Frontend URL:

## Backend Deployment

Will be deployed using:

* Vercel

Backend URL:



# 📚 API Endpoints

## Authentication

```http
POST /auth/login
POST /auth/register
```

---

## Flights

```http
GET /flights
GET /flights/:id
```

---

## Bookings

```http
POST /bookings
GET /bookings/my
DELETE /bookings/:id
PATCH /bookings/:id/pay
```

---

## Admin

```http
GET /bookings/admin/all
PATCH /bookings/admin/:id/confirm
PATCH /bookings/admin/:id/reject
DELETE /bookings/admin/:id
```

---

# 🎨 UI Design

DestinaYo uses:

* Purple modern theme
* Glassmorphism UI
* Responsive layout
* Clean airline-inspired interface

---

# 🔒 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Protected routes use Authorization header
5. RoleGuard protects admin routes

---

# 📌 Future Improvements

* Payment Gateway Integration
* Email Notifications
* Flight Schedule Management
* Seat Selection
* Upload Passenger Documents
* Real Airline API Integration
* Dark Mode
* Mobile Optimization

---

# 👩‍💻 Author

Created by Zahratunnisa (2026) ✨

---

# 📄 License

This project is for educational and portfolio purposes.

# Inventra

## Inventory and Sales Management Platform

Live Application:
https://inventra-nhy9.vercel.app

GitHub Repository:
https://github.com/namrathacn/Inventra

Backend API:
(Add your Render backend URL here)


---

## Overview

Inventra is a full-stack inventory and sales management application designed to help small and medium businesses efficiently manage products, orders, staff, and business operations.

The platform provides secure authentication, role-based access control, inventory tracking, sales analytics, and reporting features through a modern SaaS dashboard interface.

---

# Features

## Authentication

- Email and password authentication
- Google authentication
- Firebase Authentication integration
- Secure user sessions
- Admin and Staff role-based access


## Inventory Management

- Add new products
- Update product details
- Delete products
- Track stock levels
- Monitor low-stock products
- Manage product information


## Order Management

- Create and manage orders
- Update order status
- Track order history
- Automatically update inventory after sales


## Dashboard Analytics

- Revenue overview
- Sales performance tracking
- Total orders analysis
- Product statistics
- Top-selling products
- Inventory insights


## Staff Management

- Add staff members
- Manage business users
- Role-based permissions
- Business access management


## Reports

- Generate sales reports
- Export business data
- Analyze inventory and sales performance


---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- React Icons


## Backend

- Node.js
- Express.js
- REST API


## Database and Authentication

- Firebase Firestore
- Firebase Authentication


## Deployment

Frontend:
https://vercel.com

Backend:
https://render.com


---

# Project Structure

```
Inventra
│
├── client
│   │
│   ├── public
│   │   └── favicon.svg
│   │
│   ├── src
│   │   │
│   │   ├── assets
│   │   │
│   │   ├── components
│   │   │   ├── auth
│   │   │   ├── dashboard
│   │   │   ├── layout
│   │   │   └── common
│   │   │
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── DataContext.jsx
│   │   │   └── CurrencyContext.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Login
│   │   │   ├── Signup
│   │   │   ├── Dashboard
│   │   │   ├── Products
│   │   │   ├── Orders
│   │   │   ├── Reports
│   │   │   ├── Staff
│   │   │   └── Settings
│   │   │
│   │   ├── services
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
│
├── server
│   │
│   ├── routes
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── users.js
│   │
│   ├── firebase
│   │   └── admin.js
│   │
│   ├── middleware
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/namrathacn/Inventra.git
```

Move into project:

```bash
cd Inventra
```

---

# Frontend Setup

Navigate to client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
VITE_API_URL=your_backend_url

VITE_FIREBASE_API_KEY=your_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id
```

Run frontend:

```bash
npm run dev
```

---

# Backend Setup

Navigate to server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=
```

Start backend:

```bash
npm start
```

---

# User Roles

## Admin

Admin users can:

- Manage products
- Manage orders
- View analytics
- Manage staff
- Access reports
- Control business settings


## Staff

Staff users can:

- View products
- Create orders
- Manage assigned operations


---

# Design

Inventra follows a modern SaaS dashboard design:

- Dark glassmorphism interface
- Responsive layouts
- Gradient branding
- Smooth animations
- Interactive analytics components


---

# Future Improvements

- AI-based inventory prediction
- Barcode scanning
- Automated notifications
- Mobile application
- Advanced analytics
- Multi-business support


---

# Developer

## Namratha C N

GitHub:
https://github.com/namrathacn
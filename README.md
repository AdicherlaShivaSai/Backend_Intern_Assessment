# User Management System (PERN Stack)

    🔗 **Live Frontend:** https://your-frontend-url  
    🔗 **Backend API:** https://your-backend-url  

### 🔑 Test Admin Credentials
    Email: admin@test.com  
    Password: Admin@123
---
A full-stack **User Management System** built using the **PERN stack (PostgreSQL, Express, React, Node.js)** with secure authentication, role-based access control (RBAC), and an admin dashboard.

This project was developed as part of a **Backend / Full-Stack Assignment** and demonstrates real-world authentication, authorization, and CRUD workflows.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Signup & Login using **JWT**
- Secure password hashing with **bcrypt**
- Protected routes using JWT middleware
- Role-based access control (**Admin / User**)

### 👤 User Features
- View own profile
- Update name & email
- Change password
- Logout
- Responsive dashboard UI

### 👑 Admin Features
- View all users (paginated)
- Activate / Deactivate users
- Admin-only protected APIs
- Admin-only UI navigation

### 🎨 Frontend
- Built with **React + Vite**
- Styled using **Tailwind CSS**
- Responsive navbar (desktop & mobile)
- Loading states & UX feedback

### 🗄️ Backend
- **Node.js + Express**
- **Neon PostgreSQL (serverless)**
- Secure REST APIs
- Clean MVC folder structure

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- @neondatabase/serverless
- JWT
- bcrypt

---

## 📂 Project Structure

### Backend

backend
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
└── server.js

### Frontend

frontend
└── src
    ├── api
    ├── components
    ├── pages
    └── App.jsx


---

## ⚙️ Environment Variables

Create a `.env` file in the **frontend** directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api

```
Create a `.env` file in the **backend** directory:

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<neon-host>/<db>?sslmode=require
JWT_SECRET=your_jwt_secret

```

---
## ▶️ How to Run Locally

### 1️⃣ Backend Setup
```
cd backend
npm install
npm run dev

```
Backend will run on:
```
http://localhost:5000
```

### 2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```
Frontend will run on:

```
http://localhost:5173
```
---
## 🔑 API Routes

### Auth

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

### User
| Method | Route                 | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/api/users/me`       | Get current user |
| PUT    | `/api/users/profile`  | Update profile   |
| PUT    | `/api/users/password` | Change password  |

### Admin (Admin-only)
| Method | Route                             | Description     |
| ------ | --------------------------------- | --------------- |
| GET    | `/api/admin/users`                | List users      |
| PATCH  | `/api/admin/users/:id/activate`   | Activate user   |
| PATCH  | `/api/admin/users/:id/deactivate` | Deactivate user |

---
## 🧪 Demo Flow (What to Test)

    1. Signup a new user

    2. Login → redirected to dashboard

    3. View profile & update details

    4. Change password & re-login

    5. Promote user to admin (DB)

    6. Access Admin Panel

    7. Activate / deactivate users

    8. Logout

---

## 🧠 Notes

- Initial API request may take a few seconds due to serverless cold start

- Subsequent requests are fast

- JWT is stored in localStorage

- Security is enforced on backend (not just UI)

---
## 📌 Conclusion

This project demonstrates:

- Secure authentication & authorization

- Clean backend architecture

- Real-world admin workflows

- Responsive and user-friendly UI

---
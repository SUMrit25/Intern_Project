# MERN Auth Dashboard

A full-stack authentication system built using the MERN stack with JWT-based authentication and a responsive dashboard.

---

##  Features

* User Registration & Login
* Secure Authentication using JWT (httpOnly cookies)
* Dashboard displaying user info
* Static data (Leads, Tasks, Users)
* Logout functionality
* Form validation using Zod
* Responsive UI

---

## 🛠 Tech Stack

**Frontend:**

* React (Vite)
* Axios
* Zod

**Backend:**

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
https://github.com/SUMrit25/Intern_Project.git
cd Intern_Project
```

---

### 2. Backend Setup

```
cd Backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Run backend:

```
npm run start
```

---

### 3. Frontend Setup

```
cd Frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

##  API Endpoints

* POST `/api/v1/users/register`
* POST `/api/v1/users/login`
* GET `/api/v1/users/getMe`
* GET `/api/v1/users/logout`

---

##  Notes

* Uses httpOnly cookies for secure authentication
* Ensure CORS is properly configured

---


## 👨‍💻 Author

Sumrit

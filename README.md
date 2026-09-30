# 🎓 MERN Student Management System (EduSphere)

A complete, full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** Student Management System built following the curriculum requirements in the MERN Stack Teaching Approach guide.

---

## 🌟 Key Features

1. **Dashboard & Analytics**:
   - Total Students enrolled
   - Active Courses offered (MCA, BCA, B.Tech, M.Tech, Data Science)
   - Real-time Course enrollment distribution with interactive click-to-filter
   - Average student age metric

2. **Full RESTful CRUD Operations**:
   - **Create**: Add new student with validation (`POST /students` or `POST /api/students`)
   - **Read**: View students in responsive Table or Card Grid view (`GET /students`)
   - **Update**: Modal form to edit student documents (`PUT /students/:id`)
   - **Delete**: Safe confirmation modal with instant optimistic UI update (`DELETE /students/:id`)

3. **Search & Course Filtering**:
   - Instant real-time search across student name, email, and program
   - Filter dropdown by academic program (MCA, BCA, B.Tech, etc.)

4. **Authentication & User Management**:
   - Student & Admin registration (`POST /api/auth/register`)
   - Secure login with JWT authentication (`POST /api/auth/login`)
   - 1-Click Demo autofill for rapid grading and demonstration

5. **MERN Architecture Teaching Modal**:
   - Interactive visual guide directly mapping the PDF diagrams:
     - React (Frontend / UI) ➔ Axios ➔ Express (Routing) ➔ Node (Runtime) ➔ Mongoose ➔ MongoDB (`collegeDB`)
     - College Office Analogy (Counter ➔ Reception ➔ Staff ➔ Register)
     - RESTful vs RESTless API comparison table

6. **Zero-Configuration Dual-Mode Database**:
   - Connects to local MongoDB at `mongodb://127.0.0.1:27017/collegeDB` (as detailed in PDF Page 7) or MongoDB Atlas URI.
   - Automatically initializes an in-memory database seeded with sample student data (including Rahul Sharma, MCA, 22) if local MongoDB service is not started.

---

## 📁 Project Architecture

```
mern/
├── package.json                         # Root runner with concurrently
├── README.md                            # Documentation & Quickstart
└── student-management/
    ├── backend/                         # Node.js + Express API
    │   ├── models/
    │   │   ├── Student.js               # Student Schema (name, email, course, age...)
    │   │   └── User.js                  # User Schema (Auth & Passwords)
    │   ├── routes/
    │   │   ├── studentRoutes.js         # CRUD + Dashboard endpoints
    │   │   └── authRoutes.js            # Register & Login endpoints
    │   ├── server.js                    # Express app & MongoDB connection
    │   ├── seed.js                      # Initial database records
    │   └── package.json
    └── frontend/                        # React (Vite) + Tailwind CSS
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.jsx           # Header & Navigation
        │   │   ├── DashboardStats.jsx   # Metrics & Course distribution
        │   │   ├── StudentList.jsx      # Table/Grid with search & filter
        │   │   ├── StudentModal.jsx     # Add & Edit modal
        │   │   ├── DeleteModal.jsx      # Delete confirmation
        │   │   ├── AuthModal.jsx        # Login & Register modal
        │   │   ├── ArchitectureModal.jsx# MERN architecture guide
        │   │   └── Toast.jsx            # Action feedback alerts
        │   ├── api.js                   # Axios HTTP Client
        │   ├── App.jsx                  # Main Application Component
        │   └── index.css                # Tailwind CSS & custom styling
        ├── vite.config.js               # Proxy setup to port 5000
        └── package.json
```

---

## 🚀 Quick Start Guide

### 1. Launch Frontend & Backend Simultaneously

From the root `mern` directory:

```bash
npm start
# or
npm run dev
```

This will concurrently start:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students` or `/api/students` | Get all students (supports `?search=` and `?course=`) |
| `POST` | `/students` or `/api/students` | Create a new student document |
| `GET` | `/students/:id` | Get single student by `_id` |
| `PUT` | `/students/:id` | Update an existing student by `_id` |
| `DELETE` | `/students/:id` | Delete student document by `_id` |
| `GET` | `/api/students/dashboard/stats` | Aggregate dashboard counts & distribution |
| `POST` | `/api/auth/register` | Register new admin or student account |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token |

---

## 🔑 Demo Credentials

- **Admin Account**:
  - Email: `admin@college.edu`
  - Password: `admin123`
- **Student Account**:
  - Email: `rahul@gmail.com`
  - Password: `student123`
*(Both can also be autofilled using the buttons in the Login modal)*

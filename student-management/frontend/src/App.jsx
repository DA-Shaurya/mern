import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import DashboardStats from "./components/DashboardStats";
import StudentList from "./components/StudentList";
import StudentModal from "./components/StudentModal";
import DeleteModal from "./components/DeleteModal";
import AuthModal from "./components/AuthModal";
import ArchitectureModal from "./components/ArchitectureModal";
import Toast from "./components/Toast";
import {
  fetchStudents,
  fetchDashboardStats,
  createStudent,
  updateStudent,
  deleteStudent,
  loginUser,
  registerUser,
  getCurrentUser,
} from "./api";

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    avgAge: 0,
    courseDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Auth & Toast state
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Check existing session
  useEffect(() => {
    const token = localStorage.getItem("mern_token");
    if (token) {
      getCurrentUser()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("mern_token");
          setUser(null);
        });
    }
  }, []);

  // Fetch Students & Stats
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [studentsRes, statsRes] = await Promise.all([
        fetchStudents(searchTerm, selectedCourse),
        fetchDashboardStats(),
      ]);
      setStudents(studentsRes.data || []);
      setStats(statsRes.data || {});
    } catch (err) {
      console.error("Failed to load students data:", err);
      showToast("Failed to fetch records from backend server", "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCourse]);

  // Debounced load on search or filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadData]);

  // CRUD Handlers
  const handleSaveStudent = async (studentData) => {
    if (studentToEdit) {
      // UPDATE: PUT /students/:id
      const res = await updateStudent(studentToEdit._id, studentData);
      showToast(`Updated student "${res.data.name}" successfully!`);
    } else {
      // CREATE: POST /students
      const res = await createStudent(studentData);
      showToast(`Added student "${res.data.name}" successfully!`);
    }
    loadData();
  };

  const handleConfirmDelete = async (studentId) => {
    // DELETE: DELETE /students/:id
    await deleteStudent(studentId);
    showToast("Student deleted successfully!");
    loadData();
  };

  // Auth Handlers
  const handleLogin = async (credentials) => {
    const res = await loginUser(credentials);
    localStorage.setItem("mern_token", res.data.token);
    setUser(res.data);
    showToast(`Welcome back, ${res.data.name}!`);
  };

  const handleRegister = async (userData) => {
    const res = await registerUser(userData);
    localStorage.setItem("mern_token", res.data.token);
    setUser(res.data);
    showToast(`Account created! Logged in as ${res.data.name}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("mern_token");
    setUser(null);
    showToast("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Directory & Operations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage enrollments, inspect MongoDB records, and test RESTful CRUD APIs in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setStudentToEdit(null);
                setIsStudentModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              + Register Student
            </button>
          </div>
        </div>

        {/* Dashboard Analytics & Metrics */}
        <DashboardStats
          stats={stats}
          selectedCourse={selectedCourse}
          onSelectCourse={(course) => setSelectedCourse(course)}
        />

        {/* Student Records List with Search, Filter & Actions */}
        <StudentList
          students={students}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          onAddClick={() => {
            setStudentToEdit(null);
            setIsStudentModalOpen(true);
          }}
          onEditClick={(student) => {
            setStudentToEdit(student);
            setIsStudentModalOpen(true);
          }}
          onDeleteClick={(student) => {
            setStudentToDelete(student);
            setIsDeleteModalOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>
          MERN Student Management System • Developed with MongoDB, Express.js, React.js & Node.js
        </p>
      </footer>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setStudentToEdit(null);
        }}
        onSubmit={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Mail,
  BookOpen,
  Calendar,
  Phone,
  UserCheck,
  GraduationCap
} from "lucide-react";

export default function StudentList({
  students,
  loading,
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  const coursesList = ["All", "MCA", "BCA", "B.Tech", "M.Tech", "B.Sc CS", "Data Science"];

  const getCourseBadgeColor = (course) => {
    switch (course) {
      case "MCA":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "BCA":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "B.Tech":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "M.Tech":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Data Science":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Inactive":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "Graduated":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Top Controls Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search & Filter Group */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, email, or course..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Course Dropdown Filter */}
          <div className="relative min-w-[160px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
            >
              {coursesList.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Programs" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle & Add Button */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          {/* Grid / Table Toggle */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "table"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Add Student Button */}
          <button
            onClick={onAddClick}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="p-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-3 w-48 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && students.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No students found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {searchTerm || (selectedCourse && selectedCourse !== "All")
              ? "Try adjusting your search query or course filter."
              : "Get started by adding the first student document to MongoDB."}
          </p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Now</span>
          </button>
        </div>
      )}

      {/* Table View */}
      {!loading && students.length > 0 && viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Student</th>
                <th className="py-3.5 px-4">Course</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Contact</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Name & Avatar */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                        {student.name ? student.name.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCourseBadgeColor(
                        student.course
                      )}`}
                    >
                      {student.course}
                    </span>
                  </td>

                  {/* Age */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {student.age} yrs
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 hidden md:table-cell text-xs text-slate-500">
                    {student.phone || "—"}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                        student.status
                      )}`}
                    >
                      {student.status || "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onEditClick(student)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Student (PUT /students/:id)"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(student)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Student (DELETE /students/:id)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid Card View */}
      {!loading && students.length > 0 && viewMode === "grid" && (
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-slate-50/60 rounded-xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {student.name ? student.name.charAt(0).toUpperCase() : "S"}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCourseBadgeColor(
                      student.course
                    )}`}
                  >
                    {student.course}
                  </span>
                </div>

                <h4 className="font-bold text-slate-800 text-base mb-1">{student.name}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{student.email}</span>
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {student.age} yrs
                  </span>
                  {student.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end space-x-2 pt-3 mt-3 border-t border-slate-200/60">
                <button
                  onClick={() => onEditClick(student)}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => onDeleteClick(student)}
                  className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

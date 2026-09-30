import React from "react";
import { Users, GraduationCap, Calendar, Award, TrendingUp } from "lucide-react";

export default function DashboardStats({ stats, selectedCourse, onSelectCourse }) {
  const { totalStudents = 0, totalCourses = 0, avgAge = 0, courseDistribution = [] } = stats || {};

  return (
    <div className="space-y-4">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Students
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalStudents}</h3>
              <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Active Enrolled
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Courses Offered
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalCourses}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                MCA, BCA, B.Tech, etc.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Average Age */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Average Student Age
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{avgAge || "—"} yrs</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Campus Demographic
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                MongoDB Database
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-1">collegeDB</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-700">Connected</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Breakdown Bar */}
      {courseDistribution && courseDistribution.length > 0 && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                Course Distribution (Click to filter)
              </h4>
              <p className="text-xs text-slate-500">
                Live breakdown of student enrollments by academic program
              </p>
            </div>
            {selectedCourse && selectedCourse !== "All" && (
              <button
                onClick={() => onSelectCourse("All")}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 underline self-start sm:self-auto"
              >
                Clear filter ({selectedCourse})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSelectCourse("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !selectedCourse || selectedCourse === "All"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Courses ({totalStudents})
            </button>
            {courseDistribution.map((item) => {
              const isSelected = selectedCourse === item._id;
              const pct = totalStudents > 0 ? Math.round((item.count / totalStudents) * 100) : 0;
              return (
                <button
                  key={item._id}
                  onClick={() => onSelectCourse(isSelected ? "All" : item._id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-semibold">{item._id}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-600"
                    }`}
                  >
                    {item.count} ({pct}%)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

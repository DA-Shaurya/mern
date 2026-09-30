import React, { useState } from "react";
import { X, ArrowRight, Database, Server, Cpu, Globe, CheckCircle2, BookOpen } from "lucide-react";

export default function ArchitectureModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("flow"); // 'flow', 'analogy', 'rest'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700">
                Curriculum Reference
              </span>
              <h3 className="text-lg font-bold text-slate-800">
                MERN Stack Architecture & Workflow
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive demonstration of the concepts from the MERN Teaching Approach
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/40">
          <button
            onClick={() => setActiveTab("flow")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "flow"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            1. Request-Response Flow
          </button>
          <button
            onClick={() => setActiveTab("analogy")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "analogy"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            2. College Office Analogy
          </button>
          <button
            onClick={() => setActiveTab("rest")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "rest"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            3. RESTful API Architecture
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* TAB 1: Request-Response Flow */}
          {activeTab === "flow" && (
            <div className="space-y-6">
              {/* Stack Component Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase mb-1">
                    <Globe className="w-4 h-4" /> React.js
                  </div>
                  <p className="text-xs text-slate-600">Frontend / UI</p>
                  <p className="text-[11px] text-slate-400 mt-1">Collects input & renders DOM</p>
                </div>

                <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase mb-1">
                    <Server className="w-4 h-4" /> Express.js
                  </div>
                  <p className="text-xs text-slate-600">API Framework</p>
                  <p className="text-[11px] text-slate-400 mt-1">Handles routes & middleware</p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-1">
                    <Cpu className="w-4 h-4" /> Node.js
                  </div>
                  <p className="text-xs text-slate-600">Backend Runtime</p>
                  <p className="text-[11px] text-slate-400 mt-1">Executes JS on the server</p>
                </div>

                <div className="p-3.5 rounded-xl border border-green-200 bg-green-50/50">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase mb-1">
                    <Database className="w-4 h-4" /> MongoDB
                  </div>
                  <p className="text-xs text-slate-600">Document Database</p>
                  <p className="text-[11px] text-slate-400 mt-1">Stores JSON-like BSON docs</p>
                </div>
              </div>

              {/* Step by step flow */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Life of a Request: Adding Student "Rahul Sharma"
                </h4>
                <div className="space-y-3">
                  {[
                    { step: "1", title: "React Form", desc: "User inputs { name: 'Rahul Sharma', email: 'rahul@gmail.com', course: 'MCA', age: 22 }" },
                    { step: "2", title: "Axios Client", desc: "Sends HTTP POST /students with JSON payload" },
                    { step: "3", title: "Express.js Router", desc: "app.post('/students') catches the route, express.json() parses body" },
                    { step: "4", title: "Node.js + Mongoose", desc: "const student = new Student(req.body); await student.save();" },
                    { step: "5", title: "MongoDB (collegeDB)", desc: "Stores document in students collection and generates _id" },
                    { step: "6", title: "Express Response", desc: "Sends back res.status(201).json(student)" },
                    { step: "7", title: "React State Update", desc: "UI appends student and updates UI reactively without page reload" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start space-x-3 text-xs">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {s.step}
                      </span>
                      <div>
                        <span className="font-bold text-slate-800">{s.title}:</span>{" "}
                        <span className="text-slate-600">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-medium">
                💡 <span className="font-bold">One-line explanation:</span> React collects the data, Express handles the API request, Node runs the backend, and MongoDB stores the data.
              </div>
            </div>
          )}

          {/* TAB 2: College Analogy */}
          {activeTab === "analogy" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                A simple classroom mental model comparing MERN architecture to a college administrative office:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-1">React.js</div>
                  <h4 className="font-bold text-slate-800 text-sm">Student-facing form / counter</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Where the student fills out admission forms, views grades, and interacts with the college.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-1">Express.js</div>
                  <h4 className="font-bold text-slate-800 text-sm">Office Reception & Routing</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Directs the student to the right counter (GET, POST, PUT, DELETE) based on their request.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-1">Node.js</div>
                  <h4 className="font-bold text-slate-800 text-sm">Office Staff</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Processes the forms, verifies documents, and handles the operational business logic.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-1">MongoDB</div>
                  <h4 className="font-bold text-slate-800 text-sm">College Database / Register</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Secure archive filing cabinet where all permanent student records and documents are stored.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESTful API Principles */}
          {activeTab === "rest" && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Feature</th>
                      <th className="p-2.5">RESTful API (Used in this App)</th>
                      <th className="p-2.5">RESTless API (e.g. SOAP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">Architecture</td>
                      <td className="p-2.5 text-slate-600">Follows REST state transfer principles</td>
                      <td className="p-2.5 text-slate-600">Does not follow REST principles</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">Protocol</td>
                      <td className="p-2.5 text-slate-600">HTTP Methods (GET, POST, PUT, DELETE)</td>
                      <td className="p-2.5 text-slate-600">Often uses SOAP or custom protocols</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">Data Format</td>
                      <td className="p-2.5 text-slate-600">JSON (lightweight, native to JS)</td>
                      <td className="p-2.5 text-slate-600">Primarily XML</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">Statelessness</td>
                      <td className="p-2.5 text-slate-600">Fully stateless; every request is independent</td>
                      <td className="p-2.5 text-slate-600">May maintain state or session handling</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-slate-800">Use Cases</td>
                      <td className="p-2.5 text-slate-600">Ideal for CRUD operations & modern web apps</td>
                      <td className="p-2.5 text-slate-600">Enterprise legacy banking/healthcare</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Student Management System • Mini Project Module 7</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

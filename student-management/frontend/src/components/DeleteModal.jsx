import React, { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, student }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !student) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await onConfirm(student._id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scale-in">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Delete Student Record?
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Are you sure you want to delete <span className="font-semibold text-slate-800">{student.name}</span> ({student.email})? This action sends a <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-rose-600">DELETE /students/:id</code> request to the API and cannot be undone.
          </p>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 disabled:opacity-50 rounded-xl shadow-md shadow-rose-200 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>{loading ? "Deleting..." : "Confirm Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

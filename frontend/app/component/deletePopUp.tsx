import { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onCancel} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-gray-900 border border-red-500/50 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/20 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          {/* Title & Message */}
          <h2 className="text-2xl font-bold text-white text-center mb-3">
            Are you sure?
          </h2>
          <p className="text-gray-300 text-center text-lg leading-relaxed">
            This action will <span className="text-red-400 font-semibold">permanently delete</span> the file.
            <br />
            This cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onCancel}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

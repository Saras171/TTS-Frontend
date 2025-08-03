// File: src/components/dashboard/DeleteModal.jsx

// UI Component Imports
import { Button } from '@/components/ui/button';

// ----------------------------
// DeleteModal Component
// ----------------------------
// Reusable confirmation modal that appears when the user attempts to delete an audio file.
// Offers a clean UI for confirm/cancel actions and ensures accidental deletions are avoided.
export default function DeleteModal({ show, onCancel, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Do you really want to delete this file? <br />
          <strong>This action is not reversible.</strong>
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} className="bg-gray-300 text-gray-700 hover:bg-gray-400 w-1/2">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700 w-1/2">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

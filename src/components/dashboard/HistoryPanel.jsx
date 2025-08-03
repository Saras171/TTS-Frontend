// File: src/components/dashboard/HistoryPanel.jsx

// NPM + Icon Imports
import { AnimatePresence, motion } from 'framer-motion';
import { Trash } from 'lucide-react';

// ----------------------------
// HistoryPanel Component
// ----------------------------
// Displays previously generated audio files.
// Includes support for animation, playback, and individual deletion.
export default function HistoryPanel({ historyVisible, history, historyRef, handleDeleteClick }) {
  if (!historyVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={historyRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-6 md:mt-0 md:ml-6 bg-white rounded-xl shadow-md w-full md:w-[350px] max-h-[80vh] overflow-y-auto p-4"
      >
        <h3 className="text-lg font-semibold mb-2">Audio History</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500">No audio history found.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item) =>
              item?.filename ? (
                <li key={item.id} className="border p-2 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800 truncate">{item.filename}</p>
                  {item.text && (
                    <p className="text-xs text-gray-600 italic mt-1 truncate">"{item.text.slice(0, 100)}..."</p>
                  )}
                  <audio controls src={item.audio_url} className="w-full mt-2 rounded" />
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                    title="Delete audio"
                  >
                    <Trash className="cursor-pointer w-5 h-5" />
                  </button>
                </li>
              ) : null
            )}
          </ul>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

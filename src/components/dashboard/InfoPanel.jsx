// File: src/components/dashboard/InfoPanel.jsx

//NPM Package import
import { motion } from 'framer-motion';



// ----------------------------
// InfoPanel Component
// ----------------------------
// Welcomes the logged-in user with a personalized greeting and animated branding.
// Creates a visually appealing left-side panel on larger screens.
export default function InfoPanel({ user }) {
  return (
    <div className="w-full md:w-2/5 p-6 md:p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-left">
        Welcome {user?.name}
      </h1>
      <motion.img
        src={'/images/logo.jpeg'}
        alt="TTS Logo"
        className="w-20 h-20 md:w-24 md:h-24 mb-4 rounded-full mx-auto logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0 }}
      />
      <motion.p
        className="text-sm md:text-lg text-center md:text-left"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3 }}
      >
        Easily convert text into speech with various voice options.
      </motion.p>
    </div>
  );
}

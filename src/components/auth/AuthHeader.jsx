// File: src/components/auth/AuthHeader.jsx

// NPM Package imported
import { motion } from 'framer-motion';



// AuthHeader renders the branding section for login/signup pages,
// including logo, animated title, and a short description.
export default function AuthHeader() {
  return (
    <>
      <motion.img
        src={'/images/logo.jpeg'}
        alt="Logo"
        className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-full mx-auto logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Text to Speech Converter</h1>
      <p className="text-sm md:text-lg">
        Welcome! Convert your text into natural-sounding speech with various voice options.
      </p>
    </>
  );
}

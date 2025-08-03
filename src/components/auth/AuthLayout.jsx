// File: src/components/auth/AuthLayout.jsx

// AuthLayout provides a responsive layout for authentication pages
// It organizes left (branding) and right (form) sections side-by-side
// on larger screens, and stacks them vertically on mobile.
export default function AuthLayout({ leftContent, rightContent }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-tts-background p-4">
      <div className="w-full max-w-4xl p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between transition-all duration-500 ease-in-out">
              {/* Branding / Logo Section */}
        <div className="w-full md:w-1/2 p-8 text-center">
          {leftContent}
        </div>

        
        {/* Authentication Form Section */}
        <div className="md:w-1/2 w-full p-4 bg-gray-200 text-gray-700 rounded-3xl shadow-md mt-4 md:mt-0">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

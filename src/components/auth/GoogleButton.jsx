// src/components/auth/GoogleButton.jsx

// NPM Packages and Icons imported
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

// GoogleButton renders a custom-styled button for initiating Google OAuth login
// Shows loading animation while redirecting to Google login flow
export default function GoogleButton({ loading, onClick }) {
  return (
    <Button
      onClick={onClick}
      type="button"
      disabled={loading}
      className="w-full py-3 bg-white text-black border border-gray-300 rounded-xl hover:bg-gray-100 flex justify-center items-center gap-2 shadow-md transition duration-300"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-5 h-5" />
          Redirecting...
        </>
      ) : (
        <>
          <FcGoogle size={24} />
          <span className="font-semibold text-black">Sign in with Google</span>
        </>
      )}
    </Button>
  );
}

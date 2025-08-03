// src/pages/Login.jsx
// NPM Packages imported
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
// API and Context utilities imported
import { loginUser, googleLoginRedirect } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
// Reusable UI Components imported
import { Button } from '@/components/ui/button';
import AuthLayout from '../components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import GoogleButton from '@/components/auth/GoogleButton';
import AuthInput from '@/components/auth/AuthInput';

// Login component handles user authentication using email/password or Google OAuth
export default function Login() {
    // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { checkAuth } = useAuth(); // Fetch session status
  const navigate = useNavigate(); // Route navigation

  // Handle form-based login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser({ email, password });
      await checkAuth();  // Refresh auth context
      navigate('/dashboard');  // Redirect on success
             toast.success("Logged in successfully!");

    } catch (err) {
    toast.error(err.response?.data?.message || "Login failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

    // Handle Google login
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await googleLoginRedirect(); // Redirects to Google OAuth

    } catch {
      toast.error("Google Sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

    // Right-side login form UI
  const rightContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <AuthInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          type="submit"
          disabled={loading}
          className=" w-full py-3 bg-purple-600 hover:bg-purple-700 flex justify-center items-center gap-2"
        >
          {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Logging In...</> : 'Login'}
        </Button>
      </form>
      <div className="my-3 flex justify-center items-center gap-2">
        <span className="text-gray-600">or</span>
      </div>
      <GoogleButton loading={googleLoading} onClick={handleGoogleSignIn} />
      <p className="cursor-pointer mt-3 text-gray-600 text-center">
        Don&apos;t have an account? <Link to="/signup" className="text-purple-600 hover:underline">Sign Up</Link>
      </p>
    </>
  );
  // Return Auth Layout with header and form
  return <AuthLayout leftContent={<AuthHeader />} rightContent={rightContent} />;
}


// src/pages/Signup.jsx
// NPM Packages imported
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

// API and Context utilities imported
import { signupUser, googleLoginRedirect } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

// Reusable UI Components imported
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import GoogleButton from '@/components/auth/GoogleButton';
import AuthInput from '@/components/auth/AuthInput';

// Signup component handles user registration via email/password or Google
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });  // Form state
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const { checkAuth } = useAuth();
  const navigate = useNavigate();

    // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signupUser(form);
      await checkAuth();
      navigate('/dashboard');
          toast.success("Signup successful! Welcome aboard.");
    } catch (err) {
          const msg = err.response?.data?.message || "Signup failed.";
      setError(msg); 
        toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

    // Handle Google signup redirect
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await googleLoginRedirect();
    } catch {
    toast.error("Google Sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

    // Right-side signup form UI
  const rightContent = (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AuthInput type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <AuthInput type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <AuthInput type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className=" w-full py-3 bg-green-600 hover:bg-green-700 flex justify-center items-center gap-2"
        >
          {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Signing Up...</> : 'Sign Up'}
        </Button>
      </form>
      <div className=" my-3 flex justify-center items-center gap-2">
        <span className="text-gray-600">or</span>
      </div>
      <GoogleButton loading={googleLoading} onClick={handleGoogleSignIn} />
      <p className="cursor-pointer mt-3 text-gray-600 text-center">
        Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
      </p>
    </>
  );

  // Return Auth Layout with header and form
  return <AuthLayout leftContent={<AuthHeader />} rightContent={rightContent} />;
}


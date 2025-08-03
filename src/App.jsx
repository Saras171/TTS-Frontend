// File: src/App.jsx

// React Router for client-side routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Toast notifications for user feedback
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages and Context
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Redirects users based on their authentication state.
// If logged in → Dashboard, otherwise → Login page.
function RedirectLogic() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />;
}

// Main App Component with routing and providers
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route – checks auth and redirects accordingly */}
          <Route path="/" element={<RedirectLogic />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

           {/* Protected route  */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        {/* Global Toast Notification */}
      </Router>
    </AuthProvider>
  );
}

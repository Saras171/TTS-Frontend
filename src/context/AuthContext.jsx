// File: src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'; //NPM Packages imported
import {checkAuthStatus} from '../utils/api'; // Required Code files Imported

 
// Create the authentication context and export a custom hook for consuming it
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


// AuthProvider manages user session and authentication state globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Stores user details
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks auth state

  
  // Verifies the current session with the backend
  const checkAuth = async () => {
    try {
      const res = await checkAuthStatus();

            // If user is authenticated, update context state
      if (res.data.isAuthenticated) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      } else {
             // Clear context state if not authenticated
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
            // Fail-safe for error scenarios
      setIsAuthenticated(false);
    }
  };

    // Run auth check on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

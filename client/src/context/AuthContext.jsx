import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // are we still checking?

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await axios.get(`${API_URL}/api/me`, { withCredentials: true });
        setUser({ username: res.data.username });
      } catch {
        setUser(null); // not logged in — totally normal, not an error to worry about
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
    // We'll also tell the backend to destroy the session (built below)
    axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const setAuthUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const register = async (formData) => {
    try {
      const { data: res } = await axios.post(`${API_URL}/api/auth/register`, formData);
      setPendingEmail(res.email);
      return { success: true, message: res.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const verifyEmail = async (otp) => {
    try {
      const { data: res } = await axios.post(`${API_URL}/api/auth/verify-email`, {
        email: pendingEmail,
        otp
      });
      setAuthUser(res);
      setPendingEmail(null);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Verification failed' };
    }
  };

  const resendOTP = async () => {
    try {
      const { data: res } = await axios.post(`${API_URL}/api/auth/resend-otp`, { email: pendingEmail });
      return { success: true, message: res.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to resend' };
    }
  };

  const login = async (loginId, password) => {
    try {
      const { data: res } = await axios.post(`${API_URL}/api/auth/login`, { loginId, password });
      setAuthUser(res);
      return { success: true, role: res.role };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setAuthUser(null);
    setPendingEmail(null);
  };

  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, loading, 
      register, verifyEmail, resendOTP, pendingEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
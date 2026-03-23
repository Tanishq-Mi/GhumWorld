import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle network errors
      if (!error.response) {
        return {
          success: false,
          message: 'Cannot connect to server. Please make sure the backend is running on port 5000.'
        };
      }
      
      // Handle specific error messages from backend
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/signup', { name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle network errors
      if (!error.response) {
        return {
          success: false,
          message: 'Cannot connect to server. Please make sure the backend is running on port 5000.'
        };
      }
      
      // Handle specific error messages from backend
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      return {
        success: false,
        message: errorMessage
      };
    }
  };
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  navigate('/', { replace: true }); // ✅ IMPORTANT
};


  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

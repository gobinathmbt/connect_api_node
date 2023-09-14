import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('authToken') || null);
  const isAuthenticated = !!authToken;
  const [sessionTimeout, setSessionTimeout] = useState(0);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3002/login', { username, password });

      const Timing = response.data.sessionTimeout;
      setSessionTimeout(Timing);

      const token = response.data.token;
      setAuthToken(token);
      
      sessionStorage.setItem('authToken', token);
      localStorage.setItem('sessionTimeout', Timing);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setAuthToken(null);
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('sessionTimeout');
  };

  useEffect(() => {
    const storedSessionTimeout = localStorage.getItem('sessionTimeout');
    if (storedSessionTimeout) {
      setSessionTimeout(parseInt(storedSessionTimeout));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && sessionTimeout > 0) {
      const timeout = setTimeout(() => {
        logout();
      }, sessionTimeout * 1000); // Convert sessionTimeout to milliseconds
      return () => clearTimeout(timeout);
    }
  }, [authToken, isAuthenticated, sessionTimeout]);

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

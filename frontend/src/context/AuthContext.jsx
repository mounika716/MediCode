import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hx_user');

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('hx_user');
        localStorage.removeItem('hx_token');
      }
    }

    setLoading(false);
  }, []);

  const persist = (data) => {
    localStorage.setItem('hx_token', data.token);

    const nextUser = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: data.avatar || '',
      college: data.college || '',
    };

    localStorage.setItem('hx_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const register = async (payload) => {
    const { data } = await API.post('/api/auth/register', {
      ...payload,
      name: String(payload.name || '').trim(),
      email: String(payload.email || '').trim().toLowerCase(),
    });

    // Do not save a token until verification and login are complete.
    return data;
  };

  const login = async (payload) => {
    const { data } = await API.post('/api/auth/login', {
      ...payload,
      email: String(payload.email || '').trim().toLowerCase(),
    });

    persist(data);
    return data;
  };

  const updateUser = (updates) => {
    setUser((previous) => {
      if (!previous) return previous;

      const next = { ...previous, ...updates };
      localStorage.setItem('hx_user', JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem('hx_token');
    localStorage.removeItem('hx_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }

  return context;
};
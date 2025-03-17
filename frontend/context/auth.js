// context/auth.js
'use client';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState({
    email:null,
    id:null,
    username:null
  });

  const login = async (accessToken) => { // Simplified for callback usage
    // If needed, fetch user data with the access token
    try {
      const { data } = await axios.get('https://juanpabloduarte.com/api/auth/me/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser({
        email: data.email,
        id: data.id,
        username: data.username,
      });
      router.push('/profile');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      logout();
    }
  };
  const logout = async () => {
    try {
      // 1. Retrieve tokens before clearing them
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      // 2. Check if tokens exist
      if (!accessToken || !refreshToken) {
        console.warn('No tokens found, proceeding with client-side logout');
      } else {
        // 3. Send logout request to backend with tokens
        await axios.post(
          'https://juanpabloduarte.com/api/auth/logout/', // Correct absolute URL
          { refresh: refreshToken }, // Send refresh token in body
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Send access token in header
            },
          }
        );
      }

      // 4. Clear tokens and user state after successful logout
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);

      // 5. Redirect to login page
      router.push('/login'); // Use router.push instead of window.location.href for Next.js
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      // Proceed with client-side logout even if backend fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      router.push('/login');
    }
  };
  // const logout = () => {

  //   // Clear tokens
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
    
  //   // Clear user state
  //   setUser(null);
    
  //   // Optional: Invalidate tokens on backend
  //   axios.post('/api/auth/logout/', 
  //   {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}` } 
  //   }).catch(console.error);
    
  //   // // Redirect to login
  //   // window.location.href = '/login';
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
  };


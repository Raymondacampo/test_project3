import { apiClient } from "./api";

export async function getValidToken() {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");
  
    if (!token || !refreshToken) {
      console.log("No token found, user needs to log in.");
      return null;
    }
  
    // ✅ Ensure this points to `/api/token/verify/`
    const { res } = await apiClient.post('token/verify/', {
      body: JSON.stringify({ token }),     
    });

    if (res.status !== 200) {
      console.log("Token expired! Trying to refresh...");
  
      // Token expired, refresh it
      const {refreshRes} = await apiClient.post('token/refresh/', {
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem("token", data.access);
        return data.access;
      } else {
        console.log("Refresh token invalid. User needs to log in.");
        return null;
      }
    }
  
    return token;
  }
  

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    console.log("No refresh token found, user already logged out.");
    return;
  }

  apiClient.post('logout/', {
    body: JSON.stringify({ refresh: refreshToken }),
  });

  // ✅ Clear tokens from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");

  console.log("User logged out successfully.");
  }

export function isAuthenticated() {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");  // ✅ Checks if user is logged in
  }
  return false;
}
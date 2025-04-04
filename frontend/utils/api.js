// utils/api.js
import axios from "axios";

const DEFAULT_API_URL = "http://localhost:8000/api";

export const getApiImgUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
  const mediaUrl = `${baseUrl}`;  // Add /media/ prefix
  console.log("Image Base URL:", mediaUrl);
  return mediaUrl;
};

export const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  return url;
};

export const buildApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${getApiUrl()}${cleanEndpoint}`;
  return fullUrl;
};

export const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
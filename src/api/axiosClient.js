import axios from 'axios';
import { useAuth } from '../auth/AuthProvider';

// plain instance plus a helper hook
export const apiClient = axios.create({
  baseURL: 'https://note-taking-app-back-end.onrender.com',
  timeout: 10000,
});

// Hook to get an instance with auth header attached
export const useAuthorizedClient = () => {
  const {accessToken} = useAuth();

  const client = axios.create({
    baseURL: apiClient.defaults.baseURL,
    timeout: apiClient.defaults.timeout,
  });

  client.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => Promise.reject(error),
  );

  return client;
};

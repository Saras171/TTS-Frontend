// File: src/utils/api.js

// Axios is used for making HTTP requests to the backend API
import axios from 'axios';


// Base configuration for all API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // API base URL from environment variable
  withCredentials: true, // Ensures cookies (e.g. sessions) are sent with requests
});

// ------------------ AUTH API CALLS ------------------
// Sends signup form data to the backend
export const signupUser = (form) => api.post('/auth/signup', form);

// Sends login credentials and initiates session
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Logs out the current user session
export const logoutUser = () => api.post('/auth/logout');

// Verifies if user is currently authenticated (via cookies/session)
export const checkAuthStatus = () => api.get('/auth/check');

// Initiates Google OAuth by redirecting to backend
export const googleLoginRedirect = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
};

// ------------------ TEXT TO SPEECH (TTS) API ------------------

// Sends text and options to backend to generate audio
export const generateTTS = (data) => api.post('/tts/generate', data);

// Retrieves the user's TTS history from the backend
export const getAudioHistory = () => api.get('/tts/history');

// Deletes a specific audio file by ID
export const deleteAudioFile = (id) => api.delete(`/tts/delete/${id}`);


// Default export (in case direct instance needed elsewhere)
export default api;


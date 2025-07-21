// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // ← will be http://localhost:5000/api in dev, your Render URL in prod
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach interceptors here for auth tokens, error handling, etc.
// client.interceptors.request.use(...)

export default client;

import axios from "axios";
export const baseURL = process.env.REACT_APP_API_URL || "https://javachatappbackend.onrender.com";
export const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

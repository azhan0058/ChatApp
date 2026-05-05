import axios from "axios";
export const baseURL = process.env.REACT_APP_API_URL || "https://super-waddle-7666w46vxqp2qpp-8080.app.github.dev";
export const httpClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

import axios from "axios";
 
export const axiosIntance = axios.create({
  baseURL: "http://localhost:5000/api",
  // withCredentials: true, // ✅ this sends Clerk cookies to backend
});

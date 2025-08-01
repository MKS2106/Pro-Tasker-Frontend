import axios from 'axios'
//Create and export axios instance
export const backendClient = axios.create({
    // Set the base URL for all backend API requests
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})
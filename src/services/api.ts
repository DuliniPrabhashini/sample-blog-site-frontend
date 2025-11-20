// axiosConfig
// apiService

import axios from "axios"

const api = axios.create({
  // baseURL: "http://localhost:5000/api/v1"
  baseURL: "https://sample-blog-site-be.vercel.app/api/v1",
})

// An interceptor is like a middleware for Axios requests and responses.
// It lets you intercept, modify, or analyze any API request or response before it goes out or comes back.

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register"]

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")

  const isPUblic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

  if (!isPUblic && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// api.interceptors.response

export default api

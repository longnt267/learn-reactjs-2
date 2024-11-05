// src/config/axios.js
import axios from 'axios'
import { toast } from 'react-toastify'

// Lấy base URL từ biến môi trường
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout'
  },
  users: {
    profile: '/users/profile',
    update: '/users/update'
  }
  // Thêm các endpoint khác tại đây
}

// Export instance và các method helper
export default {
  // GET request
  get: async (endpoint, config = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, config)
      return response
    } catch (error) {
      throw error
    }
  },

  // POST request
  post: async (endpoint, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, data, config)
      return response
    } catch (error) {
      throw error
    }
  },

  // PUT request
  put: async (endpoint, data = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(endpoint, data, config)
      return response
    } catch (error) {
      throw error
    }
  },

  // DELETE request
  delete: async (endpoint, config = {}) => {
    try {
      const response = await axiosInstance.delete(endpoint, config)
      return response
    } catch (error) {
      throw error
    }
  },

  // Upload file
  upload: async (endpoint, file, onUploadProgress = () => {}) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onUploadProgress(percentCompleted)
        }
      })
      return response
    } catch (error) {
      throw error
    }
  }
}

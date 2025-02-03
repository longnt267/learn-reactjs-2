import api from './axios'

export const authApi = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  savePrize: async (file, prizeInfo) => {
    const formData = new FormData()
    formData.append('file', file) // Thêm ảnh vào FormData
    formData.append('prizeName', prizeInfo.option) // Thêm thông tin phần thưởng
    formData.forEach((value, key) => {
      console.log(key, value);
  });
    const response = await api.upload('/auth/save-prize', formData, (progress) => {
      console.log(`Uploading: ${progress}%`)
    })

    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: async () => {
    const response = await api.post('/auth/logout')
    localStorage.clear()
    return response.data
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  }
}

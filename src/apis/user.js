import api from './axios'

export const userApi = {
  getLogin: async (token) => {
    try {
      const response = await api.get('/user/get-login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
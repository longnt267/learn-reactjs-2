import api from './axios'

export const orderApi = {
  create: async (orderData, token) => {
    try {
      const response = await api.post('/order', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
  getListByUser: async (token, params = null) => {
    try {
      const response = await api.get('/order', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

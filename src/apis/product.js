import api from './axios'

export const productApi = {
  getList: async () => {
    const response = await api.get('/product-public')
    return response.data
  }
}

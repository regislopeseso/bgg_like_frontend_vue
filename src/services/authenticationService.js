import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const authenticationService = {
  async checkAuthenticationStatus() {
    const response = await axios.get(`${API_BASE_URL}/users/validatestatus`)
    return response.data
  },

  async signin(userEmail, userPassword) {
    const response = await axios.post(`${API_BASE_URL}/users/signin`, userEmail, userPassword)
    return response.data
  },

  async signout() {
    const response = await axios.post(`${API_BASE_URL}/users/signout`)
    return response.data
  },
}

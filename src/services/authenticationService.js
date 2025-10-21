import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const authenticationService = {
  async checkAuthenticationStatus() {
    const response = await axios.get(`${API_BASE_URL}/users/validatestatus`, {
      withCredentials: true
    })
    return response.data
  },

  async signup(name, userEmail, userPassword, userBirthDate, userGender = 1) {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, {
      Name: name,
      UserName: userEmail,
      Email: userEmail,        // Changed from UserEmail
      Password: userPassword,
      UserBirthDate: userBirthDate,
      Gender: userGender
    }, {
      withCredentials: true
    })
    return response.data
  },

  async signin(userEmail, userPassword) {
    const response = await axios.post(`${API_BASE_URL}/users/signin`, {
      Email: userEmail,
      Password: userPassword
    }, {
      withCredentials: true
    })
    return response.data
  },

  async signout() {
    const response = await axios.post(`${API_BASE_URL}/users/signoutuser`, {}, {
      withCredentials: true
    })

    console.log("Trying to sign out, response.data is:",response.data)
    return response.data
  },
}

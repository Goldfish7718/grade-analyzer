import axios from "axios"
import { API_URL } from "../App"

const requestVerification = async () => {
    try {
        const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
      }

      axios.defaults.headers.common['Authorization'] = token
      const res = await axios.get(`${API_URL}/auth/verify`)

      const { decode } = res.data
      return decode;
    } catch (err) {
      const error = err.response.data.message
      return error;
    }
  }

export default requestVerification
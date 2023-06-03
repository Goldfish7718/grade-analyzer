import axios from "axios"

const requestVerification = async () => {
    try {
        const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
      }

      axios.defaults.headers.common['Authorization'] = token
      const res = await axios.get('http://localhost:5000/auth/verify')

      const { decode } = res.data
      return decode;
    } catch (err) {
      const error = err.response.data.message
      return error;
    }
  }

export default requestVerification
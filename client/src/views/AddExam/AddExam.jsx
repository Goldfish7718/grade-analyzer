import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './AddExam.sass'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../App';

const AddExam = () => {
  
  const navigate = useNavigate();

  const [examName, setExamName] = useState('');
  const [decode, setDecode] = useState(null);

  const [error, setError] = useState('');
  const token = localStorage.getItem('token')

  const requestAddExam = async () => {    
    try {
      const { username } = decode
      const author = username

      await axios.post(`${API_URL}/exams/addexam`, {
        examName,
        author
      })

    } catch (err) {
      console.log(err);
    } 
  }

  const requestVerification = async () => {
    try {
      if (!token) navigate('/login')

      axios.defaults.headers.common['Authorization'] = token
      const res = await axios.get(`${API_URL}/auth/verify`)

      setDecode(res.data.decode)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const navigateDashboard = () => {
    navigate('/dashboard')
  }

  useEffect(() => {
    requestVerification()
  }, [])

  return (
    <>
      <div className="addexam">
        <Navbar suffix="> Dashboard > Add Exam" />
        <div className="addexam__title">
            <h1 className="addexam__title-text">Add Exam</h1>
        </div>
        <div className="addexam__input-panel">
            <input onChange={e => setExamName(e.target.value)} type="text" placeholder='Exam Name' className='addexam__input grey-input' />
            <button onClick={() => {requestAddExam(); navigateDashboard();}} className="addexam__button btn">Add Exam</button>
        </div>
      </div>
    </>
  )
}

export default AddExam
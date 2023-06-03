import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import coffeeTime from '../../assets/coffe time-6010.svg'
import './Dashboard.sass'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [decode, setDecode] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestVerification = async () => {
    try {
      if (!token) {
        navigate('/login')
      }

      axios.defaults.headers.common['Authorization'] = token
      const res = await axios.get('http://localhost:5000/auth/verify')

      setDecode(res.data.decode)
      console.log(res);
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const requestExamData = async () => {
    setLoading(true)

    try {
      const res = await axios.get(`http://localhost:5000/exams/${decode.id}/getexams`)
      setData(res.data.examData)
    } catch (err) {
      setError(err.response.data.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    requestVerification()
  }, [])

  useEffect(() => {
    requestExamData()
    console.log(data);
  }, [decode])
  
  return (
    <>
      <div className="dashboard">
        <Navbar suffix="> Dashboard" />
        <div className="dashboard__panel">

          {/* EMPTY COMPONENT */}
          {!loading && !error && data.length == 0 && (
            <>
              <div className="dashboard__image-container">
                <img src={coffeeTime} alt="" className="dashboard__image" />
              </div>
              <div className="dashboard__empty-message-container">
                <h1 className="dashboard__empty-message">No Exams Added Yet!</h1>
              </div>
            </>
          )}
        </div>

          {/* DATA COMPONENT */}
          {
            !loading && !error && data.length > 0 && (
            <>
              <div className="dashboard__exam">
                <div className="dashboard__exam__title">
                  <h1 className="dashboard__exam__title-text">Exam Data</h1>
                </div>

                <hr />
              
                {data.map(dataSet => (
                <>
                  <div key={dataSet._id} className="dashboard__exam__data" onClick={() => navigate('/dashboard/In-semester 2023')}>
                      <h3 className="dashboard__exam__name">{dataSet.examName}</h3>
                      <h3 className="dashboard__exam__percent">81.5%</h3>
                      <h3 className="dashboard__exam__total">81.5/100</h3>
                  </div>
                  <hr />
                </>
                ))}
              </div>
            </>
            
          )}

          {/* BUTTON COMPONENT */}
          {!error && !loading && (
            <div className="dashboard__button-container">
              <button className="dashboard__add-exam btn" onClick={() => navigate('/dashboard/add')}>Add exam</button>
            </div>
          )}

          {/* ERROR COMPONENT */}
          {error && (
            <div className="dashboard__error-message-container">
              <h1 className="dashboard__error-message">{error}</h1>
            </div>
          )}

          {/* LOADING COMPONENT */}
          {loading && (
            <div className="dashboard__error-message-container">
              <h1 className="dashboard__error-message">Loading...</h1>
            </div>
          )}
      </div>
    </>
  )
}

export default Dashboard
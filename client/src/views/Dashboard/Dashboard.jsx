import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import coffeeTime from '../../assets/coffe time-6010.svg'
import './Dashboard.sass'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()
  const [data, setData] = useState(true);

  return (
    <>
      <div className="dashboard">
        <Navbar suffix="> Dashboard" />
        <div className="dashboard__panel">

          {!data && 
            <>
              <div className="dashboard__image-container">
                <img src={coffeeTime} alt="" className="dashboard__image" />
              </div>
              <div className="dashboard__empty-message-container">
                <h1 className="dashboard__empty-message">No Exams Added Yet!</h1>
              </div>
            </>
          }
        </div>

          {
            data && 
            <>
              <div className="dashboard__exam">
                <div className="dashboard__exam__title">
                  <h1 className="dashboard__exam__title-text">Exam Data</h1>
                </div>

                <hr />

                <div className="dashboard__exam__data">
                    <h3 className="dashboard__exam__name">In-Semester 2023</h3>
                    <h3 className="dashboard__exam__percent">81.5%</h3>
                    <h3 className="dashboard__exam__total">81.5/100</h3>
                </div>
                <hr />
              </div>
            </>
          }

          <div className="dashboard__button-container">
            <button className="dashboard__add-exam btn" onClick={() => navigate('/dashboard/add')}>Add exam</button>
          </div>
      </div>
    </>
  )
}

export default Dashboard
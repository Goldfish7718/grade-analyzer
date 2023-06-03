import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.sass'

import studentGroup from '../../assets/student-group.svg'
import studying from '../../assets/studying.svg'
import statistics from '../../assets/statistics.svg'

import tools from '../../assets/tools.svg'
import graph from '../../assets/graph.svg'
import diamond from '../../assets/diamond.svg'

const Landing = () => {

  const navigate = useNavigate()

  return (
    <>
        <div className="landing">
          <div className="landing__header">
              <div className="landing__title">
                <h1 className="landing__title-text">Grade-Analyzer.co</h1>
              </div>

              <div className="landing__subtitle">
                <p className="landing__subtitle-text">A tool for students to keep track of their grades in a seem-less User Interface </p>
              </div>
          </div>

          <div className="landing__images">
            <img src={studentGroup} alt="" className="landing__image" />
            <img src={studying} alt="" className="landing__image" />
            <img src={statistics} alt="" className="landing__image" />
          </div>

          <div className="landing__mid-panel">
            <div className="landing__about">
              <p className="landing__about-text">Grade-analyzer is a tool that lets you, as a student input data such as subjects, marks etc. and analyze the by converting them into real time graphical presentation.</p>
            </div>

            <div className="landing__features">
              <div className="landing__feature-item">
                <img src={diamond} alt="" className="landing__feature-icon" />

                <div className="landing__feature-text">
                  <h1>Seem-less UI</h1>
                </div>
              </div>

              <div className="landing__feature-item">
                <img src={tools} alt="" className="landing__feature-icon" />

                <div className="landing__feature-text">
                  <h1>Easy to use</h1>
                </div>
              </div>

              <div className="landing__feature-item">
                <img src={graph} alt="" className="landing__feature-icon" />

                <div className="landing__feature-text">
                  <h1>Gaphical<br />Representation</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="landing__last-panel">
            <div className="landing__login">
              <h1 className="landing__login-title">So what are you waiting for? <br /><span>Let's make your life easy!</span></h1>
              <p className="landing__login-subtitle">Create an account today to start using Grade-Analyzer</p>

              <div className="landing__user-options">
                <button className="landing__user-options-item btn" onClick={() => navigate('/login')}>Log in</button>
                <button className="landing__user-options-item btn" onClick={() => navigate('/signup')}>Sign up</button>
                <button className="landing__user-options-item btn" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              </div>
            </div>

            <div className="blue-container"></div>
          </div>
        </div>
    </>
  )
}

export default Landing
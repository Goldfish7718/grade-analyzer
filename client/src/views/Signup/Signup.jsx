import React from 'react'
import './Signup.sass'

import linkTo from '../../assets/link-to.svg'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className="signup__title">
            <h1 className="signup__title-text">Grade-analyzer.co</h1>
        </div>
        <div className="signup__heading">
            <h1 className="signup__heading-text">Sign Up</h1>
        </div>
        <div className="signup">
            <div className="signup__panel">

                <div className="signup__inputs">
                    <input type="text" className="signup__input grey-input" placeholder='First Name' />
                    <input type="text" className="signup__input grey-input" placeholder='Last Name' />
                </div>
                <div className="signup__inputs">
                    <input type="text" className="signup__input grey-input" placeholder='Username' />
                    <input type="password" className="signup__input grey-input" placeholder='Password' />
                </div>

                <div className="signup__login-link">
                    <p className="signup__login-link-text"><span onClick={() => navigate('/login')}>Or Login</span></p>
                </div>

                <div className="signup__button-container">
                    <button className="signup__button btn">SIGN UP <img src={linkTo} alt="" /></button>
                </div>

            </div>
        </div>
    </>
  )
}

export default Signup
import React from 'react'
import './Login.sass'

import linkTo from '../../assets/link-to.svg'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    return (
    <>
        <div className="login__title">
            <h1 className="login__title-text">Grade-analyzer.co</h1>
        </div>
        <div className="login">
            <div className="login__panel">
                <div className="login__heading">
                    <h1 className="login__heading-text">Login</h1>
                </div>
                <div className="login__inputs">
                    <input type="text" className="login__input grey-input" placeholder='Username' />
                    <input type="password" className="login__input grey-input" placeholder='Password' />
                </div>
                <div className="login__signup-link">
                    <p className="login__signup-link-text">Not registered yet? <br /><span onClick={() => navigate('/signup')}>Sign Up Now!</span></p>
                </div>
                <div className="login__button-container">
                    <button className="login__button btn">LOGIN <img src={linkTo} alt="" /></button>
                </div>
            </div>
        </div>
        {/* <div className="blue-container"></div> */}
    </>
  )
}

export default Login
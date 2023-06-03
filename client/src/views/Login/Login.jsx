import React, { useState } from 'react'
import './Login.sass'

import linkTo from '../../assets/link-to.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const requestLogin = async e => {
        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                username,
                password
            })            
            const { token } = res.data
            localStorage.setItem('token', `Bearer ${token}`)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

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
                    <input onChange={e => setUsername(e.target.value)} type="text" className="login__input grey-input" placeholder='Username' />
                    <input onChange={e => setPassword(e.target.value)} type="password" className="login__input grey-input" placeholder='Password' />
                </div>

                {error && <h4 className="login__error error">{error}</h4>}

                <div className="login__signup-link">
                    <p className="login__signup-link-text">Not registered yet? <br /><span onClick={() => navigate('/signup')}>Sign Up Now!</span></p>
                </div>
                <div className="login__button-container">
                    <button onClick={requestLogin} className="login__button btn">LOGIN <img src={linkTo} alt="" /></button>
                </div>
            </div>
        </div>
        {/* <div className="blue-container"></div> */}
    </>
  )
}

export default Login
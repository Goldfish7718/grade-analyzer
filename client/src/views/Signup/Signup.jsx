import React, { useState } from 'react'
import './Signup.sass'

import linkTo from '../../assets/link-to.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const navigate = useNavigate()

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const requestSignup = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/auth/signup', {
                fName,
                lName,
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
        <div className="signup__title">
            <h1 className="signup__title-text">Grade-analyzer.co</h1>
        </div>
        <div className="signup__heading">
            <h1 className="signup__heading-text">Sign Up</h1>
        </div>
        <div className="signup">
            <div className="signup__panel">

                <div className="signup__inputs">
                    <input onChange={e => setFName(e.target.value)} type="text" className="signup__input grey-input" placeholder='First Name' />
                    <input onChange={e => setLName(e.target.value)} type="text" className="signup__input grey-input" placeholder='Last Name' />
                </div>
                <div className="signup__inputs">
                    <input onChange={e => setUsername(e.target.value)} type="text" className="signup__input grey-input" placeholder='Username' />
                    <input onChange={e => setPassword(e.target.value)} type="password" className="signup__input grey-input" placeholder='Password' />
                </div>

                {error && <h4 className="signup__error error">{error}</h4>}

                <div className="signup__login-link">
                    <p className="signup__login-link-text"><span onClick={() => navigate('/login')}>Or Login</span></p>
                </div>

                <div className="signup__button-container">
                    <button className="signup__button btn" onClick={requestSignup}>SIGN UP <img src={linkTo} alt="" /></button>
                </div>

            </div>
        </div>
    </>
  )
}

export default Signup
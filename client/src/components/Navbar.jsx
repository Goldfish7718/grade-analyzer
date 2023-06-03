import React from 'react'
import './Navbar.sass'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate()

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar">
                <h1 className="navbar__title-text"><span onClick={() => navigate('/')}>Grade-analyzer.co</span> <span>{props.suffix}</span></h1>
                <button onClick={logout} className="navbar__button btn">LOG OUT</button>
            </nav>
        </>
    )
}

export default Navbar
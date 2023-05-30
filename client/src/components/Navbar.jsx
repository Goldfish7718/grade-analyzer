import React from 'react'
import './Navbar.sass'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar">
                <h1 className="navbar__title-text"><span onClick={() => navigate('/')}>Grade-analyzer.co</span> <span>{props.suffix}</span></h1>
            </nav>
        </>
    )
}

export default Navbar
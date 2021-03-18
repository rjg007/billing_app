import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <div>
            <Link to='/' > Home </Link>
            <Link to='/about'> About Us </Link>
            <Link to='/login'> Login </Link>
            <Link to='/register'> Register </Link>
        </div>
    )
}

export default Footer

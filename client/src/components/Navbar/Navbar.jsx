import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/navbar-logo.svg'
import './navbar.style.scss'

const Navbar = () => {
  return (
   <div className="navbar">
    <div className="container">
        <img src={Logo} alt="Logo image" className="navbar__logo" />
        <div className="navbar__header">iCloud</div>
        <ul className="navbar__menu"></ul>
        <li className="navbar__link"><NavLink to='login'>Login</NavLink></li>
        <li className="navbar__link"><NavLink to='registration'>Registration</NavLink></li>
    </div>
   </div>
  )
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/navbar-logo.svg'
import './navbar.style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/UserService'


const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(UserService.logout())
    navigate('/', {replace: true})
  }

  return (
   <div className="navbar">
    <div className="container">
        <NavLink to='disk'><img src={Logo} alt="Logo image" className="navbar__logo" /></NavLink>
        <div className="navbar__header">iCloud</div>
        <ul className="navbar__menu"></ul>
        {!isAuth && <li className="navbar__link"><NavLink to='login'>Login</NavLink></li>}
        {!isAuth && <li className="navbar__link"><NavLink to='registration'>Registration</NavLink></li>}
        {isAuth && <li className="navbar__link"><a href="#" onClick={logoutHandler}>Logout</a></li>}
    </div>
   </div>
  )
}

export default Navbar
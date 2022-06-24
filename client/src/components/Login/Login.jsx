import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import './login.style.scss'
import UserService from '../../services/UserService'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const login = async (e) => {
    e.preventDefault()
    dispatch(UserService.login(email,  password, () => {
      navigate(from, {replace: true})
    }))
  }


  return (
    <div className="login">
        <div className="login__header">Login</div>
        <form className="login__form">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Type your password" />
            <Button onClick={login}>Login</Button>
        </form>
    </div>
  )
}

export default Login
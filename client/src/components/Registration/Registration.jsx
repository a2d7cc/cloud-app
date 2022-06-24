import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import './registration.style.scss'
import UserService from '../../services/UserService'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registration = async (e) => {
      e.preventDefault()
      dispatch(UserService.registration(email,  password, () => {
        navigate('/disk', {replace: true})
      }))
    }


  return (
    <div className="login">
        <div className="login__header">Registration</div>
        <form className="login__form">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Type your password" />
            <Button onClick={registration}>Login</Button>
        </form>
    </div>
  )
}

export default Registration
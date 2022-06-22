import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import './login.style.scss'

const Login = () => {
  return (
    <div className="login">
        <div className="login__header">Authorization</div>
        <form className="login__form">
            <Input type="email" placeholder="Type your email" />
            <Input type="password" placeholder="Type your password" />
            <Button>Login</Button>
        </form>
    </div>
  )
}

export default Login
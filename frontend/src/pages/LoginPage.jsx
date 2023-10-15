import React, { useContext, useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import classes from './LoginPage.module.css'
import loginIcon from '../assets/icons/login_icon.svg'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validateInputs = () => {
    let errors = {
      username: '',
      password: ''
    }
    let isValid = true
    if (formData.username.trim().length <= 0) {
      errors.username = 'Username is required'
      isValid = false
    }
    if (formData.password.trim().length <= 0) {
      errors.password = 'Password is required'
      isValid = false
    }
    setErrors(errors)
    return isValid
  }

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (validateInputs()) {
      loginUser(JSON.stringify(formData));
    } else {
      console.log('Something went wrong');
    }
  }

  return (
    <div className={classes['login-container']}>
      <img src={loginIcon} alt="Login Icon" className={classes['login-icon']} />
      <form onSubmit={submitForm} className={classes['login-form']}>
        <Input
          onChange={inputHandler}
          type="text"
          placeholder="Enter username"
          name="username"
          id="username"
          value={formData.username}
        />
        {errors.username && (
          <div className={classes.error}>{errors.username}</div>
        )}
        <Input
          onChange={inputHandler}
          type="password"
          placeholder="Enter password"
          name="password"
          id="password"
          value={formData.password}
        />
        {errors.password && (
          <div className={classes.error}>{errors.password}</div>
        )}
        <Button type='submit'>Login</Button>
      </form>
      <p className={classes['form-text']}>Dont have and account? <Link to='/register'>Click here!</Link></p>
    </div>
  );
};

export default LoginPage;

import React, { useContext, useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import AuthContext from '../context/AuthContext'
import classes from './RegisterPage.module.css'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const validateInputs = () => {
    let errors = {
      username: '',
      email: '',
      password: '',
      password2: '',
    }
    let isValid = true
    if (formData.username.trim().length <= 0) {
      errors.username = 'Username is required'
      isValid = false
    }
    if (formData.email.trim().length <= 0) {
      errors.email = 'Email is required'
      isValid = false
    }
    if (formData.password.trim().length <= 0) {
      errors.password = 'Password is required'
      isValid = false
    }
    if (formData.password2.trim().length <= 0) {
      errors.password2 = 'Password is required'
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
      registerUser(formData);
    } else {
      console.log('Something went wrong');
    }
  }

  return (
    <div className={classes['register-container']}>
      <h2>Sign Up</h2>
      <form onSubmit={submitForm}>
        <Input
          onChange={inputHandler}
          type='text'
          placeholder='Enter username'
          name="username"
          id="username"
          value={formData.username}
        />
        {errors.username && (
          <div className={classes.error}>{errors.username}</div>
        )}
        <Input
          onChange={inputHandler}
          type='email'
          placeholder='Enter email'
          name="email"
          id="email"
          value={formData.email}
        />
        {errors.email && (
          <div className={classes.error}>{errors.email}</div>
        )}
        <Input
          onChange={inputHandler}
          type='password'
          placeholder='Enter password'
          name="password"
          id="password"
          value={formData.password}
        />
        {errors.password && (
          <div className={classes.error}>{errors.password}</div>
        )}
        <Input
          onChange={inputHandler}
          type='password'
          placeholder='Retype password'
          name="password2"
          id="password2"
          value={formData.password2}
        />
        {errors.password2 && (
          <div className={classes.error}>{errors.password2}</div>
        )}

        <Button type='submit'>Submit</Button>
      </form>
      <p className={classes['form-text']}>Already have an account? <Link to='/login'>Click here!</Link></p>
    </div>
  )
}

export default RegisterPage
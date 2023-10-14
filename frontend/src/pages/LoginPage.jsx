import React, { useContext, useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import classes from './LoginPage.module.css';
import loginIcon from '../assets/icons/login_icon.svg';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErros] = useState({
    username: '',
    password: ''
  })


  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault()
    loginUser(JSON.stringify(formData))
  }

  return (
    <div className={classes['login-container']}>
      <img src={loginIcon} alt="Login Icon" className={classes['login-icon']} />
      <form onSubmit={submitForm} className={classes['login-form']}>
        <Input
          onChange={inputHandler}
          type="text"
          placeholder="Enter Username"
          name="username"
          id="username"
          value={formData.username}
        />
        <Input
          onChange={inputHandler}
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          value={formData.password}
        />
        <Button type='submit'>Login</Button>
      </form>
      <p className={classes['form-text']}>Already have an account? <Link to='/register'>Click here!</Link></p>
    </div>
  );
};

export default LoginPage;

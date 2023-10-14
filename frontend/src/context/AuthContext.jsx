import React, { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({ children }) => {
    let [authToken, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const navigate = useNavigate()

    const registerUser = (formData) => {
        console.log(formData)
        navigate('/')
    }
    const loginUser = (formData) => {
        console.log(formData)
        navigate('/')
    }
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }
    const updateToke = () => {
        console.log('token updated')
    }

    let authData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}
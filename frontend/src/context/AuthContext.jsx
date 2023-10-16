import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const navigate = useNavigate()

    const registerUser = async (formData) => {
        if (formData) {
            try {
                let url = 'http://127.0.0.1:8000/api/user/register/'
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                let data = await response.json()
                if (response.ok) {
                    navigate('/login')
                } else {
                    console.log(data)
                }
            } catch (err) {
                console.log('Something went wrong...', err)
            }
        } else {
            console.log('form data cannot be empty')
        }
    }

    const loginUser = async (formData) => {
        if (formData) {
            try {
                let url = 'http://127.0.0.1:8000/api/login/'
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                let data = await response.json()
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('Form Data is empty')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        console.log('Updated token!')
        const url = 'http://127.0.0.1:8000/api/token/refresh/'
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens.refresh })
        })
        let data = await response.json();

        try {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        catch {
            logoutUser()
        }
    }

    useEffect(() => {
        let refresh = 1000 * 60 * 29
        let timeout = setTimeout(() => {
            if (authTokens) {
                updateToken()
            }
        }, refresh)
        return () => clearTimeout(timeout)
    }, [authTokens])

    let authData = {
        user: user,
        authTokens: authTokens,
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
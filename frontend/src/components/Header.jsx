import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import AuthContext from '../context/AuthContext'

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <header>
            <div className={classes.header}>
                <Link to='/' className={classes['header-title']}>AIRPORT</Link>
                <nav className={classes['header-menu']}>
                    {user ? (
                        <Link onClick={() => logoutUser()} to='/login' className={classes['header-menu-link-auth']}>Logout</Link>
                    ) : (
                        <>
                            <Link className={classes['header-menu-link-auth']} to='/login'>Login</Link>
                            <Link className={classes['header-menu-link-auth']} to='/register'>Sign Up</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
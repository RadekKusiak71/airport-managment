import React from 'react'
import classes from './HomePage.module.css'
import HomeForm from '../components/HomeForm'
import HomeDepartures from '../components/HomeDepartures'

const HomePage = () => {
    return (
        <React.Fragment>
            <div className={classes['home-form']}>
                <HomeForm />
            </div>
            <div className={classes['home-flights']}>
                <HomeDepartures/>
            </div>
        </React.Fragment>
    )
}

export default HomePage
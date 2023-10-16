import React from 'react'
import classes from './HomeDepartures.module.css'
import Button from '../UI/Button'
const HomeDepartures = () => {
    return (
        <div className={classes.flight}>
            <div className={classes.destination}>
                <p>From: Warsaw</p>
                <p>To: Bologna</p>
            </div>
            <div className={classes['flight-data']}>
                <p>28.02.2023</p>
                <p>Duration: 3 hours 15 minutes</p>
                <Button>Book</Button>
            </div>
        </div>
    )
}

export default HomeDepartures
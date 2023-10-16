import React, { useState } from 'react'
import classes from './HomeForm.module.css'

const HomeForm = () => {
    const [checked, setChecked] = useState(true)

    const updateCheck = (e) => {
        if (e.target.name === 'oneway') {
            setChecked(true)
            console.log('xd')
        } else {
            setChecked(false)
            console.log(checked)
        }
    }
    return (
        <form className={classes['home-form']}>
            <div className={classes['home-form-radio']}>
                <button name='oneway' onClick={updateCheck} type='button' className={checked ? (classes.checked) : (classes.notchecked)}>One Way</button>
                <button name='round' onClick={updateCheck} type='button' className={checked ? (classes.notchecked) : (classes.checked)}>Round Trip</button>
            </div>
            {checked ? (
                <>
                <div className={classes['home-form-destinations']}>
                    <select name="pets" id="pet-select">
                        <option value="">Choose Departure Airport</option>
                        <option value="">Warsaw</option>
                    </select>
                </div>
                <div className={classes['home-form-dates']}>
                        <input type="date" />
                    </div>
                </>
            ) : (
                <>
                    <div className={classes['home-form-destinations']}>
                        <select name="pets" id="pet-select">
                            <option value="">Choose Departure Airport</option>
                            <option value="">Warsaw</option>
                        </select>
                        <select name="pets" id="pet-select">
                            <option value="">Choose Destination Airport</option>
                            <option value="">Bolognia</option>
                        </select>
                    </div>
                    <div className={classes['home-form-dates']}>
                        <input type="date" placeholder='Choose Departure Date'/>
                        <input type="date" value='Choose Arrival Date' />
                    </div>
                </>
            )}
            <button className={classes['home-form-submit']} type='submit'>Search for connections</button>
        </form>
    )
}

export default HomeForm
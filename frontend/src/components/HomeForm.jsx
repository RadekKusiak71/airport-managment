import React, { useState, useEffect } from 'react'
import classes from './HomeForm.module.css'

const HomeForm = () => {
    const [checked, setChecked] = useState(true)
    const [airports, setAirports] = useState([])

    const updateCheck = (e) => {
        if (e.target.name === 'oneway') {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }


    const getFlights = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/airports/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            if (response.ok) {
                setAirports(data)
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFlights()
    }, [])



    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const departureAirport = formData.get('departure_airport');
        const departureDate = formData.get('departure_date');
        const arrivalAirport = formData.get('arrival_airport');
        const arrivalDate = formData.get('arrival_date');

        let data = {
            departure_airport: departureAirport,
            departure_date: departureDate,
            arrival_airport: arrivalAirport,
            arrival_date: arrivalDate,
        }
        sendFormData(data)
    }
    const sendFormData = async (formData) => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/flights/availability/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            JSON.stringify(formData)
            let data = await response.json()
            if (response.ok) {
                console.log(data)
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <form className={classes['home-form']} onSubmit={submitHandler}>
            <div className={classes['home-form-radio']}>
                <button name='oneway' onClick={updateCheck} type='button' className={checked ? (classes.checked) : (classes.notchecked)}>One Way</button>
                <button name='round' onClick={updateCheck} type='button' className={checked ? (classes.notchecked) : (classes.checked)}>Round Trip</button>
            </div>
            {checked ? (
                <>
                    <div className={classes['home-form-destinations']}>
                        <select name="departure_airport" id="departure_airport">
                            <option>Choose Departure Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            )
                            )}
                        </select>
                        <select name="arrival_airport" id="arrival_airport">
                            <option>Choose Destination Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div className={classes['home-form-dates']}>
                        <input type="date" name='departure_date' />
                    </div>
                </>
            ) : (
                <>
                    <div className={classes['home-form-destinations']}>
                        <select name="departure_airport" id="departure_airport">
                            <option>Choose Departure Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            )
                            )}
                        </select>
                        <select name="arrival_airport" id="arrival_airport">
                            <option>Choose Destination Airport</option>
                            {airports.map((airport) => (
                                <option key={airport.id} value={airport.id}>{airport.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div className={classes['home-form-dates']}>
                        <input type="date" placeholder='Choose Departure Date' name='departure_date' />
                        <input type="date" placeholder='Choose Arrival Date' name='arrival_date' />

                    </div>
                </>
            )}
            <button className={classes['home-form-submit']} type='submit'>Search for connections</button>
        </form>
    )
}

export default HomeForm
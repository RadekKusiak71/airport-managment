import React, { useEffect, useState } from 'react'
import classes from './HomeDepartures.module.css'
import Button from '../UI/Button'

const HomeDepartures = () => {
    const [flights, setFlights] = useState([])

    const getFlights = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/flights/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            if (response.ok) {
                setFlights(data)
                console.log(data)
            } else {
                console.log(response)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const formatDateHandler = (fetchedDate) => {
        const date = new Date(fetchedDate)
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate
    }

    useEffect(() => {
        getFlights()
    }, [])

    return (
        <>
            {flights.map((flight) => (
                <div key={flight.id} className={classes.flight}>
                    <div className={classes.destination}>
                        <p>Departure: {flight.departure_airport.airport_code}</p>
                        <p>Arrival: {flight.arrival_airport.airport_code}</p>
                    </div>
                    <div className={classes['flight-data']}>
                        <p>Departure: {formatDateHandler(flight.departure_date)}</p>
                        <Button>Book</Button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HomeDepartures
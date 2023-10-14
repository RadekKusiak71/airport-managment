import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <input
            className={classes['input-component']}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
        />
    )
}

export default Input
import React from 'react'
import { TextField } from '@material-ui/core'

const Input = (props) => {

    const {name, label, value, onChange, error=null, ...other} = props

    return (
        <div>
            <TextField 
                variant = 'outlined'
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                {...other}
            />
        </div>
    )
}

export default Input

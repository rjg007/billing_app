import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name] : value
        })
    }
    
    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleChange
    }
}

const useStyles = makeStyles(theme => ({
    root : {
        '& .MuiFormControl-root' : {
            width: "100%",
            margin: theme.spacing(1)
        }
    }
}))

export const FormRoot = (props) => {

    const {children, ...other} = props

    const classes = useStyles()

    return (
        <div>
            <form className = {classes.root} {...other} >
                {props.children}
            </form>
        </div>
    )
}


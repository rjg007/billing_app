import React from 'react'
import { Button as MuiButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root : {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

const Button = (props) => {

    const {text, size, color, variant, onClick, ...other} = props
    const classes = useStyles()

    return (
        <MuiButton
            classes={{root : classes.root, label: classes.label}}
            variant={variant || 'contained'}
            size={size || 'large'}
            color={color || 'primary'}
            onClick={onClick}   
            {...other} 
        >
            {text}
        </MuiButton>
    )
}

export default Button

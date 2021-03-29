import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../actions/userActions'
import Button from './controls/Button'
import Input from './controls/Input'
import { FormRoot, useForm } from './useForm'

const useStyles = makeStyles(theme => ({
    pageContent : {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        width: '30%'
    }
}))

const Login1 = (props) => {
    
    const {handleAuth} = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        password: ''
    }
    const {
        values,
        setValues,
        handleChange
    } = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: values.email,
            password: values.password
        }
        const reRoute = () => {
            props.history.push('/')
        }
        dispatch(startLogin(formData, handleAuth,reRoute))
        setValues({
            email: '',
            password: ''
        })
    }

    return (
        <Paper className={classes.pageContent} elvation={5}>
            <FormRoot>
                <Input 
                    label="Mail-ID" 
                    value={values.email} 
                    onChange={handleChange}
                    name='email'
                />
                <Input 
                    type='password' 
                    name='password'
                    label="Password"  
                    value={values.password} 
                    onChange={handleChange}
                />
                <Button 
                    type='submit'
                    text='Log In'
                    onClick={handleSubmit}
                />
            </FormRoot>
        </Paper>
    )
}

export default Login1

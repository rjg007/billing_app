import { Grid, makeStyles, Paper } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import React from 'react'
import validator from 'validator'
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

const Login = (props) => {
    
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
        handleChange,
        errors,
        setErrors
    } = useForm(initialValues)

    const validations = () => {
        let errorObj = {}
        errorObj.email = validator.isEmail(values.email) ? '' : 'Invalid mail format'
        errorObj.password = values.password.length > 6 ? '' : 'Password must contain more than 6 characters'
        setErrors({
            ...errorObj
        })
        return Object.values(errorObj).every(ele => ele === '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(validations()) {
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
    }

    return (
        <Grid align='center'>
            <Paper className={classes.pageContent} elvation={5} align='center' >
                <FormRoot>
                    <Input 
                        label="Mail-ID" 
                        value={values.email} 
                        onChange={handleChange}
                        name='email'
                        error={errors.email}
                    />
                    <Input 
                        type='password' 
                        name='password'
                        label="Password"  
                        value={values.password} 
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <Button 
                        type='submit'
                        text='Log In'
                        onClick={handleSubmit}
                    />
                </FormRoot>
            </Paper>
        </Grid>
    )
}

const WrappedComponent = withRouter(Login)

export default WrappedComponent

import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import { FormRoot, useForm } from './useForm'
import Input from './controls/Input'
import Button from './controls/Button'
import { useDispatch } from 'react-redux'
import { startSetUser } from '../actions/userActions'
import validator from 'validator'

const useStyles = makeStyles(theme => ({
    pageContent : {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        width: '30%'
    }
}))

const Register = (props) => {

    const initialValues = {
        userName: '',
        email: '',
        password: '',
        businessName: '',
        address: '',
    }
    const dispatch = useDispatch()
    const classes = useStyles()

    const validations = () => {
        let errorObj = {}
        errorObj.userName = values.userName ? '' : 'This field is mandatory'
        errorObj.email = validator.isEmail(values.email) ? '' : 'Invalid mail format'
        errorObj.password = values.password.length > 6 ? '' : 'Password must contain more than 6 characters'
        errorObj.businessName = values.businessName ? '' : 'This field is mandatory'
        errorObj.address = values.address ? '' : 'This field is mandatory'
        setErrors({
            ...errorObj
        })
        return Object.values(errorObj).every(ele => ele === '')
    }

    const {
        values,
        setValues,
        handleChange,
        errors,
        setErrors
    } = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(validations()) {
            const formData = {
                username : values.userName,
                email : values.email,
                password : values.password,
                businessName : values.businessName,
                address : values.address 
            }
            dispatch(startSetUser(formData))
            setValues({
                userName: '',
                email: '',
                password: '',
                businessName: '',
                address: '',
            })
        }
    }

    return (
        <Grid align='center'>
            <Paper className={classes.pageContent}>
            <FormRoot onSubmit={handleSubmit} >
                <Grid>
                    <Input 
                        label="User Name"  
                        value={values.userName} 
                        onChange={handleChange}
                        name='userName'
                        error={errors.userName}
                    />
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
                    <Input 
                        label="Business Name" 
                        value={values.businessName} 
                        onChange={handleChange}
                        name='businessName'
                        error={errors.businessName}
                    />
                    <Input 
                        label='Address'
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={values.address}
                        name='address'
                        error={errors.address}
                    />
                    <Button 
                        type='submit'
                        text='Register'
                        onClick={handleSubmit}
                    />
                </Grid>
            </FormRoot>
        </Paper>
        </Grid>   
    )
}

export default Register

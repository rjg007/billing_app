import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import { FormRoot, useForm } from './useForm'
import Input from './controls/Input'
import Button from './controls/Button'
import { useDispatch } from 'react-redux'
import { startSetUser } from '../actions/userActions'

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

    const {
        values,
        setValues,
        handleChange
    } = useForm(initialValues)

    const handleSubmit = (e) => {
        e.preventDefault()
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

    return (
        <Paper className={classes.pageContent}>
            <FormRoot>
                <Grid>
                    <Input 
                        label="User Name"  
                        value={values.userName} 
                        onChange={handleChange}
                        name='userName'
                    />
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
                    <Input 
                        label="Business Name" 
                        value={values.businessName} 
                        onChange={handleChange}
                        name='businessName'
                    />
                    <Input 
                        label='Address'
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={values.address}
                        name='address'
                    />
                    <Button 
                        type='submit'
                        text='Register'
                        onClick={handleSubmit}
                    />
                </Grid>
            </FormRoot>
        </Paper>   
    )
}

export default Register

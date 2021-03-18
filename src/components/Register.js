import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Paper, Avatar, TextField, Button,makeStyles } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { startSetUser } from '../actions/userActions';

const useStyles = makeStyles({
    paperStyle: {
        padding: 20,
        height: '80vh',
        width: 400,
        margin: '20px auto'
    },
    textField : {
        margin: '5px 0',
    },
    button : {
        margin: '10px 0 0 5px'
    },
    avatar: {
        backgroundColor: '#ca0c2f'
    }
})

const Register = (props) => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')

    const dispatch = useDispatch()

    const classes = useStyles()

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUserName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        } else if (e.target.name === 'businessName') {
            setBusinessName(e.target.value)
        } else {
            setAddress(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username : userName,
            email : email,
            password : password,
            businessName : businessName,
            address : address 
        }
        dispatch(startSetUser(formData))
        setUserName('')
        setEmail('')
        setPassword('')
        setBusinessName('')
        setAddress('')
    }

    return (
        <div>
            <Grid>
                <Paper className={classes.paperStyle} elevation={10}>
                    <Grid align='center'>
                        <Avatar className={classes.avatar}> <AddCircleOutlineIcon /> </Avatar>
                        <h2> Get Started </h2>
                    </Grid>
                    <TextField 
                        label="User Name" 
                        variant="outlined" 
                        placeholder='Enter username here...'  
                        value={userName} 
                        onChange={handleChange}
                        name='username'
                        className={classes.textField}
                    />
                    <TextField  
                        label="Mail-ID" 
                        variant="outlined" 
                        placeholder='Enter Mail-ID here...'
                        value={email} 
                        onChange={handleChange}
                        name='email'
                        className={classes.textField}
                    />
                    <TextField 
                        type='password' 
                        label="Password" 
                        variant="outlined" 
                        placeholder='Enter password here...'  
                        value={password} 
                        onChange={handleChange}
                        name='password'
                        className={classes.textField}
                    />
                    <TextField  
                        label="Business Name" 
                        variant="outlined" 
                        placeholder='Enter business name here...' 
                        value={businessName} 
                        onChange={handleChange}
                        name='businessName'
                        className={classes.textField}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Address"
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={address}
                        onChange={handleChange}
                        variant="outlined"
                        name='address'
                        className={classes.textField}
                    />
                    <Button
                        type='submit'
                        color='primary' 
                        variant='contained' 
                        fullWidth
                        onClick={handleSubmit}
                        className={classes.button}
                    > Register</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default Register

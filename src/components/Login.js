import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Paper, Avatar, TextField, Button,makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { startLogin } from '../actions/userActions'

const useStyles = makeStyles({
    textField: {
        margin: '50px 0'
    },
    mail: {
        marginBottom: '15px'
    }
})

const Login = (props) => {

    const {handleAuth} = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const classes = useStyles()

    const paperStyle = {padding: 20, height: '70vh', width: 280, margin: '20px auto'}
    const avatarStyle = {backgroundColor: '#25ac9f'}

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: email,
            password: password
        }
        const reRoute = () => {
            props.history.push('/')
        }
        dispatch(startLogin(formData, handleAuth,reRoute))
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2> Log In </h2>
                    </Grid>
                    <div className={classes.textField}>
                        <TextField  
                            label="Mail-ID" 
                            variant="outlined" 
                            placeholder='Enter Mail-ID here...' 
                            fullWidth 
                            required 
                            value={email} 
                            onChange={handleChange}
                            name='email'
                            className={classes.mail}
                        />

                        <TextField 
                            label="Password" 
                            variant="outlined" 
                            placeholder='Enter password here...' 
                            fullWidth 
                            required 
                            value={password} 
                            type='password'
                            onChange={handleChange}
                            name='password'
                        />
                    </div>
                    

                    <Button
                        type='submit'
                        color='primary' 
                        variant='contained' 
                        fullWidth
                        onClick={handleSubmit}
                    > Log In</Button>
                </Paper>
            </Grid>
        </div>
    )
}

const WrappedComponent = withRouter(Login)

export default WrappedComponent

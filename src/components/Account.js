import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { startGetAccount } from '../actions/userActions'

const useStyles = makeStyles({
    paperStyle: {
        padding: 20,
        height: '70vh',
        width: 280,
        margin: '20px auto'
    }
})

const Account = (props) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const account = useSelector(state => {
        return state.account
    })

    useEffect(() => {
        dispatch(startGetAccount())
    },[])

    return (
        <div>
            <Grid>
                <Paper elevation={10} className={classes.paperStyle}>   
                    <Grid align='center'>
                        <h2> Account Info </h2>
                        <h3> {account.username} </h3>
                        <h3> {account.businessName} </h3>
                        <h3> {account.email} </h3>
                        <h3> {account.username} </h3>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default Account

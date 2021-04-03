import { Dialog, DialogContent, DialogTitle, makeStyles, Typography, Grid } from '@material-ui/core'
import React from 'react'
import ActionBtn from './controls/ActionBtn'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

const Popup = (props) => {

    const classes = useStyles()

    const {title, children, openPopUp, setOpenPopUp} = props

    return (
        <Dialog open={openPopUp} maxWidth='md' classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Grid container alignItems='center'>
                        <Grid item xs={10}>
                            <Typography variant='h6' component='div' align='left' style={{flexGrow: 1}}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <ActionBtn
                            color='secondary'
                            onClick={ ()=> {
                                setOpenPopUp(false)
                            } }
                        >
                            <CloseIcon />
                        </ ActionBtn>
                        </Grid>
                    </Grid>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup

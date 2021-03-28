import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const ErrorInput = (props) => {

    const {helperText} = props

    return (
        <TextField
          error
          label="Error"
          helperText={helperText}
          variant="outlined"
        />
    )
}

export default ErrorInput
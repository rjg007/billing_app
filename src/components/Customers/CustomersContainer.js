import React from 'react'
import { Grid } from '@material-ui/core'
import CustomersTable from './CustomersTable'

const CustomersContainer = (props) => {
    return (
        <div>
            <Grid align='center'>
                <h1> Customers Database </h1>
                <CustomersTable />
            </Grid>
        </div>
    )
}

export default CustomersContainer

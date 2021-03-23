import React from 'react'
import { Grid } from '@material-ui/core'
import CustomersForm from './CustomersForm'
import CustomersTable from './CustomersTable'

const CustomersContainer = (props) => {
    return (
        <div>
            <Grid align='center'>
                <h1> Customers Database </h1>
                {/* <CustomersForm /> */}
                <CustomersTable />
            </Grid>
        </div>
    )
}

export default CustomersContainer

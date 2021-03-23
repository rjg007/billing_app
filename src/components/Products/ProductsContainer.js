import React from 'react'
import Table from './Table'
import { Grid } from '@material-ui/core'

const ProductsContainer = () => {
    return (
        <div>
            <Grid align='center'>
                <h1> Product Catalog </h1>
                <Table />
            </Grid>
        </div>
    )
}

export default ProductsContainer


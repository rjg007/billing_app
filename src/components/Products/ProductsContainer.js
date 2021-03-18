import React, {useState} from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import ProductsForm from './ProductsForm'
import ProductsTable from './ProductsTable'

const useStyles = makeStyles({
    table : {
        
    },
    form : {
        
    }
})

const ProductsContainer = (props) => {

    const classes = useStyles()

    const [toggleForm, ]

    return (
        <div>
            <Grid align='center'>
                <h1> Product Catalog </h1>
            </Grid>
            <Grid  container >
                <Grid align='center' className={classes.table} item xs={8}>
                    <ProductsTable />
                </Grid>
                <Grid align='center' className={classes.form} item xs={4}>
                    <ProductsForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductsContainer

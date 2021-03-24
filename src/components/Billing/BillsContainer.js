import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import BillsTable from './BillsTable'
import BillGenerator from './BillGenerator'

const useStyles = makeStyles(theme => ({
    pageContent1: {
        // margin: theme.spacing(1),
        padding: theme.spacing(5)
    },
    pageContent2: {
        padding: theme.spacing(5)
    }
}))

const BillsContainer = (props) => {

    const classes = useStyles()

    const products = useSelector(state => {
        return state.products
    })

    const [cartItems, setCartItems] = useState([])

    const addProduct = (product) => {
        const productExists = cartItems.find(ele => ele._id === product._id)
        if (productExists) {
            const result = cartItems.map(item => item._id === product._id ? {...productExists, qty: productExists.qty + 1} : item )
            setCartItems(result)
        } else {
            setCartItems([...cartItems, {...product, qty: 1}])
        }
    }

    const removeProduct = (product) => {
        const productExists = cartItems.find(ele => ele._id === product._id)
        if (productExists.qty === 1) {
            setCartItems(cartItems.filter(ele => ele._id !== product._id ))
        } else {
            const result = cartItems.map(item => item._id === product._id ? {...productExists, qty: productExists.qty - 1} : item )
            setCartItems(result)
        }
    }

    return (
        <div>
            <Grid align='center'>
                <h1> Cart </h1>
            </Grid>
            <Grid container align='center'>
                <Grid item xs={7} className={classes.pageContent1}>
                    <Paper elevation={10}>
                        <BillsTable addProduct={addProduct} />
                    </Paper>
                </Grid>
                <Grid item xs={5} className={classes.pageContent2}>
                    <Paper elevation={10}>
                        <BillGenerator cartItems={cartItems} addProduct={addProduct} removeProduct={removeProduct} />
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}

export default BillsContainer

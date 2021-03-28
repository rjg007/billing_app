import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import { setSelectedUser } from '../../actions/selectedUserActions'
import BillsTable from './BillsTable'
import BillGenerator from './BillGenerator'
import ShowBills from './ShowBills'

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
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState([])

    const handleLineItems = (arr) => {
        const lineItems = arr.map(ele => {
            return (
                {
                    product : ele._id,
                    quantity: ele.qty
                }
            )
        })
        console.log('line items', lineItems)
        dispatch(setSelectedUser({
            lineItems : lineItems
        }))
    }

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

    useEffect(() => {
        handleLineItems(cartItems)
    }, [cartItems])

    return (
        <div>
            <Grid align='center'>
                <h1> Cart </h1>
            </Grid>
            <Grid container align='center'>
                <Grid item xs={7} className={classes.pageContent1}>
                    <Paper elevation={10}>
                        <BillsTable addProduct={addProduct} handleLineItems={handleLineItems} cartItems={cartItems}/>
                    </Paper>
                </Grid>
                <Grid item xs={5} className={classes.pageContent2}>
                    <Paper elevation={10}>
                        <BillGenerator cartItems={cartItems} setCartItems={setCartItems} addProduct={addProduct} removeProduct={removeProduct} handleLineItems={handleLineItems} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid>
                <ShowBills />
            </Grid>

        </div>
    )
}

export default BillsContainer

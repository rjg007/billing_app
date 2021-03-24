import React, {useEffect} from 'react'
import { Grid, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { startGetCustomers } from '../../actions/customersActions'
import { startGetProducts } from '../../actions/productsActions'
import Button from '../controls/Button'
import ActionBtn from '../controls/ActionBtn'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove';
import useTable from '../useTable'
import DenseTable from '../controls/DenseTable'

const headCells = [
    {id: 'name', label:'Product Name', disableSorting: true},
    {id: 'actions', label: 'Actions', disableSorting: true},
    {id: 'price', label: 'Price', disableSorting: true}
]

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}))

const LineItems = (props) => {

    const {cartItems, addProduct, removeProduct, date, name, customers} = props

    const dispatch = useDispatch()

    const classes = useStyles()

    console.log(customers)

    const handleSubmit = (e) => {
        e.preventDefault()

        const selectedCustomer = customers.find(ele => ele.name === name) 
        console.log(name, cartItems)
    }

    return (
        <div>
            <Grid className={classes.pageContent}>
                <DenseTable cartItems={cartItems} addProduct={addProduct} removeProduct={removeProduct} />
            </Grid>
        </div>
    )
}

export default LineItems

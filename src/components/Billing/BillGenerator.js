import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, makeStyles } from '@material-ui/core'
import { startGetCustomers } from '../../actions/customersActions'
import { setSelectedUser } from '../../actions/selectedUserActions'
import DatePicker from '../controls/DatePicker'
import ActionBtn from '../controls/ActionBtn'
import AutoComplete from '../controls/AutoComplete'
import Image from './Images/Empty_Cart.png'
import DenseTable from '../controls/DenseTable'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}))

const BillGenerator = (props) => {

    const {cartItems, addProduct, removeProduct, handleLineItems, setCartItems} = props
    const [date, setDate] = useState(new Date())
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(startGetCustomers())
    }, [])

    const customers = useSelector(state => {
        return state.customers
    })

    const handleChange = (e) => {
        if(e.target.name === 'billDate') {
            setDate(e.target.value)
            dispatch(setSelectedUser({
                date: date
            }))
        }
    }

    return (
        <div>
            <h1> Bill </h1>
            <DatePicker
                value={date}
                name='billDate'
                label='Bill Date'
                onChange={handleChange} 
            />
            <br/> <br/>
            <AutoComplete customers={customers} /> 
            <ActionBtn>
                <PersonAddIcon />
            </ActionBtn>
            <br/>
            {
                cartItems.length === 0 ? (
                    <div>
                        <img 
                            src={Image}
                            width='150px'
                            alt='Empty Cart'
                        />
                        <h2> Empty Cart </h2>
                    </div>
                ) : (
                    <div>
                        <Grid className={classes.pageContent}>
                            <DenseTable 
                                customers={customers}
                                cartItems={cartItems} 
                                setCartItems={setCartItems}
                                addProduct={addProduct} 
                                removeProduct={removeProduct} 
                                date={date}
                                setDate={setDate}
                                handleLineItems={handleLineItems}
                            />
                        </Grid>
                    </div>
                )
            }
        </div>
    )
}

export default BillGenerator

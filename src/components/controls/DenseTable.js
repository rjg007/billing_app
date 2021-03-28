import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setSelectedUser } from '../../actions/selectedUserActions'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button as MuiBtn} from '@material-ui/core'
import Button from '../controls/Button'
import { startSetBill } from '../../actions/billsActions'

const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

export default function DenseTable(props) {

    const {cartItems, addProduct, removeProduct, handleLineItems, setCartItems, setDate } = props

    const classes = useStyles();

    const dispatch = useDispatch()

    const selectedUser = useSelector(state => {
        return state.selectedUser
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(selectedUser)
        
        const formData = {
            date: selectedUser.date,
            customer: selectedUser.id,
            lineItems: selectedUser.lineItems
        }

        dispatch(startSetBill(formData))
        setCartItems([])
        setDate(new Date())
        console.log('formData',formData)
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price(in ₹)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {cartItems.map((item) => (
                        <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="center">
                            <MuiBtn 
                                size='small'
                                color='primary' 
                                onClick={ () => {
                                    addProduct(item) 
                                    handleLineItems(cartItems)
                                }} 
                            >
                                +
                            </MuiBtn> {item.qty}
                            <MuiBtn 
                                size='small'
                                color='secondary' 
                                onClick={ () => {
                                    removeProduct(item) 
                                    handleLineItems(cartItems)
                                }} 
                            >
                                -
                            </MuiBtn>
                        </TableCell>
                        <TableCell align="right">{(item.price * item.qty).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/> <br/>
            <Button 
                text='Generate Bill'
                onClick={handleSubmit}
            />
            <br/>
        </div>
        
        
  );
}
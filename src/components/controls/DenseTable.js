import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core'


const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },
});

export default function DenseTable(props) {

    const {cartItems, addProduct, removeProduct} = props

    const classes = useStyles();

    return (
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
                        <Button 
                            size='small'
                            color='primary' 
                            onClick={ () => addProduct(item) } 
                        >
                            +
                        </Button> {item.qty}
                        <Button 
                            size='small'
                            color='secondary' 
                            onClick={ () => removeProduct(item) } 
                        >
                            -
                        </Button>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.qty).toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}
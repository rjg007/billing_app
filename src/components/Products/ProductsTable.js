import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetProducts, startDeleteProduct } from '../../actions/userActions'
import {IconButton, Paper} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductsTable = (props) => {

    const dispatch = useDispatch()

    const products = useSelector(state => {
        return state.products
    })

    useEffect(() => {
        dispatch(startGetProducts())
    }, [])

    const handleDelete = (id) => {
        dispatch(startDeleteProduct(id))
    }

    return (
        <div>
            <h2> Products Table </h2>
            <Paper elevation={10}>
                <table>
                    <thead>
                        <tr>
                            <td> ID </td>
                            <td> Name </td>
                            <td> Price </td>
                            <td> Edit </td>
                            <td> Delete </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => {
                                return (
                                    <tr key={product._id}>
                                        <td> {product._id} </td>    
                                        <td> {product.name} </td>    
                                        <td> {product.price} </td>    
                                        <td> 
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>    
                                        </td> 
                                        <td> 
                                            <IconButton onClick={() => {
                                                handleDelete(product._id)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>    
                                        </td>    
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Paper>
        </div>
    )
}

export default ProductsTable

import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Paper, Avatar, TextField, Button,makeStyles } from '@material-ui/core'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { startSetProduct } from '../../actions/userActions'

const useStyles = makeStyles({
    paperStyle : {
        padding: 20,
        height: '40vh',
        width: '240px',
        margin: '20px auto'
    },
    textField : {
        margin: '10px 0'
    },
    avatar : {
        backgroundColor: 'green'
    }
})

const ProductsForm = (props) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setName(e.target.value)
        } else {
            setPrice(Number(e.target.value))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: name,
            price: price
        }
        dispatch(startSetProduct(formData))
        setName('')
        setPrice('')
    }

    return (
        <div>
            <Grid>
                <Paper elevation={10} className={classes.paperStyle} >
                    <Grid align='center'>
                        <Avatar className={classes.avatar}> <ShoppingBasketIcon /> </Avatar>
                        <h2> Add Product </h2>
                    </Grid>
                    <TextField  
                        label="Name" 
                        variant="outlined" 
                        placeholder='Enter name here...' 
                        fullWidth 
                        value={name} 
                        onChange={handleChange}
                        name='name'
                        //className={classes.textField}
                    />
                    <TextField  
                        label="Price" 
                        variant="outlined" 
                        placeholder='Enter price here...' 
                        fullWidth 
                        value={price} 
                        onChange={handleChange}
                        name='price'
                        className={classes.textField}
                    />
                    <Button
                        type='submit'
                        color='primary' 
                        variant='contained' 
                        fullWidth
                        onClick={handleSubmit}
                    > Add</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default ProductsForm
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { startSetProduct, startUpdateProduct } from '../../actions/productsActions'
import { useForm, FormRoot } from '../useForm'
import Input from '../controls/Input'
import Button from '../controls/Button'

const initialValues = {
    name : '',
    price : ''
}

const Form = (props) => {

    const dispatch = useDispatch()
    const {editItem, toggleEdit} = props
    const {values, setValues, handleChange, errors, setErrors} = useForm(initialValues)

    useEffect(() => {
        if(toggleEdit) {
            setValues({...editItem}) 
        }
    }, [])

    const validations = () => {
        let errorObj = {}
        errorObj.name = values.name ? '' : 'This field is mandatory'
        errorObj.price = values.price ? '' : 'This field is mandatory' 
        setErrors({
            ...errorObj
        })
        return Object.values(errorObj).every(ele => ele === '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(validations()) {
            const formData = {
                name: values.name,
                price: values.price
            }
            
            if (toggleEdit) {
                dispatch(startUpdateProduct(formData, editItem._id))
            } else {
                dispatch(startSetProduct(formData))
            }
            setValues({
                name : '',
                price: ''
            })
        }
    }

    return (
        <FormRoot onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} align='center'>
                    <Input
                        name='name'
                        value={values.name}
                        label='Product Name'
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <Input 
                        label='Price'
                        onChange={handleChange}
                        value={values.price}
                        name='price'
                        error={errors.price}
                    />
                    <Button 
                        type='submit'
                        text='Submit'
                        onClick={handleSubmit}
                    />
                </Grid>
            </Grid>
        </FormRoot>
    )
}

export default Form
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { startSetCustomer, startUpdateCustomer } from '../../actions/customersActions'
import { useForm, FormRoot } from '../useForm'
import validator from 'validator'
import Input from '../controls/Input'
import Button from '../controls/Button'

const initialValues = {
    name: '',
    mobile: '',
    email: ''
}

const CustomersForm = (props) => {

    const {editItem, toggleEdit} = props
    const {values, setValues, handleChange, errors, setErrors} = useForm(initialValues)
    const dispatch = useDispatch()

    useEffect(() => {
        if(toggleEdit) {
            setValues({...editItem}) 
        }
    }, [])

    const validations = () => {
        let errorObj = {}
        errorObj.name = values.name ? '' : 'This field is mandatory'
        errorObj.mobile = values.mobile.length >= 10 ? '' : 'Atleast 10 digits required'
        errorObj.email = validator.isEmail(values.email) ? '' : 'Invalid mail format' 
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
                mobile: values.mobile,
                email: values.email
            }
            if (toggleEdit) {
                dispatch(startUpdateCustomer(formData, editItem._id))
            } else {
                dispatch(startSetCustomer(formData))
            }
            setValues({
                name: '',
                mobile: '',
                email: ''
            })
        }
    }

    return (
        <div>
            <FormRoot onSumbit={handleSubmit}>
                <Grid container>
                    <Grid item align='center'>
                        <Input
                            name='name'
                            value={values.name}
                            label='Customer Name'
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <Input
                            name='mobile'
                            value={values.mobile}
                            label='Mobile No.'
                            onChange={handleChange}
                            error={errors.mobile}
                        />
                        <Input
                            name='email'
                            value={values.email}
                            label='Mail ID'
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <Button 
                            type='submit'
                            text='Submit'
                            onClick={handleSubmit}
                        />
                    </Grid>
                </Grid>
            </FormRoot>
        </div>
    )
}

export default CustomersForm

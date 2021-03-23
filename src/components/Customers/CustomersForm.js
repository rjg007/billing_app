import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { startSetCustomer, startUpdateCustomer } from '../../actions/customersActions'
import { useForm, FormRoot } from '../useForm'
import Input from '../controls/Input'
import Button from '../controls/Button'

const initialValues = {
    name: '',
    mobile: '',
    email: ''
}

const CustomersForm = (props) => {

    const {editItem, toggleEdit, setToggleEdit, openPopUp, setOpenPopUp} = props

    const {values, setValues, handleChange} = useForm(initialValues)

    const dispatch = useDispatch()

    useEffect(() => {
        if(toggleEdit) {
            setValues({...editItem}) 
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
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
                        />
                        <Input
                            name='mobile'
                            value={values.mobile}
                            label='Mobile No.'
                            onChange={handleChange}
                        />
                        <Input
                            name='email'
                            value={values.email}
                            label='Mail ID'
                            onChange={handleChange}
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

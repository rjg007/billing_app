import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetCustomers } from '../../actions/customersActions'
import DatePicker from '../controls/DatePicker'
import {useForm} from '../useForm'
import Button from '../controls/Button'
import LineItems from './LineItems'
import AutoComplete from '../controls/AutoComplete'

const BillGenerator = (props) => {

    const {cartItems, addProduct, removeProduct} = props

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCustomers())
    }, [])

    const customers = useSelector(state => {
        return state.customers
    })

    const handleChange = (e) => {
        if (e.target.name === 'customerName') {
            setName(e.target.value)
        } else {
            setDate(e.target.value)
        }

        console.log(name, date)
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
            <br/>

            {
                cartItems.length === 0 ? (
                    <div>
                        <img 
                            src="https://www.flaticon.com/svg/vstatic/svg/4379/4379616.svg?token=exp=1616585142~hmac=4437545e57cbd00b13a8568f88e19e62" 
                            width='150px'/>
                        <h2> Empty Cart </h2>
                    </div>
                ) : (
                    <div>
                        <LineItems 
                            customers={customers}
                            cartItems={cartItems} 
                            addProduct={addProduct} 
                            removeProduct={removeProduct} 
                            date={date}
                            name={name}
                        />
                        <Button 
                            text='Generate Bill'
                        />
                    </div>

                )
            }
        </div>
    )
}

export default BillGenerator

import axios from 'axios'

export const startSetCustomer = (obj) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', obj, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors) 
            } else {
                dispatch(setCustomer(result))
            }
        })
        .catch(err => {
            alert(err.message)
        })
    }
}

export const setCustomer = (obj) => {
    return {
        type : 'SET_CUSTOMER',
        payload: obj
    }
}

export const startGetCustomers = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers', {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors) 
            } else {
                dispatch(getCustomers(result))
            }
        })
    }
}

export const getCustomers = (arr) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: arr
    }
}

export const startDeleteCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data 
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(deleteCustomer(id))
            }
        })
    }
}

export const deleteCustomer = (id) => {
    return {
        type: 'REMOVE_CUSTOMER',
        payload: id
    }
}

export const startUpdateCustomer = (obj, id) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, obj, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(updateCustomer(result))
            }
        })
    }
}

export const updateCustomer = (obj) => {
    return {
        type: 'UPDATE_CUSTOMER',
        payload: obj
    }
}
import axios from 'axios'

export const startSetBill = (obj) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', obj, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data 
            console.log(result)
            if(result.hasOwnProperty('errors')) {
                alert(result.errors) 
            } else {
                dispatch(setBill(result))
            }
        })
        .catch(err => {
            alert(err.message)
        })
    }
}

export const setBill = (obj) => {
    return {
        type : 'SET_BILL',
        payload: obj
    }
}
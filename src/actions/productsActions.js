import axios from 'axios'

export const startSetProduct = (obj) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/products', obj, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            } else {
                dispatch(setProduct(result))
            }
        })
        .catch(err => {
            alert(err.message)
        })
    }
}

export const setProduct = (obj) => {
    return {
        type: 'SET_PRODUCT',
        payload: obj
    }
}

export const startGetProducts = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/products',  {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(getProducts(result))
            }
        })
    }
}

export const getProducts = (arr) => {
    return {
        type: 'GET_PRODUCTS',
        payload: arr
    }
}

export const startDeleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(deleteProduct(id))
            }
        })
    }
}

export const deleteProduct = (id) => {
    return {
        type : 'REMOVE_PRODUCT',
        payload: id
    }
}

export const startUpdateProduct = (obj, id) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`, obj, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(response => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                alert(result.errors)
            } else {
                dispatch(updateProduct(result))
            }
        })
    }
}

export const updateProduct = (obj) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: obj
    }
}
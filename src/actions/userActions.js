import axios from 'axios'

export const startSetUser = (obj) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', obj)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(setUser(result))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const setUser = (obj) => {
    return {
        type: 'SET_USER',
        payload: obj
    }
}

export const startLogin = (obj, handleAuth, reRoute) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', obj)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    localStorage.setItem('token', result.token)
                    handleAuth()
                    reRoute()
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const startGetAccount = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account', {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            }
        })
            .then(response => {
                const result = response.data
                dispatch(getAccountInfo(result))
            })
            .catch(err => {
                alert(err.message)
            })
    }
}

export const getAccountInfo = (info) => {
    return {
        type: 'SET_INFO',
        payload: info
    }
} 




const initialCustomersValue = []

const customersReducer = (state = initialCustomersValue, action) => {
    switch(action.type) {

        case 'GET_CUSTOMERS' : {
            return [...action.payload]
        }

        case 'SET_CUSTOMER' : {
            return [...state, {...action.payload}]
        }

        case 'UPDATE_CUSTOMER' : {
            const result = [...state].map(ele => {
                return ele._id === action.payload._id ? {...action.payload} : {...ele}
            })
            return result
        }

        case 'REMOVE_CUSTOMER' : {
            return [...state].filter(ele => {
                return ele._id !== action.payload
            })
        }

        default : {
            return [...state]
        }
    }
}

export default customersReducer
const initialProductsValue = []

const productsReducer = (state = initialProductsValue, action) => {
    switch(action.type) {

        case 'GET_PRODUCTS' : {
            return [...action.payload]
        }
        
        case 'SET_PRODUCT' : {
            return [...state, {...action.payload}]
        }

        case 'UPDATE_PRODUCT' : {
            const result = [...state].map(ele => {
                return ele._id === action.payload._id ? {...action.payload} : {...ele}
            })
            return result
        }

        case 'REMOVE_PRODUCT' : {
            console.log('remove reducer', action.payload)
            return [...state].filter(ele => {
                return ele._id !== action.payload
            })
        }

        default : {
            return [...state]
        }
    }
}

export default productsReducer
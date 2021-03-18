const initialProductsValue = []

const productsReducer = (state = initialProductsValue, action) => {
    switch(action.type) {

        case 'GET_PRODUCTS' : {
            return [...action.payload]
        }
        
        case 'SET_PRODUCT' : {
            return [...state, {...action.payload}]
        }

        case 'REMOVE_PRODUCT' : {
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
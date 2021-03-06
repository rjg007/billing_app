const initialBillsValue = []

const billsReducer = (state = initialBillsValue, action) => {
    switch(action.type) {

        case 'SET_BILL' : {
            return [...state, {...action.payload}]
        }

        case 'GET_BILLS' : {
            return [...action.payload]
        }

        default : {
            return [...state]
        }
    }
}

export default billsReducer
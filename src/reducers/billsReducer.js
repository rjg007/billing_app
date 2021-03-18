const initialBillsValue = []

const billsReducer = (state = initialBillsValue, action) => {
    switch(action.type) {
        default : {
            return [...state]
        }
    }
}

export default billsReducer
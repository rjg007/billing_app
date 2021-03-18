const initialCustomersValue = []

const customersReducer = (state = initialCustomersValue, action) => {
    switch(action.type) {
        default : {
            return [...state]
        }
    }
}

export default customersReducer
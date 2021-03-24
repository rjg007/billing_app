const initialUserValue = {}

const selectedUserReducer = (state = initialUserValue, action) => {
    switch(action.type) {

        case 'SET_SELECTED_USER' : {
            return {...action.payload}
        }

        default : {
            return {...state}
        }
    }
}

export default selectedUserReducer
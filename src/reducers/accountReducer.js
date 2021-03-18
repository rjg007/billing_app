const initialAccountValue = {}

const accountReducer = (state = initialAccountValue, action) => {
    switch(action.type) {

        case 'SET_INFO' : {
            return  {...action.payload}
        }

        default : {
            return {...state}
        }
    }
}

export default accountReducer
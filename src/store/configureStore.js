import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/usersReducer'
import customersReducer from '../reducers/customersReducer'
import billsReducer from '../reducers/billsReducer'
import productsReducer from '../reducers/productsReducer'
import accountReducer from '../reducers/accountReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        users : usersReducer,
        products : productsReducer,
        customers : customersReducer,
        bills : billsReducer,
        account: accountReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore
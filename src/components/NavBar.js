import React from 'react'
import { Link,Route, withRouter } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import ProductsContainer from './Products/ProductsContainer'
import CustomersContainer from './Customers/CustomersContainer'
import BillsContainer from './Billing/BillsContainer'

const NavBar = (props) => {

    const {toggleLogin, handleAuth} = props

    return (
        <div>
            {
                toggleLogin ? (
                    <div>
                        <Link to='/'> Home </Link>
                        <Link to='/account'> Account </Link>
                        <Link to='/products'> Products </Link>
                        <Link to='/customers'> Customers </Link>
                        <Link to='/cart' > Cart </Link>
                        <Link onClick={ () => {
                            localStorage.removeItem('token')
                            handleAuth()
                            props.history.push('/')
                        } }> Logout </Link>
                    </div>
                ) : (
                    <div> 
                        <Link to='/login'> Login </Link>
                        <Link to='/register'> Register </Link>
                    </div>
                )
            }

            <Route path='/login'>
                <Login handleAuth={handleAuth} />
            </Route>
            <Route path='/register' component={Register} />
            <Route path='/account' component={Account} />
            <Route path='/products' component={ProductsContainer} />
            <Route path='/customers' component={CustomersContainer} />
            <Route path='/cart' component={BillsContainer} />
        </div>
    )
}

const WrappedComponent = withRouter(NavBar)

export default WrappedComponent

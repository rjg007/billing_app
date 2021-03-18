import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import configureStore from './store/configureStore'
import './App.css'

const store = configureStore()

console.log('state', store.getState())

store.subscribe(() => {
  console.log('state updated', store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);



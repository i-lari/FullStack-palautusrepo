import ReactDOM from 'react-dom/client'
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes : anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
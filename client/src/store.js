//standerd code
import {
    createStore,
    applyMiddleware
} from 'redux'
import {
    composeWithDevTools
} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers' //beacause calling index.js


const initialState = {}

const middleware = [thunk]

//store and integrated with extentions

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
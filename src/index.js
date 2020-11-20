import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';

import StreamReducer from './store/reducers/StreamReducer'
import ChatReducer from './store/reducers/ChatReducer'
import AuthReducer from './store/reducers/authReducer';
import UIReducer from './store/reducers/UIReducer'

axios.defaults.baseURL = 'http://localhost:5000';

const rootReducer = combineReducers({
    auth: AuthReducer,
    stream: StreamReducer,
    chat: ChatReducer,
    ui: UIReducer
});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const store = createStore(
    rootReducer, /* preloadedState, */
    composeEnhancers(
        applyMiddleware(thunk)
    )
  );

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

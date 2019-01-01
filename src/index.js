import React from 'react';
import { render } from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import Home from './components/home';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';

render(
    <Provider store={store}>
        <Home />
    </Provider>
    ,  document.getElementById('root')
);
const authToken = loadAuthToken();
if(authToken){
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}
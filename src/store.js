import {createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers/events';
import {authReducer} from './reducers/auth';
import {registerReducer} from './reducers/register';
import {reducer as formReducer} from 'redux-form';
import { patienceReducer } from './reducers/patients';
import { medsReducer } from './reducers/meds';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        form: formReducer,
        events : reducer,
        auth: authReducer,
        signUp : registerReducer,
        patients : patienceReducer,
        meds: medsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

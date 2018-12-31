import {createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {eventsReducer} from './reducers/events';
import {authReducer} from './reducers/auth';
import {registerReducer} from './reducers/register';
import {reducer as formReducer} from 'redux-form';
import { patienceReducer } from './reducers/patients';
import { medsReducer } from './reducers/meds';
import { logsReducer } from './reducers/log';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        form: formReducer,
        events : eventsReducer,
        auth: authReducer,
        signUp : registerReducer,
        patients : patienceReducer,
        meds: medsReducer,
        logs : logsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

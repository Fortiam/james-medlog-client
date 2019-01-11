import jwtDecode from 'jwt-decode';
import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const setAuthToken = authToken => ({
    type: 'SET_AUTH_TOKEN',
    authToken
});

export const clearAuth = () => ({
    type: 'CLEAR_AUTH'
});

export const authRequest = () => ({
    type: 'AUTH_REQUEST'
});

export const authSuccess = currentUser => ({
    type: 'AUTH_SUCCESS',
    currentUser
});

export const authError = error => ({
    type: 'AUTH_ERROR',
    error
});

const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));//saves to _state_ here
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken)//saves to _local storage_ here
}

export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => {
            if(res.status === 401){
                dispatch(authError({"error": "Incorrect username or password"}));
            
            }
            return res.json()})
        .then(({authToken}) => {
            if(authToken){
                storeAuthInfo(authToken, dispatch)
            }
            else return true;
        })
        .catch(err => {
            const {status} = err;
            const message =
                status === 401
                    ? 'Incorrect username or password'
                    : 'Unable to login, please try again';
            dispatch(authError({"error": message}));
            // Could not authenticate, so return a SubmissionError for Redux
            // Form
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            );
        })
);
};
export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, so clear them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};
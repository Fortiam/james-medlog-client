import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import {authSuccess, authError, clearAuth} from './auth';

export const registerRequest = () =>({
    type: 'REGISTER_REQUEST'
});
export const registerSuccess = (payload)=>({
    type: 'REGISTER_SUCCESS',
    payload
});
export const registerError = (error)=>({
    type: 'REGISTER_ERROR',
    error
});

export const submitAction = values => ({
    type : 'SUBMIT_ACTION',
    values
});
export const registerLogout = () => ({
    type: 'REGISTER_LOGOUT'
});

export const registerMe = user => dispatch=> {
    dispatch(registerRequest());
    return fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(badData=> {
        return badData.json();
     })
    .then(goodData=> {
        if(goodData.error.status === 401){
            dispatch(registerError(goodData));
        }
        else {
            dispatch(registerSuccess(goodData))
        }
    })
    .catch(err=> {
        const {message, reason, location} = err;
        if (reason === 'ValidationError') {
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting message'
          })
       );
    });
};
export const editUserInfo = edits => dispatch => {
    dispatch(registerRequest());
    return fetch(`${API_BASE_URL}/api/users/update/${edits.id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${edits.token}`
        },
        body: JSON.stringify(edits)
    })
    .then(badData=> badData.json())
    .then(goodData=> {
        dispatch(authSuccess(goodData))
    })
    .catch(err=> dispatch(authError(err)));
};

export const deleteUser = user => dispatch => {
    dispatch(registerRequest());
    return fetch(`${API_BASE_URL}/api/users/deleteMe/${user.id}`, {
        method : 'DELETE',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(() => dispatch(clearAuth()))
    .catch(err=>dispatch(authError(err)));
};


import {API_BASE_URL} from '../config';

export const logsRequest = () => ({
    type : 'LOGS_REQUEST'
});
export const getLogsSuccess = payload => ({
    type : 'GET_LOGS_SUCCESS',
    "data" : payload
});
export const getFilteredLogsSuccess = data => ({
    type : 'GET_FILTERED_LOGS_SUCCESS',
    data
});
export const logsError = err => ({
    type : 'LOGS_ERROR',
    "error": err
});
export const logsLogout = () => ({
    type : 'LOGS_LOGOUT'
});
//get one api call
export const getLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs/${user.id.toString()}`,{
        method: 'GET', 
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(sloppyData=> sloppyData.json())
    .then(data=> {
        return dispatch(getLogsSuccess(data));
    })
    .catch(err=> dispatch(logsError(err)));
};
//get all api call
export const getAllLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs/`,{
        method: 'GET', 
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(sloppyData=> sloppyData.json())
    .then(data=> {
        return dispatch(getAllLogsSuccess(data));
    })
    .catch(err=> dispatch(logsError(err)));
}
export const getFilteredLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs/filter`,{
        method: 'POST', 
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body : JSON.stringify(user)
    })
    .then(sloppyData=> sloppyData.json())
    .then(data=> {
        return dispatch(getFilteredLogsSuccess(data));
    })
    .catch(err=> dispatch(logsError(err)));
};
export const getAllLogsSuccess = payload => ({
    type : 'GET_ALL_LOGS_SUCCESS',
    "data" : payload
});
export const createLogsSuccess = payload => ({
    type : 'CREATE_LOGS_SUCCESS',
    "data" : payload
});
export const editLogsSuccess = payload => ({
    type : 'EDIT_LOGS_SUCCESS',
    "data" : payload
});
export const removeLogsSuccess = payload => ({
    type : 'REMOVE_LOGS_SUCCESS',
    "data" : payload
});
//post api call
export const createNewLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs`, {
        method : 'POST',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(createLogsSuccess(data));
    })
    .catch(err=> {
        return dispatch(logsError(err));
    });
};

//put api call here
export const editLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs/${user.logsId}`, {
        method: 'PUT',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(editLogsSuccess(data));
    })
    .catch(err=> {
        return dispatch(logsError(err));
    });
};

//delete api call here
export const removeLogs = user => dispatch => {
    dispatch(logsRequest());
    return fetch(`${API_BASE_URL}/api/logs/${user.logsId}`, {
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(removeLogsSuccess(data));
    })
    .catch(err=> {
        return dispatch(logsError(err));
    });
};
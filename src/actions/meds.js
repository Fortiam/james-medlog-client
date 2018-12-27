import {API_BASE_URL} from '../config';

export const MedsRequest = () => ({
    type : 'MEDS_REQUEST'
});
export const getMedsSuccess = payload => ({
    type : 'GET_MEDS_SUCCESS',
    "data" : payload
});
export const MedsError = err => ({
    type : 'MEDS_ERROR',
    "error": err
});
export const getMeds = user => dispatch => {
    dispatch(MedsRequest());
    return fetch(`${API_BASE_URL}/api/meds/${user.id.toString()}`,{
        method: 'GET', 
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(sloppyData=> sloppyData.json())
    .then(data=> {
        return dispatch(getMedsSuccess(data));
    })
    .catch(err=> dispatch(MedsError(err)));
};
export const getAllMeds = user => dispatch => {
    dispatch(MedsRequest());
    return fetch(`${API_BASE_URL}/api/meds/`,{
        method: 'GET', 
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(sloppyData=> sloppyData.json())
    .then(data=> {
        return dispatch(getAllMedsSuccess(data));
    })
    .catch(err=> dispatch(MedsError(err)));
}
export const getAllMedsSuccess = payload => ({
    type : 'GET_ALL_MEDS_SUCCESS',
    "data" : payload
});
export const createMedsSuccess = payload => ({
    type : 'CREATE_MEDS_SUCCESS',
    "data" : payload
});
export const editMedsSuccess = payload => ({
    type : 'EDIT_MEDS_SUCCESS',
    "data" : payload
});
export const removeMedsSuccess = payload => ({
    type : 'REMOVE_MEDS_SUCCESS',
    "data" : payload
});
export const createNewMeds = user => dispatch => {
    dispatch(MedsRequest());
    return fetch(`${API_BASE_URL}/api/meds`, {
        method : 'POST',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(createMedsSuccess(data));
    })
    .catch(err=> {
        return dispatch(MedsError(err));
    });
};

export const editMeds = user => dispatch => {
    //put api call here
    dispatch(MedsRequest());
    return fetch(`${API_BASE_URL}/api/meds/${user.medsId}`, {
        method: 'PUT',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(editMedsSuccess(data));
    })
    .catch(err=> {
        return dispatch(MedsError(err));
    });
};

export const removeMeds = user => dispatch => {
    //delete api call here
    dispatch(MedsRequest());
    return fetch(`${API_BASE_URL}/api/meds/${user.medsId}`, {
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(removeMedsSuccess(data));
    })
    .catch(err=> {
        return dispatch(MedsError(err));
    });
};
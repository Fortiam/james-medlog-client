import {API_BASE_URL} from '../config';

export const patientInfoRequest = () => ({
    type : 'PATIENT_INFO_REQUEST'
});
export const getPatientInfoSuccess = payload => ({
    type : 'GET_PATIENT_INFO_SUCCESS',
    "data" : payload
});
export const patientInfoError = err => ({
    type : 'PATIENT_INFO_ERROR',
    "error": err
});
export const patientLogout = () => ({
    type : 'PATIENT_LOGOUT'
});

export const getPatientInfo = user => dispatch => {
    dispatch(patientInfoRequest());
    return fetch(`${API_BASE_URL}/api/patients/${user.id.toString()}`, {
        method : 'GET',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(getPatientInfoSuccess(data));
    })
    .catch(err=> {
        return dispatch(patientInfoError(err));
    });
};

export const getAllPatientsInfo = user => dispatch => {
    dispatch(patientInfoRequest());
    return fetch(`${API_BASE_URL}/api/patients/`, {
        method : 'GET',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(getAllPatientsInfoSuccess(data));
    })
    .catch(err=> {
        return dispatch(patientInfoError(err));
    });
};

export const getAllPatientsInfoSuccess = payload => ({
    type : 'GET_ALL_PATIENTS_INFO_SUCCESS',
    "data" : payload
});


export const createNewPatient = user => dispatch =>{
    //post api call here
    dispatch(patientInfoRequest());
    return fetch(`${API_BASE_URL}/api/patients/`, {
        method: 'POST',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(createNewPatientSuccess(data));
    })
    .catch(err=> {
        return dispatch(patientInfoError(err));
    });
};

export const createNewPatientSuccess = payload => ({
    type : 'CREATE_NEW_PATIENT_SUCCESS',
    "data" : payload
});

export const editPatient = user => dispatch => {
    //put api call here
    dispatch(patientInfoRequest());
    return fetch(`${API_BASE_URL}/api/patients/${user.patientId}`, {
        method: 'PUT',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify(user) 
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(editPatientSuccess(data));
    })
    .catch(err=> {
        return dispatch(patientInfoError(err));
    });
};

export const editPatientSuccess = payload => ({
    type : 'EDIT_PATIENT_SUCCESS',
    "data" : payload
});

export const removePatientInfo = user => dispatch => {
    //delete api call here
    dispatch(patientInfoRequest());
    return fetch(`${API_BASE_URL}/api/patients/${user.patientId}`, {
        method: 'DELETE',
        headers : {
            'content-type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
        }
    })
    .then(unJsonifiedData => unJsonifiedData.json())
    .then(data => {
        return dispatch(removePatientInfoSuccess(data));
    })
    .catch(err=> {
        return dispatch(patientInfoError(err));
    });
};

export const removePatientInfoSuccess = payload => ({
    type : 'REMOVE_PATIENT_INFO_SUCCESS',
    "data" : payload
});

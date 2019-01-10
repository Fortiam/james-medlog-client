//first import line is sync actions, second line is async actions
import { patientInfoRequest, getPatientInfoSuccess, patientInfoError, patientLogout, getAllPatientsInfoSuccess, createNewPatientSuccess, editPatientSuccess, removePatientInfoSuccess,
    getPatientInfo, getAllPatientsInfo, createNewPatient, editPatient, removePatientInfo } from '../../actions/patients';
import { API_BASE_URL } from '../../config';

    //the sync actions tests
describe('patientInfoRequest action', ()=>{
    it('Shoud return the action', ()=>{
        const action = patientInfoRequest();
        expect(action.type).toEqual('PATIENT_INFO_REQUEST');
    });
});
describe('getPatientInfoSuccess', ()=>{
    it('Should return the action', ()=>{
        const theData = "Success";
        const action = getPatientInfoSuccess(theData);
        expect(action.type).toEqual('GET_PATIENT_INFO_SUCCESS');
        expect(action.data).toEqual('Success');
    });
});
describe('patientInfoError', ()=>{
    it('Should return the action', ()=>{
        const theData = "Error";
        const action = patientInfoError(theData);
        expect(action.type).toEqual('PATIENT_INFO_ERROR');
        expect(action.error).toEqual('Error');
    });
});
describe('patientLogout action', ()=>{
    it('Shoud return the action', ()=>{
        const action = patientLogout();
        expect(action.type).toEqual('PATIENT_LOGOUT');
    });
});
describe('getAllPatientsInfoSuccess', ()=>{
    it('Should return the action', ()=>{
        const theData = "Success";
        const action = getAllPatientsInfoSuccess(theData);
        expect(action.type).toEqual('GET_ALL_PATIENTS_INFO_SUCCESS');
        expect(action.data).toEqual('Success');
    });
});
describe('createNewPatientSuccess', ()=>{
    it('Should return the action', ()=>{
        const theData = "Success";
        const action = createNewPatientSuccess(theData);
        expect(action.type).toEqual('CREATE_NEW_PATIENT_SUCCESS');
        expect(action.data).toEqual('Success');
    });
});
describe('editPatientSuccess', ()=>{
    it('Should return the action', ()=>{
        const theData = "Success";
        const action = editPatientSuccess(theData);
        expect(action.type).toEqual('EDIT_PATIENT_SUCCESS');
        expect(action.data).toEqual('Success');
    });
});
describe('removePatientInfoSuccess', ()=>{
    it('Should return the action', ()=>{
        const theData = "Success";
        const action = removePatientInfoSuccess(theData);
        expect(action.type).toEqual('REMOVE_PATIENT_INFO_SUCCESS');
        expect(action.data).toEqual('Success');
    });
});
//the async actions tests
describe('getPatientInfo async action', ()=>{
    it('Should dispatch a patientInfoRequest sync action', ()=>{
        let serverResponse = "small simple server success string";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        return getPatientInfo({"id": "1", "token": "111111111111"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'GET',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer 111111111111`
            }});
            expect(dispatch).toHaveBeenCalledWith(patientInfoRequest());
        });
    });
    it('Should dispatch a getPatientInfoSuccess action on success', ()=>{
        let serverResponse = "error message here";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        return getPatientInfo({"id": "1", "token": "111111111111"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'GET',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer 111111111111`
            }});
            expect(dispatch).toHaveBeenCalledWith(getPatientInfoSuccess(serverResponse));
        });
    });
    it('Should dispatch patientInfoError on an error', ()=>{
        let serverResponse = "small simple server success string";
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject({"error" : serverResponse})
            );
        const dispatch = jest.fn();
        return getPatientInfo({"id": "1", "token": "111111111111"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'GET',
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer 111111111111`
                }}
            );
            expect(dispatch).toHaveBeenCalledWith(patientInfoError({"error": serverResponse}));
        });
    });
});
describe('getAllPatientsInfo async action', ()=>{
    it('Should dispatch a patientInfoRequest sync action', ()=>{
        let serverResponse = "??";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        return getAllPatientsInfo({"token": "111111111112"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'GET',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer 111111111112`
            }});
            expect(dispatch).toHaveBeenCalledWith(patientInfoRequest());
        });
    });

    it('Should dispatch a getAllPatientsInfoSuccess action on success', ()=>{
        let serverResponse = "??";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        return getAllPatientsInfo({"token": "111111111112"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'GET',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer 111111111112`
            }});
            expect(dispatch).toHaveBeenCalledWith(getAllPatientsInfoSuccess(serverResponse));
        }); 
    });
    it('Should dispatch patientInfoError on an error', ()=>{
        let serverResponse = "short simple server sad string";
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject({"error" : serverResponse})
            );
        const dispatch = jest.fn();
        return getAllPatientsInfo({"token": "111111111111"})(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'GET',
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer 111111111111`
                }}
            );
            expect(dispatch).toHaveBeenCalledWith(patientInfoError({"error": serverResponse}));
        }); 
    });
});
describe('createNewPatient async action', ()=>{
    it('Should dispatch a patientInfoRequest sync action', ()=>{
        let serverResponse = "not being tested in this it-block";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111112", data: {name: "some personal info.."}};
        return createNewPatient(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'POST',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            },
            body: JSON.stringify(newPatientData)
        });
            expect(dispatch).toHaveBeenCalledWith(patientInfoRequest());
        });
    });
    it('Should dispatch a createNewPatientSuccess action on success', ()=>{
        let serverResponse = "tested on line 43";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111112", data: {name: "some personal info.."}};
        return createNewPatient(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'POST',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            },
            body: JSON.stringify(newPatientData)
        });
            expect(dispatch).toHaveBeenCalledWith(createNewPatientSuccess(serverResponse));
        });
    });
    it('Should dispatch patientInfoError on an error', ()=>{
        let serverResponse = "error string again";
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject({"error" : serverResponse})
            );
        const dispatch = jest.fn();
        const patientData = {"token": "111111111111"};
        return createNewPatient(patientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/`, { method : 'POST',
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer 111111111111`
                },
                body : JSON.stringify(patientData)
            });
            expect(dispatch).toHaveBeenCalledWith(patientInfoError({"error": serverResponse}));
        });
    });
});
describe('editPatient async action', ()=>{
    it('Should dispatch a patientInfoRequest sync action', ()=>{
        let serverResponse = "not being tested in this it-block";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111113", patientId: '1', data: {name: "some new personal info.."}};
        return editPatient(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'PUT',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            },
            body: JSON.stringify(newPatientData)
        });
            expect(dispatch).toHaveBeenCalledWith(patientInfoRequest());
        }); 
    });
    it('Should dispatch editPatientSuccess action on success', ()=>{
        let serverResponse = "not being tested in this it-block";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111113", patientId: '1', data: {name: "some new personal info.."}};
        return editPatient(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'PUT',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            },
            body: JSON.stringify(newPatientData)
        });
            expect(dispatch).toHaveBeenCalledWith(editPatientSuccess(serverResponse));
        }); 
    });
    it('Should dispatch patientInfoError on an error', ()=>{
        let serverResponse = "error string again";
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject({"error" : serverResponse})
            );
        const dispatch = jest.fn();
        const patientData = {"token": "111111111111", patientId: '1'};
        return editPatient(patientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'PUT',
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer ${patientData.token}`
                },
                body : JSON.stringify(patientData)
            });
            expect(dispatch).toHaveBeenCalledWith(patientInfoError({"error": serverResponse}));
        });
    });
});
describe('removePatientInfo async action', ()=>{
    it('Should dispatch a patientInfoRequest sync action', ()=>{
        let serverResponse = "not being tested in this it-block";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111113", patientId: '1', data: {name: "some new personal info.."}};
        return removePatientInfo(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'DELETE',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            }
        });
            expect(dispatch).toHaveBeenCalledWith(patientInfoRequest());
        }); 
    });
    it('Should dispatch removePatientInfoSuccess action on success', ()=>{
        let serverResponse = "not being tested in this it-block";
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json() {
                return serverResponse;
            }
        })
        );
        const dispatch = jest.fn();
        const newPatientData = {token: "111111111113", patientId: '1', data: {name: "some REDACTED personal info.."}};
        return removePatientInfo(newPatientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'DELETE',
            headers : {
                'content-type': 'application/json',
                'Authorization' : `Bearer ${newPatientData.token}`
            }
        });
            expect(dispatch).toHaveBeenCalledWith(removePatientInfoSuccess(serverResponse));
        }); 
    });
    it('Should dispatch patientInfoError on an error', ()=>{
        let serverResponse = "error string again";
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject({"error" : serverResponse})
            );
        const dispatch = jest.fn();
        const patientData = {"token": "111111111111", patientId: '1'};
        return removePatientInfo(patientData)(dispatch).then(()=>{
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/patients/1`, { method : 'DELETE',
                headers : {
                    'content-type': 'application/json',
                    'Authorization' : `Bearer ${patientData.token}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(patientInfoError({"error": serverResponse}));
        });
    });
});
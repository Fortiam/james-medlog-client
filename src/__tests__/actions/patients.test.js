import { patientInfoRequest, getPatientInfoSuccess, patientInfoError, patientLogout, getAllPatientsInfoSuccess, createNewPatientSuccess, editPatientSuccess, removePatientInfoSuccess,  } from '../../actions/patients';

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
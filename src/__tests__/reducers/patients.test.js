import { patienceReducer } from '../../reducers/patients';
import {patientInfoRequest, getPatientInfoSuccess, patientInfoError, patientLogout, getAllPatientsInfoSuccess, createNewPatientSuccess, editPatientSuccess, removePatientInfoSuccess } from '../../actions/patients';

describe('patienceReducer', ()=>{
    it('Should setup inital State', ()=>{
        const state = patienceReducer(undefined, {type: '__TEST'});
        expect(state).toEqual({
            listOfOwnedByUser : [{
                name : null,
                age : null,
                gender : null,
                height : null,
                weight : null,
                doctor : {name:"Dr. Name goes here", contact: "Dr. contact info goes here"},
                allergies : null,
                medsCurrentlyOn : [{
                    name : null,
                    medId : null,
                }],
            }],
            loading : false,
            error : null
        });
    });
    it('Should return the state if action was not found', ()=>{
        const emptyState= {};
        const state = patienceReducer(emptyState, {type: '__UNDEFINED'});
        expect(state).toBe(emptyState);
    });
    describe('patientInfoRequest action through the patienceReducer',()=>{
        it('Should set loading in the state to true', ()=>{
            let state= {
                listOfOwnedByUser : [{
                    name : null,
                    age : null,
                    gender : null,
                    height : null,
                    weight : null,
                    doctor : {name:"Dr. Name goes here", contact: "Dr. contact info goes here"},
                    allergies : null,
                    medsCurrentlyOn : [{
                        name : null,
                        medId : null,
                    }],
                }],
                loading : false,
                error : null
            };
            state = patienceReducer(state, patientInfoRequest());
            expect(state.loading).toEqual(true);
        });
    });
});
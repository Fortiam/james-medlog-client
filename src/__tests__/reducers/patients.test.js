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
            expect(state.error).toEqual(null);
        });
    });
    describe('patientInfoError action >> patienceReducer', ()=>{
        it('Should set loading to false and error to the action error', ()=>{
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
            state = patienceReducer(state, patientInfoError({"message": "invalid error paradox"}));
            expect(state.loading).toEqual(false);
            expect(state.error).toEqual({"message": "invalid error paradox"});
        });
    });
    describe('patientLogout action through the patienceReducer', ()=>{
        it('Should set state patient list array to empty init values',()=>{
            let state= {
                listOfOwnedByUser : [{
                    name : 'before',
                    age : 21,
                    gender : 'm',
                    height : 'tall',
                    weight : 'ok',
                    doctor : {name:"Dr. Who", contact: "..The Doctor"},
                    allergies : 'none',
                    medsCurrentlyOn : [{
                        name : 'sample',
                        medId : 123456789112,
                    }],
                    id: 12345
                }],
                loading : false,
                error : null
            };
            state = patienceReducer(state, patientLogout());
            expect(state).toEqual({
                listOfOwnedByUser : [{
                    name : null,
                    age : null,
                    gender : null,
                    height : null,
                    weight : null,
                    doctor : {name:"Dr. Name goes here", contact:"Dr. contact info goes here"},
                    allergies : null,
                    medsCurrentlyOn : [{
                        name : null,
                        medId : null,
                    }],
                }],
                loading: false,
                error : null
            });
        });
    });
    describe('getAllPatientsInfoSuccess through patienceReducer', ()=>{
        it('Should populate the state with the actions data', ()=>{
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
            let serverResponseData = [{
                    name : "person1",
                    age : 1,
                    gender : "m",
                    height : "tall",
                    weight : "too much",
                    doctor : {name:"Dr. One", contact: "info1"},
                    allergies : "life",
                    medsCurrentlyOn : [{
                        name : "milk",
                        medId : 123456789101,
                    }],
                },
                {
                    name : "person2",
                    age : 100,
                    gender : "f",
                    height : "short",
                    weight : "too little",
                    doctor : {name:"Dr. Two", contact: "info2"},
                    allergies : "milk",
                    medsCurrentlyOn : [{
                        name : "life",
                        medId : 123456789102,
                    }]
                }
            ];
            state= patienceReducer(state, getAllPatientsInfoSuccess(serverResponseData));
            expect(state.loading).toBe(false);
            expect(state.error).toBe(null);
            expect(state.listOfOwnedByUser[0]).toEqual({
                name : "person1",
                age : 1,
                gender : "m",
                height : "tall",
                weight : "too much",
                doctor : {name:"Dr. One", contact: "info1"},
                allergies : "life",
                medsCurrentlyOn : [{
                    name : "milk",
                    medId : 123456789101,
                }]
            });
            expect(state.listOfOwnedByUser[1]).toEqual({
                name : "person2",
                age : 100,
                gender : "f",
                height : "short",
                weight : "too little",
                doctor : {name:"Dr. Two", contact: "info2"},
                allergies : "milk",
                medsCurrentlyOn : [{
                    name : "life",
                    medId : 123456789102,
                }]
            });
        });
    });
    describe('getPatientInfoSuccess >> patienceReducer', ()=>{
        it('Should ensure a single patient data matches state with SoT', ()=>{
            let state= {
                listOfOwnedByUser : [{
                    id: 1,
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
            let serverResponseData = {
                id: 1,
                name : "person1",
                age : 1,
                gender : "m",
                height : "tall",
                weight : "too much",
                doctor : {name:"Dr. One", contact: "info1"},
                allergies : "life",
                medsCurrentlyOn : [{
                    name : "milk",
                    medId : 123456789101,
                }],
            };
            state = patienceReducer(state, getPatientInfoSuccess(serverResponseData));
            expect(state).toEqual({
                listOfOwnedByUser : [{
                    id: 1,
                    name : "person1",
                    age : 1,
                    gender : "m",
                    height : "tall",
                    weight : "too much",
                    doctor : {name:"Dr. One", contact: "info1"},
                    allergies : "life",
                    medsCurrentlyOn : [{
                        name : "milk",
                        medId : 123456789101,
                    }],
                }],
                loading : false,
                error : null
            });
        });
    });
    describe('createNewPatientSuccess >> patienceReducer', ()=>{
        //normally <get all patients> on app load, clears out the null inital person object,
        //but since we are only testing the create post reducer state part, 
        //will just have the null + the new person data
        it("should add a new patient to the state", ()=>{
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
            let serverResponseData = {
                name : "person1",
                age : 1,
                gender : "m",
                height : "tall",
                weight : "too much",
                doctor : {name:"Dr. One", contact: "info1"},
                allergies : "life",
                medsCurrentlyOn : [{
                    name : "milk",
                    medId : 123456789101,
                }],
            };
            state = patienceReducer(state, createNewPatientSuccess(serverResponseData));
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
                        }]
                    }
                    ,{
                    name : "person1",
                    age : 1,
                    gender : "m",
                    height : "tall",
                    weight : "too much",
                    doctor : {name:"Dr. One", contact: "info1"},
                    allergies : "life",
                    medsCurrentlyOn : [{
                        name : "milk",
                        medId : 123456789101,
                    }],
                }],
                loading : false,
                error : null
            });
        });
    });
    describe('editPatientSuccess >> patienceReducer', ()=>{
        it('Should update the state based on the server response', ()=>{
            let state= {
                listOfOwnedByUser :[{
                        name : "person1",
                        age : 1,
                        gender : "m",
                        height : "tall",
                        weight : "too much",
                        doctor : {name:"Dr. One", contact: "info1"},
                        allergies : "life",
                        medsCurrentlyOn : [{
                            name : "milk",
                            medId : 123456789101,
                        }],
                        id: 1
                    },
                    {
                        name : "person2",
                        age : 100,
                        gender : "f",
                        height : "short",
                        weight : "too little",
                        doctor : {name:"Dr. Two", contact: "info2"},
                        allergies : "milk",
                        medsCurrentlyOn : [{
                            name : "life",
                            medId : 123456789102,
                        }],
                        id: 2
                    }
                ],
                loading : false,
                error : null
            };
            state = patienceReducer(state, editPatientSuccess({
                name : "person2",
                age : 29,
                gender : "f",
                height : "short",
                weight : "redacted",
                doctor : {name:"Dr. Two", contact: "info2"},
                allergies : "milk",
                medsCurrentlyOn : [{
                    name : "life",
                    medId : 123456789102,
                }],
                id: 2
            }));
            expect(state).toEqual({
                listOfOwnedByUser :[{
                        name : "person1",
                        age : 1,
                        gender : "m",
                        height : "tall",
                        weight : "too much",
                        doctor : {name:"Dr. One", contact: "info1"},
                        allergies : "life",
                        medsCurrentlyOn : [{
                            name : "milk",
                            medId : 123456789101,
                        }],
                        id: 1
                    },
                    {
                        name : "person2",
                        age : 29,
                        gender : "f",
                        height : "short",
                        weight : "redacted",
                        doctor : {name:"Dr. Two", contact: "info2"},
                        allergies : "milk",
                        medsCurrentlyOn : [{
                            name : "life",
                            medId : 123456789102,
                        }],
                        id: 2
                    }
                ],
                loading : false,
                error : null
            });
        });
    });
    describe('sync action removePatientInfoSuccess >> patienceReducer', ()=>{
        it("Should remove the person in the state", ()=>{
            let state= {
                listOfOwnedByUser :[{
                        name : "person1",
                        age : 1,
                        gender : "m",
                        height : "tall",
                        weight : "too much",
                        doctor : {name:"Dr. One", contact: "info1"},
                        allergies : "life",
                        medsCurrentlyOn : [{
                            name : "milk",
                            medId : 123456789101,
                        }],
                        id: 1
                    },
                    {
                        name : "person2",
                        age : 100,
                        gender : "f",
                        height : "short",
                        weight : "too little",
                        doctor : {name:"Dr. Two", contact: "info2"},
                        allergies : "milk",
                        medsCurrentlyOn : [{
                            name : "life",
                            medId : 123456789102,
                        }],
                        id: 2
                    }
                ],
                loading : false,
                error : null
            };
            //the async action has the id to remove object (id:1)
            //the success sync data here is the remaining source of truth array
            let serverResponseData = [{
                name : "person2",
                age : 100,
                gender : "f",
                height : "short",
                weight : "too little",
                doctor : {name:"Dr. Two", contact: "info2"},
                allergies : "milk",
                medsCurrentlyOn : [{
                    name : "life",
                    medId : 123456789102,
                }],
                id: 2
            }];
            state = patienceReducer(state, removePatientInfoSuccess(serverResponseData));
            expect(state).toEqual({
                listOfOwnedByUser :[{
                    name : "person2",
                    age : 100,
                    gender : "f",
                    height : "short",
                    weight : "too little",
                    doctor : {name:"Dr. Two", contact: "info2"},
                    allergies : "milk",
                    medsCurrentlyOn : [{
                        name : "life",
                        medId : 123456789102,
                    }],
                    id: 2
                }],
                loading: false,
                error: null
            });
        });
    });
});
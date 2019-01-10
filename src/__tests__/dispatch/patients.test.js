import React from 'react';
import { shallow, mount } from 'enzyme';
import {Home} from '../../components/home';
import { BrowserRouter, Route } from 'react-router-dom';
const MockGetPatientInfo = {
    type: 'GET_PATIENT_INFO'
};
const MockGetAllPatientsInfo = {
    type: 'GET_ALL_PATIENTS_INFO'
};
const MockCreateNewPatient = {
    type: 'createNewPatient'
};
const MockEditPatient = {
    type: 'editPatient'
};
const MockRemovePatientInfo = {
    type: 'removePatientInfo'
};
jest.mock('../../actions/patients', ()=> Object.assign({},
    require.requireActual('../../actions/patients'),
    {
        getPatientInfo : jest.fn().mockImplementation(() => {
            return MockGetPatientInfo;
        }),
        getAllPatientsInfo : jest.fn().mockImplementation(() => {
            return MockGetAllPatientsInfo;
        }),
        createNewPatient : jest.fn().mockImplementation(() => {
            return MockCreateNewPatient;
        }),
        editPatient : jest.fn().mockImplementation(() => {
            return MockEditPatient;
        }),
        removePatientInfo : jest.fn().mockImplementation(() => {
            return MockRemovePatientInfo;
        })
    }
));
describe('the Home component', ()=>{
    // props.loggedIn false>>true
    it('should first render with the mock actions setup without crashing', ()=>{
        shallow(<Home />);
    });
    
    // it('Should dispatch getAllPatientsInfo on login',()=>{
    //     const wrapper = mount(<Home loggedIn={null}/>);
    //     const dispatch = jest.fn();
    //     console.log("X:------------------------ ", wrapper.debug());
    // });
});

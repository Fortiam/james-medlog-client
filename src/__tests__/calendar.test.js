import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';
import { Redirect } from 'react-router-dom';
import {Calendar} from '../components/calendar';

describe('the <Calendar /> component', ()=>{
    it('Renders without crashing', () => {
        shallow(<Calendar />);
    });
    it('redirects to login-screen if not logged In', ()=>{
        const wrapper = shallow(<Calendar loggedId={false}/>);
        expect(wrapper.contains(<Redirect to='/login' />)).toEqual(true);
    });
    
    it('should render the calendar if logged in', ()=>{
        const patientsArray = [{name: 'one'}, {name: 'two'}];
        const medsArray = [{id: 1}, {id: 2}];
        const eventsArray = [];
        const wrapper = shallow(<Calendar
             loggedId={true}
             patients={patientsArray}
             meds={medsArray}
             events={eventsArray}
             />);
        expect(wrapper.hasClass('center')).toEqual(true);

    });
});

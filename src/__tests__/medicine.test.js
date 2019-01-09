import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { MedsSingle } from '../components/meds_single';
import {Medicine} from '../components/medicine';

describe('the <Medicine /> component', () => {
       
    it('Renders without crashing', () => {
        shallow(<Medicine />);
    });
    it('Redirects to / if not logged in', ()=>{
        const wrapper = shallow(<Medicine loggedId={false} />);
        expect(wrapper.contains(<Redirect to='/' />)).toEqual(true);
    });

    it('Should render a no meds message if logged in and meds (state) array is empty', ()=>{
        const wrapper = shallow(<Medicine loggedId={true} manyMeds={[]} />);
        expect(wrapper.hasClass('list')).toEqual(true);
        expect(wrapper.find('.innerlist').contains(<p className='innerlist'>No Meds have been added yet.</p>)).toEqual(true);
    });

    it('Should render an Array of MedsSingle components if logged in and state has array data', ()=>{
        //from map state to props*
        const medsArray = [{id: 42, name:"tylenol", rateAmount: 10, howLongAmount: 30}];
        const wrapper = shallow(<Medicine loggedId={true} manyMeds={medsArray} />);
        //console.log("X: ", wrapper.debug());
        //expect(wrapper.find(<MedsSingle />))
    });
});
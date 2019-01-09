import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';
import {Welcome} from '../components/welcome';

describe('the <Welcome /> component', () => {
    it('Renders without crashing', () => {
        shallow(<Welcome />);
    });

    it('redirects to calendar if logged in', ()=>{
        const wrapper = shallow(<Welcome token={true}/>);
        expect(wrapper.contains(<Redirect to="/calendar" />)).toEqual(true);
    });
    
    it('renders the welcome page if not logged in', ()=>{
        const wrapper = shallow(<Welcome token={false}/>);
        expect(wrapper.hasClass('landingBackground')).toEqual(true);
        const theButton = wrapper.find('button');
        expect(theButton.hasClass('buttonRight')).toEqual(true);
        const theSpan = wrapper.find('span');
        expect(theSpan.hasClass('quick')).toEqual(true);
    });

    // it('has a Try Demo button that is clickable', ()=>{
    //     const wrapper = mount(<Welcome token={false} />);
    //     const theButton = wrapper.find('button');
    //     expect(theButton.hasClass('buttonRight')).toEqual(true);
    //     theButton.simulate('click');

    //     console.log("here: ", theButton.debug());
    // });
});
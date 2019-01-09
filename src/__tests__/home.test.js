import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';

import {Home} from '../components/home';

describe('the <Home /> component', () => {
    it('Renders without crashing', () => {
        shallow(<Home />);
    });
    it('Renders the home div for the Routes', ()=>{
        const wrapper = shallow(<Home />);
        const findVar = wrapper.find('.home');
        expect(findVar.hasClass('home')).toEqual(true);
    });
});
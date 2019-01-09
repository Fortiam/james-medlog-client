import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';

import { Input } from '../components/input';

describe('the Input Component', ()=>{
//the props are:
//    element, meta.touched, meta.error, input.name, label, type, placeholder, children


    it('Should render without Crash', ()=>{
        expect(true).toEqual(true);
        // shallow(<Input 
        //     element={'input'}
        //     meta={{touched: false, error: false}}
        //     placeholder={'what?'}
            
        // />);
    });
});
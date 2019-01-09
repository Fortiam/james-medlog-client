import React from 'react';
import { shallow } from 'enzyme';

import FormLogin from '../components/formLogin';

describe('the FormLogin component', ()=>{
    it('renders without crashing', ()=>{
        shallow(<FormLogin />);
    });
});
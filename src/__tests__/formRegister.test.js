import React from 'react';
import { shallow } from 'enzyme';

import FormRegister from '../components/formRegister';

describe('the FormLogin component', ()=>{
    it('renders without crashing', ()=>{
        shallow(<FormRegister />);
    });
});
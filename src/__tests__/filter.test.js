import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';

import Filter from '../components/filter';

describe('the <Home /> component', () => {
    //the props for Filter for tests
    const callback = jest.fn();
    const displayNames = ['james', 'mira'];
    const displayMeds = ['tylenol', 'advil'];
    
    it('Renders without crashing', () => {
        shallow(<Filter 
            submitProp={callback}
            displayNamesProp={displayNames}
            displayMedsProp={displayMeds}
        />);
    });
    
});
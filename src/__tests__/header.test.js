import React from 'react';
import { shallow/*, mount*/ } from 'enzyme';
import { Link } from 'react-router-dom';
import {Header} from '../components/header';

describe('the <Home /> component', () => {
    //--props--
    const historyArray = ['/', '/login', '/calendar'];
    //--the loggedIn prop is a boolean from mapStateToProps--;
    //--the state is {toggle: boolean}--
    
    it('Renders without crashing', () => {
        shallow(<Header history={historyArray}/>);
    });

    it('Should render the register/login bar if not logged in', ()=>{
        const wrapper = shallow(<Header history={historyArray} loggedIn={false} />);
        expect(wrapper.contains(<div className='inlineBlock welcomeText'>
                    <Link className='navFooter' to="/register" >Register</Link>
                    <Link className='navFooter' to="/login">Log-in</Link>
                    <a href='/privacy.html' className='navFooter'>Privacy Policy</a>
                    <p className='big'>MedLog</p>
            </div>)).toEqual(true);
        expect(wrapper.hasClass('welcomeText')).toEqual(true);
    });

    it('Should render the navigation menu bar if user is logged in', ()=>{
        const wrapper = shallow(<Header history={historyArray} loggedIn={true} />);
        expect(wrapper.hasClass('OverContainer')).toEqual(true);
        expect(wrapper.contains(<span className='big navContents'>MedLog</span>)).toEqual(true);
        
    });

});
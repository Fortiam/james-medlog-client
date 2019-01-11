import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';
import {NavMenu} from '../components/navMenu';

describe('the NavMenu component', ()=>{
    //component passed props are:
    //showUp={this.state.toggle}//boolean
    //switch={()=>this.toggleShowMenu()}//this.setState for toggle bool
    it('Should render without Crashing', ()=>{
        shallow(<NavMenu />);
    });
    it('Should be empty if showUp prop is false', ()=>{
        const wrapper = shallow(<NavMenu showUp={false} />);
        expect(wrapper.contains(<div></div>)).toEqual(true);
    });
    it('Should render the nav menu if showUp is true', ()=>{
        const wrapper = shallow(<NavMenu showUp={true} />);
        expect(wrapper.hasClass('navmenu')).toEqual(true);
    });

    it('Should call the onClick prop function <i.e. switch> if a Link is clicked', ()=>{
        const callback = jest.fn();
        const wrapper = mount(<BrowserRouter><NavMenu showUp={true} switch={callback} /></BrowserRouter>);
        const findVar = wrapper.find('Link[to="/calendar"]');
        findVar.simulate('click');
        expect(callback).toHaveBeenCalled();
    });
   
    it('testing how multiple jest calls work..', ()=>{
        const callback = jest.fn();
        const wrapper = mount(<BrowserRouter><NavMenu showUp={true} switch={callback} /></BrowserRouter>);
        const findVar = wrapper.find('Link[to="/log"]');
        const findVar2 = wrapper.find('Link[to="/calendar"]');
        const findVar3 = wrapper.find('Link[to="/patient"]');
        findVar.simulate('click');
        findVar2.simulate('click');
        findVar3.simulate('click');
        expect(callback.mock.calls.length).toBe(3);
    });

    it('Should not call jest function if the non-Link navmenu bar is clicked',()=>{
        const callback = jest.fn();
        const wrapper = mount(<BrowserRouter><NavMenu showUp={true} switch={callback} /></BrowserRouter>);
        wrapper.simulate('click');
        const wrapper2 = shallow(<NavMenu showUp={true} />);
        wrapper2.simulate('click');
        const findVar = wrapper.find('.navmenu');
        findVar.simulate('click');
        expect(findVar.hasClass('navmenu')).toEqual(true);
        expect(wrapper2.hasClass('navmenu')).toEqual(true);
        const whatwhat = wrapper.find(NavMenu);
        whatwhat.simulate('click');
        const whatNested = whatwhat.find('.navmenu');
        whatNested.simulate('click');
        expect(whatNested.hasClass('navmenu')).toEqual(true);
        expect(callback).not.toHaveBeenCalled();
    });
});

  
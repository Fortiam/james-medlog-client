import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { medsLogout } from '../actions/meds';
import { patientLogout } from '../actions/patients';
import { registerLogout } from '../actions/register';
import { eventsLogout } from '../actions/events';
import { logsLogout } from '../actions/log';
import { clearAuthToken } from '../local-storage';
import NavMenu from './navMenu';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle : false
        }
    }
    hamburger(){
        this.setState({toggle : !this.state.toggle});
    }
    handleLogOut(){
        this.props.dispatch(medsLogout());
        this.props.dispatch(patientLogout());
        this.props.dispatch(registerLogout());
        this.props.dispatch(eventsLogout());
        this.props.dispatch(logsLogout());
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    render(){
        if(this.props.loggedIn){
            return (<div className='OverContainer'>
            <div className='inlineBlock navContainer'>
            <span className='big navContents'>MedLog</span>
            <button onClick={()=>this.hamburger()} type='button' className='left navContents' ><i className="fas fa-bars"></i></button>
            </div>
            <NavMenu showUp={this.state.toggle} />
            </div>);
        } else {
        return (<div className='inlineBlock'>
                    <span className='big'>Welcome to MedLog!</span>
                </div>);
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
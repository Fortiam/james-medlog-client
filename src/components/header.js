import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { medsLogout } from '../actions/meds';
import { patientLogout } from '../actions/patients';
import { registerLogout } from '../actions/register';
import { eventsLogout } from '../actions/events';
import { logsLogout } from '../actions/log';
import { clearAuthToken } from '../local-storage';

class Header extends Component {
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
            return (<div className='inlineBlock'>
            <span className='big'>Welcome to MedLog!</span>
            <Link to="/" className='right' onClick={()=>this.handleLogOut()} ><i className="fas fa-sign-out-alt"></i></Link>
            <Link to="/main" className='left' ><i className="fas fa-bars"></i></Link>
        </div>);
        } else {
        return (<div className='inlineBlock'>
                    <span className='big'>Welcome to MedLog!</span>
                </div>);
        }
    }
}
//change me to like a nav bar or a log-in log-out panel, or something
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
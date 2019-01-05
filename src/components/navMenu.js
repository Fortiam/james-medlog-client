import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import { clearAuth } from '../actions/auth';
import { medsLogout } from '../actions/meds';
import { patientLogout } from '../actions/patients';
import { registerLogout } from '../actions/register';
import { eventsLogout } from '../actions/events';
import { logsLogout } from '../actions/log';
import { clearAuthToken } from '../local-storage';
// import { Redirect } from 'react-router-dom';
class NavMenu extends Component {
    doLogout(){
        this.props.dispatch(medsLogout());
        this.props.dispatch(patientLogout());
        this.props.dispatch(registerLogout());
        this.props.dispatch(eventsLogout());
        this.props.dispatch(logsLogout());
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    render(){
       
        if (this.props.showUp) {
            return (<div className='navmenu'>
            <p><Link to="/calendar" onClick={()=>this.props.switch()}>Visit Calendar</Link></p>
                <p><Link to='/patient' onClick={()=>this.props.switch()}>Family Member</Link></p>
                <p><Link to="/medicine" onClick={()=>this.props.switch()}>Medicine</Link></p>
                <p><Link to="/userinfo" onClick={()=>this.props.switch()}>Account Details</Link></p>
                <p><Link to='/treatment' onClick={()=>this.props.switch()}>Treatment</Link></p>
            <p><Link to='/log' onClick={()=>this.props.switch()} >Journal</Link></p>
            <p onClick={()=>this.doLogout()}>Log-out</p>
            </div>);
        }
        else {
            return (<div></div>);
        }
    }
}
const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser !== null
});
export default connect(mapStateToProps)(NavMenu)
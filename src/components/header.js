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
import NavMenu from './navMenu';

export class Header extends Component {
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
            <NavMenu showUp={this.state.toggle} switch={()=>this.hamburger()}/>
            </div>);
        } else {
        return (<div className='inlineBlock welcomeText'>
                    <Link className='navFooter' to="/register" >Register</Link>
                    <Link className='navFooter' to="/login">Log-in</Link>
                    <a href='/privacy.html' className='navFooter'>Privacy Policy</a>
                    <p className='big'>MedLog</p>
                </div>);
        }
    }
}
//privacy.html as an .html file instead of a /privacy path for google calendar api OAuth2 criteria
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
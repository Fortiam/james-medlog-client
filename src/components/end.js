import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import {OneName} from './oneName';
// import {OneMed} from './oneMed';
//import { createNewEvent, clearCurrentEvent } from '../actions/events';
//import moment from 'moment';

class End extends Component {
    render(){
        if(this.props.loggedIn){
            return (<div>Hello,
                <p><Link to="/main" >Return to homepage</Link></p>
            </div>);
        }
        else {
            return (<div>Hello there, 
                <Link to='/login'>please Log-in!</Link>
                </div>);
        }
    }
}
const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser !== null,
    token : state.auth.authToken,
});
export default connect(mapStateToProps)(End);
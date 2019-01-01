import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm} from 'redux-form';


class Main extends Component {
      
    render(){
     if(this.props.loggedIn){
         return (<div>
            <h2>Welcome to the Home Page!</h2>
            <p><Link to="/calendar" >Visit Calendar</Link></p>
            <p><Link to='/patient' >Add/Edit/Remove a Family Member or pet</Link></p>
            <p><Link to="/medicine" >Add/Edit custom Medicine</Link></p>
            <p><Link to="/userinfo" >View/Edit Account Details</Link></p>
            <p><Link to='/begin' >Begin Treatment</Link></p>
            <p><Link to='/end' >Stop Treatment</Link></p>
            <p><Link to='/log' >Log, Journal, Records Page</Link></p>
            </div>)
     }
       else return (<div>Hi!
           <p><Link to='/login'>Please Log-in!</Link></p>
           </div>);
    }
}
const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser !== null,
    whereTo : state.events.whereTo,
    didReset: state.form,
    token : state.auth.authToken,
    listOfOwnedByUser : [...state.patients.listOfOwnedByUser]
});

export default reduxForm({
    form: 'login',

})(connect(mapStateToProps)(Main));
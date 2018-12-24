import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, destroy } from 'redux-form';

class Main extends Component {
    componentDidMount(){
        console.log("reset did go");
       this.props.dispatch(destroy())
       
    }

    render(){
     if(this.props.loggedIn){
         return (<div>
            <h2>Welcome to the Home Page!</h2>
            <p><Link to="/calendar" >Visit Calendar</Link></p>
            <p><Link to='/patient' >Add/Edit new Family Member/pet</Link></p>
            <p><Link to="/medicine" >Add/Edit custom Medicine</Link></p>
            <p><Link to="/userinfo" >View/Edit Account Details</Link></p>
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
    didReset: state.form
});
//export default connect(mapStateToProps)(Main);
export default reduxForm({
    form: 'login',

})(connect(mapStateToProps)(Main));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Userinfo extends Component {
    render(){
        const info = ["First Name: ", "Last Name: ", "Email Address: ", "MedLog will sync schedule with email account: "];
        const userInfo = [this.props.firstName, this.props.lastName, this.props.email, this.props.useEmailForApi];
        const displayInfo = info.map((field, index) => userInfo[index]? (<li key={index}>{field.concat(userInfo[index])}</li>) : (<li key={index}>{field.concat("Optional field is blank..")}</li>));
        if(this.props.loggedId){
            return (<div>
                <p>Account details for {this.props.username}:</p>
                <ul>{displayInfo}</ul>
                <p><Link to="/main" >Return to homepage</Link></p>
            </div>);
        }
        else {
            return (<div>Hello there, 
                <Link to='/login'>please Log-in!</Link>
                </div>)
        }   
    }
}

const mapStateToProps = (state)=>({
    loggedId : state.auth.currentUser !== null,
    username: state.auth.currentUser.username,
    firstName: state.auth.currentUser.firstName,
    lastName: state.auth.currentUser.lastName,
    email : state.auth.currentUser.email,
    useEmailForApi: state.auth.currentUser.useEmailForApi
});

export default connect(mapStateToProps)(Userinfo);
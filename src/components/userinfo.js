import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editUserInfo, deleteUser } from '../actions/register';
import { medsLogout } from '../actions/meds';
import { patientLogout } from '../actions/patients';
import { clearAuth } from '../actions/auth';
import { eventsLogout } from '../actions/events';
import { logsLogout } from '../actions/log';
import { clearAuthToken } from '../local-storage';

class Userinfo extends Component {
    onSubmit(values){
        const editedKeys = ["firstName", "lastName", "email"/*, "useEmailForApi"*/];
        const updateObj = {"id" : this.props.id, "token": this.props.token};
        for(let x = 0; x < values.length; x++){
            if(values[x].value){
                updateObj[editedKeys[x]] = values[x].value;
            }
        }
        if(values[3].value==='true'){
            updateObj["useEmailForApi"] = 'true'
        }
        else if(values[3].value==='false') {
            updateObj["useEmailForApi"] = 'false';
        }
        this.props.dispatch(editUserInfo(updateObj));
        this.props.history.push('/main');
    }
    removeThisUser(){
        const user = {"token": this.props.token, "id": this.props.id};
        this.props.dispatch(deleteUser(user));
        this.props.dispatch(medsLogout());
        this.props.dispatch(patientLogout());
        this.props.dispatch(eventsLogout());
        this.props.dispatch(logsLogout());
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/');
    }
   
    render(){
        let info, userInfo, displayInfo, defaultInfo;
        if(this.props.loggedIn){
        info = ["First Name: ", "Last Name: ", "Email Address: "/*, "MedLog will sync schedule with email account: "*/];
        userInfo = [this.props.firstName, this.props.lastName, this.props.email, this.props.useEmailForApi];
        defaultInfo = ["Enter first name", "Enter last name", "Enter email address"];
        displayInfo = info.map((field, index) => userInfo[index]?
            (<div key={index}><label htmlFor={info[index]}>{info[index]}</label><input id={info[index]} placeholder={userInfo[index].toString()} type="text" /></div>)
          : (<div key={index}><label htmlFor={info[index]}>{info[index]}</label><input id={info[index]} placeholder={defaultInfo[index]} type="text" /></div>));
        }
        if(this.props.loggedIn){
            return (<div>
                <p>Account details for {this.props.username}:</p>
                <form onSubmit={values=>{
                   values.preventDefault();
                    this.onSubmit(values.currentTarget);
                }}>
                {displayInfo}
                <div>
                <label htmlFor="emailApi">MedLog sync schedule with email account. Currently Active: {this.props.useEmailForApi.toString()}</label>
                </div>
                <div>
                <select id="emailApi">
                    <option value='null'>Don't Change Email Sync</option>
                    <option value='false'>Do not use email address to sync schedule</option>
                    <option value='true'>Yes, do sync with this email address</option>
                </select>
                </div>
                <button type="submit"><i className="fas fa-check"></i></button>
                </form>
                <button type="click" onClick={()=>this.props.history.push('/main')}><i className="fas fa-times"></i></button>
                <p><button type="click" className="deleteAccountBtn" onClick={()=>this.removeThisUser()} ><i className="far fa-trash-alt"></i></button></p>
            </div>);
        }
        else {
            return (<div>Hello there, 
                <Link to='/login'>please Log-in!</Link>
                </div>);
        }   
    }
}

const mapStateToProps = (state)=>{
    if(state.auth.currentUser){
        return {
            loggedIn : state.auth.currentUser !== null,
            username: state.auth.currentUser.username,
            firstName: state.auth.currentUser.firstName,
            lastName: state.auth.currentUser.lastName,
            email : state.auth.currentUser.email,
            useEmailForApi: state.auth.currentUser.useEmailForApi,
            id : state.auth.currentUser.id,
            token : state.auth.authToken
        };
    }
    else {
        return {loggedIn : null};
    }
}

export default connect(mapStateToProps)(Userinfo);
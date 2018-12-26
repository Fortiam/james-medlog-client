import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editUserInfo } from '../actions/register';
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
   
    render(){
        let info, userInfo, displayInfo;
        if(this.props.loggedIn){
        info = ["First Name: ", "Last Name: ", "Email Address: "/*, "MedLog will sync schedule with email account: "*/];
        userInfo = [this.props.firstName, this.props.lastName, this.props.email, this.props.useEmailForApi];
        displayInfo = info.map((field, index) => userInfo[index]?
            (<div key={index}><label htmlFor={info[index]}>{info[index]}</label><input id={info[index]} placeholder={userInfo[index].toString()} type="text" /></div>)
          : (<div key={index}>{field.concat("Optional field is blank..")}</div>));
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
                <label htmlFor="emailApi">MedLog will sync schedule with email account. Currently Active: {this.props.useEmailForApi.toString()}</label>
                </div>
                <div>
                <span>Change? </span>
                <select id="emailApi">
                    <option value='null'>No Change Thanks</option>
                    <option value='false'>Do not use email address to sync schedule, thanks</option>
                    <option value='true'>Yes, please do sync with this email address!</option>
                </select>
                </div>
                <button type="submit">Update!</button>
                </form>
                <button type="click" onClick={()=>this.props.history.push('/main')}>Cancel all changes</button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PatientSingle from './patientSingleRework';
import { createNewPatient } from '../actions/patients';

class Patient extends Component {
    AddOne(){
        let newbie = {"token": this.props.token,
            "name" : "New Family Member!",
            age : 1,
            gender : "...",
            height : '...',
            weight : '...',
            doctor : {name: ".. doctor name",
            contact: ".. contact info"}
        };
        this.props.dispatch(createNewPatient(newbie));
    }
    render(){
        const common = (
            <div className='marginCenter smallbutton'><button title='Add New family member' onClick={()=>this.AddOne()}><i className="fas fa-users innerlist"></i></button>
            </div>
            );
        if(this.props.loggedIn){
            if(this.props.listOfOwnedByUser.length > 0) {
                const whoToShow = this.props.listOfOwnedByUser.map((person, index)=>{
                    return (<div className='list' key={index}><PatientSingle form={person.id} formKey={person.id} whom={person} patientNumber={index}/></div>);
                });
                return (<div>{whoToShow}
                    {common}
                    </div>);
            }//here .length is 0
            else {
                return (<div className="list"><p className='innerlist'>Nobody has been added to your Family yet!</p>
                    {common}</div>);
            }
        }//here they aren't logged in somehow
        else {
            return (<Redirect to='/'/>);
        }
    }
}

const mapStateToProps = (state)=>{
    if(state.auth.currentUser){
        return {
        loggedIn : state.auth.currentUser !== null,
        userId : state.auth.currentUser.id,
        token : state.auth.authToken,
        listOfOwnedByUser : [...state.patients.listOfOwnedByUser]
        };
    }
    else {
        return {
            loggedIn : null
        }
    }
}
export default connect(mapStateToProps)(Patient);
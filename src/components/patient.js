import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PatientSingle from './patient_single';
import { createNewPatient } from '../actions/patients';

class Patient extends Component {
    AddOne(){
        let newbie = {"token": this.props.token, "name" : "New Family Member!"};
        this.props.dispatch(createNewPatient(newbie));
    }
    render(){
        const common = (
            <div><button onClick={()=>this.AddOne()}><i className="fas fa-users"></i></button>
            </div>
            );
        if(this.props.loggedIn){
            if(this.props.listOfOwnedByUser.length > 0) {
                const whoToShow = this.props.listOfOwnedByUser.map((person, index)=>{
                    return (<div className='list' key={index}><PatientSingle patientNumber={index}/></div>);
                });
                return (<div>{whoToShow}
                    {common}
                    </div>);
            }//here .length is 0
            else {
                return (<div className="person"><p>Nobody has been added to your Family yet!</p>
                    {common}</div>);
            }
        }//here they aren't logged in somehow
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
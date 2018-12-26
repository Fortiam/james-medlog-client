import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PatientSingle from './patient_single';

class Patient extends Component {
    render(){
        if(this.props.loggedIn){
            if(this.props.listOfOwnedByUser.length > 0) {
                const whoToShow = this.props.listOfOwnedByUser.map((person, index)=>{
                    return (<li key={index}><PatientSingle patient={person}/></li>);
                });
                return (<div><ul>{whoToShow}</ul>
                    <p><Link to="/main" >Return to homepage</Link></p>
                    </div>);
            }//here .length is 0
            else {
                return (<div className="person"><p>Nobody has been added to your Family yet!</p>
                    <p><Link to="/main" >Return to homepage</Link></p></div>);
            }
        }//here they aren't logged in somehow
        else {
            return (<div>Hello there, 
                <Link to='/login'>please Log-in!</Link>
                </div>)
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
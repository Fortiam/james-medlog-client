import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {OneName} from './oneName';
import {OneMed} from './oneMed';
import { createNewEvent } from '../actions/events';
class Begin extends Component {
    clicked(values){
        values.preventDefault();
        const theGoods = {"token": this.props.token,
         "title" : "testing events for now!",
         "start" : this.props.nowTime,
        // "endTime" : values.endTime,
         "patientId" : values.currentTarget[0].value,
         "medId" : values.currentTarget[1].value,
        };
        //maybe add in a confirm box here?
        this.props.dispatch(createNewEvent(theGoods));
    }
    render(){
            if(this.props.loggedIn){
                let listNames = [];
                let listMeds = [];
                if(this.props.listOfOwnedByUser.length < 1 || this.props.manyMeds.length < 1){
                    return (<div>Please add at least 1 family member and at least 1 medicine before assigning a medicine to someone!
                        <p><Link to="/main" >Return to homepage</Link></p>
                    </div>);
                }
                else {
                    this.props.listOfOwnedByUser.forEach(person=>{
                        listNames.push(person);
                    });
                    this.props.manyMeds.forEach(med=> {
                        listMeds.push(med);
                    });
                    const displayNames = listNames.map((oneName, index)=> (<option key={index} value={oneName.id}>{oneName.name}</option>));
                    const displayMeds = listMeds.map((oneMed, index)=> (<option key={index} value={oneMed.id}>{oneMed.name}</option>));
                    // return (<div>reached assign page!
                    //     <ul>here is patients names': {displayNames}</ul>
                    //     <div>here is meds' names: {displayMeds}</div>
                    //         <p><Link to="/main" >Return to homepage</Link></p>
                    //     </div>);
                    return(<div>
                        <p>Please select 1 person to start taking medication</p>
                        <form name="assignment" onSubmit={(e)=>this.clicked(e)}>
                            <label htmlFor="person" >Family member to begin medication: </label>
                            <select name="person" id="person">
                                {displayNames}
                            </select>
                            <label htmlFor="med" >Medication to start taking: </label>
                            <select name="med" id="med">
                                {displayMeds}
                            </select>
                            <button type="submit">Ok</button>
                        </form>
                        <p><Link to="/main" >Return to homepage</Link></p>
                    </div>);
                }
            }
            else {
                return (<div>Hello there, 
                    <Link to='/login'>please Log-in!</Link>
                    </div>);
            }
    }
}

const mapStateToProps = state =>{
    if(state.auth.currentUser){
        return ({
        loggedIn : state.auth.currentUser !== null,
        userId : state.auth.currentUser.id,
        token : state.auth.authToken,
        listOfOwnedByUser : [...state.patients.listOfOwnedByUser],
        manyMeds: [...state.meds.manyMeds],
        currentEvent : [...state.events.currentEvent],
        nowTime : state.events.timeIsNow
        // title : state.events.title,
        // startTime : state.events.startTime,
        // endTime : state.events.endTime,
        // patientName : state.events.patientName,
        // medName : state.evetns.medName,
        });
    }
    else {
        return {
            loggedIn : null
        }
    }
}
export default connect(mapStateToProps)(Begin);
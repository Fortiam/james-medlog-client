import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { removeOnlyFutureEventsForOneMed } from '../actions/events';
// import moment from 'moment';

class End extends Component {
    btnClicky(values){
        values.preventDefault();
        const theGoods = {"token": this.props.token,
            "patientId" : values.currentTarget[0].value,
            "medId" : values.currentTarget[1].value,
        };
        this.props.dispatch(removeOnlyFutureEventsForOneMed(theGoods))
    }
    render(){
        if(this.props.loggedIn){
            let listNames = [];
            let listMeds = [];
            if(this.props.listOfOwnedByUser.length < 1 || this.props.manyMeds.length < 1){
                return (<div>Somebody has to be taking medication before stopping someone's medication!
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
                return(<div>
                    <p>Please select 1 person to stop taking medication</p>
                    <form name="stopMed" onSubmit={(e)=>this.btnClicky(e)}>
                        <p><label htmlFor="whom" >Family member to stop medication: </label>
                        <select name="whom" id="whom">
                            {displayNames}
                        </select></p>
                        <p><label htmlFor="stopMed" >Medication to stop taking: </label>
                        <select name="stopMed" id="stopMed">
                            {displayMeds}
                        </select></p>
                        <button type="submit"><i className="fas fa-check"></i></button>
                    </form>
                </div>);
            }
        }
        else {
            return (<Redirect to='/'/>);
        }
    }
}
const mapStateToProps = state => {
    if(state.auth.currentUser){
        return ({
        loggedIn : state.auth.currentUser !== null,
        userId : state.auth.currentUser.id,
        token : state.auth.authToken,
        listOfOwnedByUser : [...state.patients.listOfOwnedByUser],
        manyMeds: [...state.meds.manyMeds],
        nowTime : state.events.timeIsNow
        });
    }
    else {
        return {
            loggedIn : null
        }
    }
};
export default connect(mapStateToProps)(End);
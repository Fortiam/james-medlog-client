import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {OneName} from './oneName';
import { createNewEvent, clearCurrentEvent, removeOnlyFutureEventsForOneMed } from '../actions/events';
import moment from 'moment';
import { editPatient, createNewPatient } from '../actions/patients';
import { createNewMeds } from '../actions/meds';
import * as newMedsToAdd from '../utils/medsDB';

class Treatment extends Component {
    componentDidMount(){
        this.props.dispatch(clearCurrentEvent());
    }
    addOnePerson(){
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
    addOneMed(whichMeds){
        const newMeds = Object.assign({}, whichMeds, {"token": this.props.token});
        this.props.dispatch(createNewMeds(newMeds));
    }
    btnClicky(values){
        values.preventDefault();
        const theGoods = {"token": this.props.token,
            "patientId" : values.currentTarget[0].value,
            "medId" : values.currentTarget[1].value,
        };
        this.props.dispatch(removeOnlyFutureEventsForOneMed(theGoods));
        const newEdits = {"token": this.props.token,
            "patientId" : values.currentTarget[0].value,
            "medToRemove" : values.currentTarget[1].value
            }
        this.props.dispatch(editPatient(newEdits));
    }
    clicked(values){
        values.preventDefault();
        let findName = this.props.listOfOwnedByUser.filter(person => person.id===values.currentTarget[0].value);
        let findMed = this.props.manyMeds.filter(med=> med.id === values.currentTarget[1].value);
        const theGoods = {"token": this.props.token,
         "title" : values.currentTarget[2].value || `Med: ${findMed[0].name} for ${findName[0].name}`,
         "start" :  moment().format(),
         "patientId" : values.currentTarget[0].value,
         "medId" : values.currentTarget[1].value,
        };
        this.props.dispatch(createNewEvent(theGoods));
    }
    prepList(){
        const nowTime = moment().format();
        let futureEvents = this.props.events.allOfTheEvents.filter(eachEvent=> moment(eachEvent["start"]).isAfter(nowTime));
        let peopleOnlyFuture = futureEvents.map(each=> each.patientId.toString());
        let personIsOnAMed = [];
        if(peopleOnlyFuture.length > 0){
        for(let i=0; i < this.props.listOfOwnedByUser.length; i++){
            if (peopleOnlyFuture.toString().includes((this.props.listOfOwnedByUser[i].id.toString()))> 0){
                personIsOnAMed.push(this.props.listOfOwnedByUser[i]);
            }
        }
        return personIsOnAMed;
        } else {
            return false;
        }        
    }
    findingMedsForOnePerson(onePersonHere){
        //we input a single person and output an array of just the names of all the meds they are taking.
        let medsOfOnePerson = onePersonHere.medsCurrentlyOn.map(eachMedOfThisPerson => eachMedOfThisPerson.name.toString());
        return medsOfOnePerson; //2 lines instead of 1 for read-ability..
    }
    convertList(theList){
        if(theList){
            let arrayOfMedsAndPpl = [];
            for(let i=0; i<theList.length; i++){
                arrayOfMedsAndPpl[i] = this.findingMedsForOnePerson(theList[i]);
                //here we have an array for each single person taking a med,
                //the nested array is all the names of the meds that person is taking
            }
            
            let renderReadyList = theList.map((who, index)=> (<div key={index}><p>{who.name.toString()} is using medication: {arrayOfMedsAndPpl[index].join(", ")}</p></div>));
            return (<div className='innerlist'>{renderReadyList} </div>);
        }
        else {
           return (<div className='innerlist'><p>Nobody is currently on treatment</p></div>);
        }
    }
    fixGrammer(){
        if(this.props.manyMeds.length > 1){
            return "medicines";
        }
        else return 'medicine';
    }
    render(){
            if(this.props.loggedIn){
                let listNames = [];
                let listMeds = [];
                let safetyTitle = '';
                if(this.props.currentEvent.length > 0){
                    safetyTitle = this.props.currentEvent[0].title;
                }
                if(this.props.listOfOwnedByUser.length < 1 || this.props.manyMeds.length < 1){
                    const addPerson = (<button title='Add New family member' onClick={()=>this.addOnePerson()}><i className="fas fa-users innerlist"></i></button>);
                    const addMed = (<button className='center' title='add new medicine' onClick={()=>this.addOneMed(newMedsToAdd.tylenol)}><i className="fas fa-prescription-bottle-alt innerlist"></i></button>);
                    return (<div className='list'>
                    <p className='innerlist'>Please add at least 1 family member and at least 1 medicine before treatment!</p>
                    <p className='innerlist'>Currently there are {this.props.listOfOwnedByUser.length} family and {this.props.manyMeds.length} {this.fixGrammer()} on this account</p>
                    <div className='innerlist'>
                        {addPerson}
                        {addMed}
                    </div>
                    </div>);
                }
                else {
                    let findPersonOnMeds = this.prepList();
                    let renderPersonOnMeds = this.convertList(findPersonOnMeds);
                    this.props.listOfOwnedByUser.forEach(person=>{
                        listNames.push(person);
                    });
                    this.props.manyMeds.forEach(med=> {
                        listMeds.push(med);
                    });
                    const displayNames = listNames.map((oneName, index)=> (<option key={index} value={oneName.id}>{oneName.name}</option>));
                    const displayMeds = listMeds.map((oneMed, index)=> (<option key={index} value={oneMed.id}>{oneMed.name}</option>));
                    return(<div >
                        <div className='list'>{renderPersonOnMeds}</div>
                        <div className='list'>
                        <form className='innerlist' name="assignment" onSubmit={(e)=>this.clicked(e)}>
                            <p className='inputGroup'><label htmlFor="person" >Family member to begin medication: 
                            <select name="person" id="person">
                                {displayNames}
                            </select>
                            </label>
                            </p>
                            <p className='inputGroup'><label htmlFor="med" >Medication to start taking: 
                            <select name="med" id="med">
                                {displayMeds}
                            </select>
                            </label>
                            </p>
                            <p className='inputGroup'><label htmlFor="title">Title to display on calendar:
                            <input type="text" name="title" id="title" placeholder="Event title.."/>
                            </label>
                            </p>
                            <p><button title='start selected person on selected medication' type="submit"><i className="fas fa-check"></i></button></p>
                        </form>
                        <OneName className='list' title={safetyTitle} /></div>
                    <form className='list' name="stopMed" onSubmit={(e)=>this.btnClicky(e)}>
                        <div className='innerlist'>
                        <p className='inputGroup'>
                        <label htmlFor="whom">Family member to stop medication: 
                        <select name="whom" id="whom">
                            {displayNames}
                        </select>
                        </label>
                        </p>
                        <p className='inputGroup'><label htmlFor="stopMed" >Medication to stop taking: 
                        <select name="stopMed" id="stopMed">
                            {displayMeds}
                        </select>
                        </label>
                        </p>
                        <p>
                        <button title='stop selected person on selected medication' type="submit"><i className="fas fa-check"></i></button>
                        </p>
                        </div>
                    </form>
                        
                   </div>);
                }
            }
            else {
                return (<Redirect to='/'/>);
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
        events : state.events,
        nowTime : state.events.timeIsNow
        });
    }
    else {
        return {
            loggedIn : null
        }
    }
}
export default connect(mapStateToProps)(Treatment);
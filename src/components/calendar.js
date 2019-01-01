import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './calendar.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import Button from './button';
import { fetchAllEvents, fetchFilteredEvents } from '../actions/events';

class Calendar extends Component {
    
    filterEvents(data){
        let theFilter = {"token": this.props.token};
        if(data.currentTarget[0].value && data.currentTarget[0].value !== 'false'){
            theFilter["patientId"] = data.currentTarget[0].value;
        }
        if (data.currentTarget[1].value && data.currentTarget[1].value !== 'false'){
            theFilter["medId"] = data.currentTarget[1].value;
        }
        if(data.currentTarget[0].value !== 'false' || data.currentTarget[1].value !== 'false'){
            this.props.dispatch(fetchFilteredEvents(theFilter));
        }
        else {
            this.props.dispatch(fetchAllEvents({"token": this.props.token}));
        }
    }
    render() {
        if(this.props.loggedId){
            const displayNames = this.props.patients.map((oneName, index)=> (<option key={index} value={oneName.id}>{oneName.name}</option>));
            const displayMeds = this.props.meds.map((oneMed, index)=> (<option key={index} value={oneMed.id}>{oneMed.name}</option>));
            let safe = [];
            if((this.props.events.length >0) && (this.props.events[0].start !== null)){
                if(this.props.filter){
                    safe = [...this.props.filteredEvents];
                }
                else {
                    safe = [...this.props.events];
                }
            }
        return (
          <div className="main" id='example'>
            <FullCalendar id='myCalendar' className="App"
                header= {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
                }}
                defaultDate={this.props.timeIsNow}
                navLinks= {true} // can click day/week names to navigate views
                editable= {true}
                eventLimit= {true} // allow "more" link when too many events
                events = {safe}>
            </FullCalendar>
            <form name="filter" onSubmit={(e)=>{e.preventDefault();this.filterEvents(e)}}>
                <p><label htmlFor="patientId" >Show only schedule for: </label>
                <select name="patientId" id="patientId">
                    <option value='false'>Do not filter by Person</option>
                    {displayNames}
                </select></p>
                <p><label htmlFor="medId" >Medication to filter: </label>
                <select name="medId" id="medId">
                    <option value='false'>Do not filter by Medication</option>
                    {displayMeds}
                </select></p>
                <button type="submit">Filter</button>
            </form>
            <p><Link to="/main" >Return to homepage</Link></p>
            </div>
        );
        } else {
            return (<div>Hello there, 
                 <Link to='/login'>please Log-in!</Link>
                </div>)
        }       
    }
}

const mapStateToProps = (state)=>({
    events : [...state.events.allOfTheEvents],
    filter : state.events.filter,
    timeIsNow : state.timeIsNow,
    loggedId : state.auth.currentUser !== null,
    token : state.auth.authToken,
    meds : [...state.meds.manyMeds],
    patients : [...state.patients.listOfOwnedByUser],
    filteredEvents : [...state.events.currentEvent]
  });
export default connect(mapStateToProps)(Calendar);
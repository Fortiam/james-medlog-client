import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './calendar.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import Button from './button';
import {fetchAllEvents} from '../actions/events';

class Calendar extends Component {
    componentWill(){
    this.props.dispatch(fetchAllEvents({"token": this.props.token}));
    }
   
    render() {
        if(this.props.loggedId){
            let safe = [];
            if((this.props.events.length >0) && (this.props.events[0].start !== null)){
                safe = [...this.props.events];
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
            events = {safe}
            ></FullCalendar>
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
    timeIsNow : state.timeIsNow,
    loggedId : state.auth.currentUser !== null,
    token : state.auth.authToken
  });
export default connect(mapStateToProps)(Calendar);
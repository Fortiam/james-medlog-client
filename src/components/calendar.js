import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './calendar.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import Button from './button';

class Calendar extends Component {
   
    render() {
        if(this.props.loggedId){
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
            events = {this.props.events}
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
    loggedId : state.auth.currentUser !== null
  });
export default connect(mapStateToProps)(Calendar);
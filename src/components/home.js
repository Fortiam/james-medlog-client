import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormRegister from './formRegister';
import Welcome from './welcome';
import FormLogin from './formLogin';
import Header from './header';
import Calendar from './calendar';
import Patient from './patient';
import Medicine from './medicine';
import Userinfo from './userinfo';
import Treatment from './treatment';
import Log from './log';
import { refreshAuthToken } from '../actions/auth';
import { getAllPatientsInfo } from '../actions/patients';
import { getAllMeds } from '../actions/meds';
import { fetchAllEvents } from '../actions/events';
import { getAllLogs } from '../actions/log';
import { authError } from '../actions/auth';

export class Home extends Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            return Promise.all([/*this.props.dispatch(refreshAuthToken()),*/
                this.props.dispatch(getAllPatientsInfo({"token": this.props.token})),
                this.props.dispatch(getAllMeds({"token": this.props.token})),
                this.props.dispatch(fetchAllEvents({"token": this.props.token})),
                this.props.dispatch(getAllLogs({"token": this.props.token}))])
                .then(()=>{
                    return this.startPeriodicRefresh();
                })
                .catch(err=>this.dispatch(authError(err)));
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }
    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }
    
    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () =>this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }
        clearInterval(this.refreshInterval);
    }

    render(){
        return (<div>
                <Router>
                    <div className="home">
                    <Header history={this.props.history}/>
                    <Route exact path='/' history={this.props.history} component={Welcome} />
                    <Route exact path='/register' component={FormRegister} />
                    <Route exact path='/login' component={FormLogin} />
                    <Route exact path='/calendar' component={Calendar} />
                    <Route exact path='/log' component={Log} />
                    <div className='lower'>
                    <Route exact path='/patient' component={Patient} />
                    <Route exact path='/medicine' component={Medicine} />
                    <Route exact path='/userinfo' component={Userinfo} />
                    <Route exact path='/treatment' component={Treatment} />
                    </div>
                    </div>
                </Router>
                </div>
        );
    }
}

const mapStateToProps = (state)=>({
    events : state.events,
    timeIsNow : state.timeIsNow,
    loggedIn : state.auth.currentUser !== null,
    token : state.auth.authToken
  });
  export default connect(mapStateToProps)(Home);
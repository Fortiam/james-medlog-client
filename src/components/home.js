import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';//Link, NavLink 
import FormRegister from './formRegister';
import Welcome from './welcome';
import FormLogin from './formLogin';
import Header from './header';
import MainWrapper from './mainWrapper';
import Calendar from './calendar';
import Patient from './patient';
import Medicine from './medicine';
import Userinfo from './userinfo';
import Treatment from './treatment';
// import End from './end';
import Log from './log';
import { refreshAuthToken } from '../actions/auth';
import { getAllPatientsInfo } from '../actions/patients';
import { getAllMeds } from '../actions/meds';
import { registerLogout } from '../actions/register';
import { fetchAllEvents } from '../actions/events';
import { getAllLogs } from '../actions/log';
import { destroy } from 'redux-form';
import { authError } from '../actions/auth';

class Home extends Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }
    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
                return Promise.all([this.props.dispatch(refreshAuthToken()),
                this.props.dispatch(destroy()),
                this.props.dispatch(registerLogout()),
                this.props.dispatch(getAllPatientsInfo({"token": this.props.token})),
                this.props.dispatch(getAllMeds({"token": this.props.token})),
                this.props.dispatch(fetchAllEvents({"token": this.props.token})),
                this.props.dispatch(getAllLogs({"token": this.props.token}))])
                .then(()=>{
                    this.refreshInterval = setInterval(
                        () =>this.props.dispatch(refreshAuthToken()),
                        24 * 60 * 60 * 1000 // One day
                    );
                })
                .catch(err=>this.props.dispatch(authError(err)));
       
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
                    <Header />
                    <Route exact path='/' component={Welcome} />
                    <Route exact path='/register' component={FormRegister} />
                    <Route exact path='/login' component={FormLogin} />
                    <Route exact path='/main' component={MainWrapper} />
                    <Route exact path='/calendar' component={Calendar} />
                    <Route exact path='/patient' component={Patient} />
                    <Route exact path='/medicine' component={Medicine} />
                    <Route exact path='/userinfo' component={Userinfo} />
                    <Route exact path='/treatment' component={Treatment} />
                    {/* <Route exact path='/end' component={End} /> */}
                    <Route exact path='/log' component={Log} />
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
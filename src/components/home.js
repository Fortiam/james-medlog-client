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
import Begin from './begin';
import End from './end';
import Log from './log';

class Home extends Component {
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
                    <Route exact path='/begin' component={Begin} />
                    <Route exact path='/end' component={End} />
                    <Route exact path='/log' component={Log} />
                    </div>
                </Router>
                </div>
        );
    }
}

const mapStateToProps = (state)=>({
    events : state.events,
    timeIsNow : state.timeIsNow
  });
  export default connect(mapStateToProps)(Home);
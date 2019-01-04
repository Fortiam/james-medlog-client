import React/*, { Component }*/ from 'react';
import { Link } from 'react-router-dom';

export default function NavMenu(props) {
    if (props.showUp) {
        return (<div className='left navmenu'>
        <p><Link to="/calendar" >Visit Calendar</Link></p>
            <p><Link to='/patient' >Family Member</Link></p>
            <p><Link to="/medicine" >Medicine</Link></p>
            <p><Link to="/userinfo" >Account Details</Link></p>
            <p><Link to='/treatment' >Treatment</Link></p>
           <p><Link to='/log' >Journal</Link></p>
        </div>);
    }
    else {
        return (<div></div>);
    }
}
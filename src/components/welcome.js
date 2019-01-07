import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class Welcome extends Component {
    goToScreen(where){
        this.props.history.push(where);
    }
    render(){
        if(this.props.token){
            return (<Redirect to='/calendar'/>);
        }
       else {
           return (<div className='welcomeParent'>
                    <span>MedLog is an app to help parents keep track of their family members' medical records and schedules.</span>
                    <div className='imageContainer'>
                        <img className='landingImage' src='./aerial-aerial-view-application-935869.jpg' alt='medical equipment' />
                    </div>
                    <p>Users can create records containing information about medication(s) and the times they need to be taken, for everyone in the family.</p>
                    <div className='imageContainer'>
                        <img className='landingImage' src='./balance-cobblestone-conceptual-279470.jpg' alt='pills' />
                    </div>
                    {/* <p>After filling out the details of each family member, which medicine they are on, a schedule can be viewed for the entire family.</p> */}
                    <p>A calendar view can show everyone's appointments or filtered for a single person's schedule.</p>
                    {/* <p>Entries can be added to a person's log when side effects, reactions, or symptoms appear, or if a scheduled appointment was missed.</p> */}
                    <div className='list loginContainer'>
                        <div className='smallbox' onClick={()=>this.goToScreen('/register')}>
                            <span className='left innerlist'><Link to="/register" >Create a new account</Link></span>    
                        </div>
                        <div className='smallbox right innerlist' onClick={()=>this.goToScreen('/login')}>
                            <Link to="/login">Log-in</Link>
                        </div>
                    </div>
                </div>
                );
       }   
    }
}
const mapStateToProps = state=> {
    if (state.auth.authToken !== null){
        return { token : state.auth.authToken}
    }
    else {
        return { token : null}
    }
};
export default connect(mapStateToProps)(Welcome);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
import { DEMO_ACCOUNT } from '../config';
class Welcome extends Component {
    goToScreen(where){
        this.props.history.push(where);
    }
    demoLogin(){
        this.props.dispatch(login(DEMO_ACCOUNT, DEMO_ACCOUNT))
    }
    render(){
        if(this.props.token){
            return (<Redirect to='/calendar'/>);
        }
       else {
           return (<div >
                   
                    <img className='image3' src='./rawpixel-600792-unsplash.jpg' alt='pills' />
                    <div className='imageContainer'>
                    <span className='landingText1'>MedLog is an app to help parents keep track of their family members' medical records and schedules.</span>
                        <img className='landingImage image1' src='./aerial-aerial-view-application-935869.jpg' alt='medical equipment' />
                    </div>
                    <div className='imageContainer'>
                        <img className='landingImage image2' src='./balance-cobblestone-conceptual-279470.jpg' alt='pills' />
                    <span className='landingText2'>Users can create records containing information about medication(s) and the times they need to be taken, for everyone in the family.</span>
                    </div>
                    {/* <p>After filling out the details of each family member, which medicine they are on, a schedule can be viewed for the entire family.</p> */}
                    <div className='imageContainer centerContainer'>
                        <span className='landingText3'>A calendar view can show everyone's appointments or filtered for a single person's schedule.</span>
                    </div>
                    {/* <div className='imageContainer'>
                       
                    </div> */}
                    {/* <p>Entries can be added to a person's log when side effects, reactions, or symptoms appear, or if a scheduled appointment was missed.</p> */}
                    <div className='welcomeParent'>
                        <button onClick={()=>this.demoLogin()} className='innerlist' type='click' >Try Demo</button>
                        </div>
                        
                            
                   <div className='welcomeParent2'>
                        <div className='list loginContainer'>
                            {/* <div className='smallbox' onClick={()=>this.goToScreen('/register')}> */}
                            {/* <span className='left innerlist'> */}
                            <Link className='left' to="/register" >Create a new account</Link>
                            {/* </span>     */}
                            {/* </div> */}
                            {/* <div className='smallbox right innerlist' onClick={()=>this.goToScreen('/login')}> */}
                            <Link className='right' to="/login">Log-in</Link>
                            {/* </div> */}
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
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
import { DEMO_ACCOUNT } from '../config';
import LandingText from './landingText';

class Welcome extends Component {
    constructor(props){
        super(props);
        this.state= {
            showFirst : false,
            showSecond : false,
            showThird: false
        }
    }
    flipClick(which){
        switch(which){
            case(1):
                this.setState({showFirst : !this.state.showFirst});
                break;
            case(2):
                this.setState({showSecond : !this.state.showSecond});
                break;
            case(3):
                this.setState({showThird : !this.state.showThird});
                break;
            default: 
        }
    }
    
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
           return (<div className='landingBackground'>
                    <div className='imageContainer4'>
                        <img className='image3' src='./rawpixel-600792-unsplash.jpg' alt='pills' />
                    </div>
                    <div className='imageContainer1'>
                        <LandingText showMe={this.state.showFirst} onClick={()=>this.flipClick(1)} landing='landingText1' question={'What is Medlog?'} answer={"MedLog is an app to help parents keep track of their family members' medical records and schedules."}/>
                        <img className='landingImage image1' src='./aerial-aerial-view-application-935869.jpg' alt='medical equipment' />
                    </div>
                    <div className='imageContainer2'>
                        <img className='landingImage image2' src='./balance-cobblestone-conceptual-279470.jpg' alt='pills' />
                    <LandingText showMe={this.state.showSecond} onClick={()=>this.flipClick(2)} landing='landingText2' question={'How?'} answer={'Users create events about medication such as when to be taken, for all the family.'} />
                    </div>
                    {/* <p>After filling out the details of each family member, which medicine they are on, a schedule can be viewed for the entire family.</p> */}
                    <div className='imageContainer3 centerContainer'>
                        <LandingText showMe={this.state.showThird} onClick={()=>this.flipClick(3)} landing='landingText3' question={'Schedule?'} answer={'A calendar view can show everyone\'s appointments or filtered for a single person.'} />
                    </div>
                    {/* <div className='imageContainer'>
                    </div> */}
                    {/* <p>Entries can be added to a person's log when side effects, reactions, or symptoms appear, or if a scheduled appointment was missed.</p> */}
                    <div className='welcomeParent'>
                        <button onClick={()=>this.demoLogin()} className='innerlist' type='click' >Try Demo</button>
                        </div>
                    <div className='welcomeParent2'>
                        <div className='loginContainer'>
                            {/* <div className='smallbox' onClick={()=>this.goToScreen('/register')}> */}
                            {/* <span className='left innerlist'> */}
                            <Link className='navFooter' to="/register" >Create a new account</Link>
                            {/* </span>     */}
                            {/* </div> */}
                            {/* <div className='smallbox right innerlist' onClick={()=>this.goToScreen('/login')}> */}
                            <Link className='navFooter' to="/login">Log-in</Link>
                            <a href='/privacy.html' className='navFooter'>Privacy Policy</a>
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
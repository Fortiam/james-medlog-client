import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogsSingle from './log_single';
import { createNewLogs } from '../actions/log';
import './log.css';

class Log extends Component {
    addComment(values){
        const newGoodies = Object.assign({}, {'comment': values}, {"token": this.props.token})
        this.props.dispatch(createNewLogs(newGoodies));
    }
    
    render(){
        if(this.props.loggedIn){
            if(this.props.meds.length > 0 && this.props.patients.length > 0){
                const displayComments = this.props.comments.map((aComment, index)=>{
                    return (<div key={index}><LogsSingle form={aComment.id} formKey={aComment.id} oneLog={aComment} whichLog={index}/></div>);
                });
            return (<div>{displayComments}
            <p><button onClick={()=>this.addComment("new log entry..")}>Add a new log entry</button></p>
            <p>Having reactions to medication? New symptoms? Missed appointments?</p>
            <p><Link to="/main" >Return to homepage</Link></p>
            </div>);
            }  else {
                return (<div><p>You need to have family members and medicines before you can comment about them..</p>
                    <p><Link to="/main" >Return to homepage</Link></p>
                </div>);
            }
        }
        else return (<div>
           <p><Link to='/login'>Please Log-in!</Link></p>
        </div>);
    }
}

const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser !== null,
    comments : state.logs.comments,
    token : state.auth.authToken,
    meds: [...state.meds.manyMeds],
    patients : [...state.patients.listOfOwnedByUser]
});

export default connect(mapStateToProps)(Log);
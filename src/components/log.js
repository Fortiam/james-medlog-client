import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogsSingle from './log_single';
import { createNewLogs, getFilteredLogs } from '../actions/log';
import './log.css';
import Filter from './filter';

class Log extends Component {
    addComment(values){
        const newGoodies = Object.assign({}, {'comment': values}, {"token": this.props.token})
        this.props.dispatch(createNewLogs(newGoodies));
    }
    filterEvents(data){
        let theFilter = {"token": this.props.token};
        if(data.currentTarget[0].value && data.currentTarget[0].value !== 'false'){
            theFilter["patientId"] = data.currentTarget[0].value;
        }
        if (data.currentTarget[1].value && data.currentTarget[1].value !== 'false'){
            theFilter["medId"] = data.currentTarget[1].value;
        }
        if(data.currentTarget[0].value !== 'false' || data.currentTarget[1].value !== 'false'){
            this.props.dispatch(getFilteredLogs(theFilter));
        }
        else {
            this.props.dispatch(getFilteredLogs({"token": this.props.token}));
        }
    }
    render(){
        if(this.props.loggedIn){
            if(this.props.meds.length > 0 && this.props.patients.length > 0){
                const displayComments = this.props.comments.map((aComment, index)=>{
                    return (<div className='list' key={index}><LogsSingle form={aComment.id} formKey={aComment.id} oneLog={aComment} whichLog={index}/></div>);
                });
            return (<div className='center'>
             <Filter 
              submitProp={(e)=>this.filterEvents(e)}
              displayNamesProp={this.props.patients.map((oneName, index)=> (<option key={index} value={oneName.id}>{oneName.name}</option>))}
              displayMedsProp={this.props.meds.map((oneMed, index)=> (<option key={index} value={oneMed.id}>{oneMed.name}</option>))}
            />
            {displayComments}
            <p><button className='list' onClick={()=>this.addComment("new log entry..")}><i className="fas fa-plus-circle innerlist"></i></button></p>
            </div>);
            }  else {
                return (<div className='list lower'><p className='innerlist'>You need to have family members and medicines before you can comment about them..</p>
                </div>);
            }
        }
        else return (<Redirect to='/'/>);
    }
}

const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser !== null,
    comments : state.logs.comments,
    token : state.auth.authToken,
    meds: [...state.meds.manyMeds],
    patients : [...state.patients.listOfOwnedByUser],
    filter : state.logs.filter
});

export default connect(mapStateToProps)(Log);
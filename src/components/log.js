import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogsSingle from './log_single';
import { createNewLogs, getFilteredLogs } from '../actions/log';
import './log.css';
import Filter from './filter';
import { createNewPatient } from '../actions/patients';
import { createNewMeds } from '../actions/meds';
import * as newMedsToAdd from '../utils/medsDB';

class Log extends Component {
    addComment(values){
        const newGoodies = Object.assign({}, {'comment': values}, {"token": this.props.token})
        this.props.dispatch(createNewLogs(newGoodies));
    }
    addOnePerson(){
        let newbie = {"token": this.props.token,
            "name" : "New Family Member!",
            age : 1,
            gender : "...",
            height : '...',
            weight : '...',
            doctor : {name: ".. doctor name",
            contact: ".. contact info"}
        };
        this.props.dispatch(createNewPatient(newbie));
    }
    addOneMed(whichMeds){
        const newMeds = Object.assign({}, whichMeds, {"token": this.props.token});
        this.props.dispatch(createNewMeds(newMeds));
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
            <p><button title='add new comment entry' className='list' onClick={()=>this.addComment("new log entry..")}><i className="fas fa-plus-circle innerlist"></i></button></p>
            </div>);
            }  else {
                const addPerson = (<button title='Add New family member' onClick={()=>this.addOnePerson()}><i className="fas fa-users innerlist"></i></button>);
                const addMed = (<button className='' title='add new medicine' onClick={()=>this.addOneMed(newMedsToAdd.tylenol)}><i className="fas fa-prescription-bottle-alt innerlist"></i></button>);
                
                return (<div className='list lower'><p className='innerlist'>You need to have family members and medicines before you can comment about them..</p>
                <div className='innerlist'>
                    {addPerson}
                    {addMed}
                </div>
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
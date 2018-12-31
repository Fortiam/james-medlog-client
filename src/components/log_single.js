import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { /*submitAction,*/ registerError, /*registerMe */} from '../actions/register';
import { connect } from 'react-redux';
import { editLogs, removeLogs } from '../actions/log';
import { Input } from './input';
// import { Link } from 'react-router-dom';

class LogsSingle extends Component {
    onSubmit(values){
        let checkedValues = Object.assign({}, {"token": this.props.token, "logsId": this.props.oneLog.id});
        if(values.medId){
            checkedValues.medId = values.medId;
        }
        console.log("1: ", values);
        console.log("2: ", values.patientId);
        if(values.patientId){
            checkedValues.patientId = values.patientId;
        }
        if(values.comment){
            checkedValues.comment = values.comment;
        }
        //only update if there's some info to update
        if(checkedValues.medId || checkedValues.comment|| checkedValues.patientId){
            this.props.dispatch(editLogs(checkedValues));
        }
    }
    removeLogs(){
        const thisLog = {"token": this.props.token, "logsId": this.props.oneLog.id};
        this.props.dispatch(removeLogs(thisLog));
    }
    render(){
        // let otherOptions, optionalPatients;
        // if(this.props.meds.length > 0){
           const otherOptions = this.props.meds.map((eachMed, index)=>{
                return (<option key={index} value={eachMed.id}>{eachMed.name}</option>);
            });
        // } else {
        //     otherOptions = (<option value={null}>No Medicines</option>);
        // }
        // if(this.props.patients.length > 0){
           const requiredPatients = this.props.patients.map((eachPerson, index)=>{
                return (<option key={index} value={eachPerson.id}>{eachPerson.name}</option>)
            });
        // } else {
        //     optionalPatients = (<option value={null}>No family members yet</option>);
        // }
      
        let whom = this.props.patients.filter(eachOne=> eachOne.id === this.props.oneLog.patientId);
        let defaultWho = "Nobody yet..";
        if(whom.length >0){
            defaultWho = whom[0].name.toString();
        }
        let whichMeds = this.props.meds.filter(eachOfTheMeds => eachOfTheMeds.id===this.props.oneLog.medId);
        let defaultMed = 'Nothing yet..';
        if(whichMeds.length > 0){
            defaultMed = whichMeds[0].name;
        }
       return (<div>Log Entry for {defaultWho} about {defaultMed}:
            <form id={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <Field label="comment:" type="text" component={Input} name="comment" placeholder={this.props.oneLog.comments[0].comment} />
            <Field label="Associate comment with Medicine:" element="select" component={Input} name="medId" >
                {/* <option key={'default'} value={null}>None</option> */}
                {otherOptions}
            </Field>
            <Field label="Associate comment with Patient:" element="select" component={Input} name="patientId" >
                {/* <option key={'default'} value={null}>Not specific to one person</option> */}
                {requiredPatients}
            </Field>
            <button type="submit">Update</button>
            </form>
            <button type="click" onClick={()=>this.removeLogs()}>Remove this Entry</button>
            </div>);
        }
        
}
const mapStateToProps = state => ({
    comments : state.logs.comments,
    token : state.auth.authToken,
    meds: [...state.meds.manyMeds],
    patients : [...state.patients.listOfOwnedByUser]
})
export default reduxForm({
    form: 'logsForm',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(connect(mapStateToProps)(LogsSingle));
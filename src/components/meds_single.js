import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { /*submitAction,*/ registerError, /*registerMe */} from '../actions/register';
import { connect } from 'react-redux';
import { editMeds, removeMeds, MedsError } from '../actions/meds';
import { Input } from './input';
import { getAllLogs } from '../actions/log';
import { updateManyEvents } from '../actions/events';
import { getAllPatientsInfo } from '../actions/patients';

export class MedsSingle extends Component {
    onSubmit(values){
        values.token = this.props.token;
        values.medsId = this.props.oneMed.id;
        //need to validate the values and remove the empty inputs before dispatch
        (values.rateAmount)? values.rateAmount = Number(values.rateAmount) : delete values.rateAmount;
        (values.howLongAmount)? values.howLongAmount = Number(values.howLongAmount) : delete values.howLongAmount;
        this.props.dispatch(editMeds(values))
        .then(()=>{
            const newMedValues = this.props.manyMeds.filter(eachMed=>eachMed.id ===values.medsId);
            this.props.dispatch(updateManyEvents({"token": this.props.token, "medId": newMedValues[0].id, "rateAmount": newMedValues[0].rateAmount, "howLongAmount": newMedValues[0].howLongAmount}));
            this.refreshState();
        })
        .catch(err=>this.props.dispatch(MedsError(err)));
        
    }
    refreshState(){
        this.props.dispatch(getAllPatientsInfo({"token": this.props.token}));
    }
    removeMed(){
        const thisMed = {"token": this.props.token, "medsId": this.props.oneMed.id};
        this.props.dispatch(removeMeds(thisMed));
        this.props.dispatch(getAllLogs({"token": this.props.token}));
        this.refreshState();
    }
    safetyMessage(){
        if((this.props.oneMed.name === 'Enter Medicine Name..') || (this.props.oneMed.dosage === 'Enter dosage, such as 50 mL or 1 pill')){
            return 'Please enter medicine name and dosage';
        }
        else {
            return `For ${this.props.oneMed.name}, ${this.props.oneMed.doubleCheck}`
        }
    }
    render(){
        let confirmationMessage = this.safetyMessage();
       return (<div className='innerlist'>
            <form id={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <Field label="Medicine Name: " type="text" component={Input} name="name" placeholder={this.props.oneMed.name} />
            <Field label="Amount taken per dose: "  type="text" component={Input} name="dosage" placeholder={this.props.oneMed.dosage} />
            <Field label="To be taken every X hours: " type="number" component={Input} name="rateAmount" placeholder={this.props.oneMed.rateAmount} />
            <Field label={`How many days to take medication: `} type="number" component={Input} name="howLongAmount" placeholder={this.props.oneMed.howLongAmount} />
            <div className='textAlignLeft spaceAbove'>
                <button className='spacing left' title='submit updates' type="submit"><i className="fas fa-check"></i></button>
                <button className='trashContainer' title='delete this medicine' type="button" onClick={()=>this.removeMed()}><i className="far fa-trash-alt"></i></button>
            <span >{confirmationMessage}</span>
            </div>
            </form>
            </div>);
    }
}
const mapStateToProps = state => ({
    manyMeds : state.meds.manyMeds,
    token : state.auth.authToken,

})
export default reduxForm({
    form: 'medsForm',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(connect(mapStateToProps)(MedsSingle));
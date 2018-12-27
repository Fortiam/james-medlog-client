import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { /*submitAction,*/ registerError, /*registerMe */} from '../actions/register';
import { connect } from 'react-redux';
import { editMeds, removeMeds } from '../actions/meds';
import { Input } from './input';

class MedsSingle extends Component {
    onSubmit(values){
        values.token = this.props.token;
        values.medsId = this.props.oneMed.id;
        (values.rateAmount)? values.rateAmount = Number(values.rateAmount) : delete values.rateAmount;
        (values.howLongAmount)? values.howLongAmount = Number(values.howLongAmount) : delete values.howLongAmount;
        
        //need to validate the values and remove the empty inputs before dispatch
        this.props.dispatch(editMeds(values));
    }
    removeMed(){
        const thisMed = {"token": this.props.token, "medsId": this.props.oneMed.id};
        this.props.dispatch(removeMeds(thisMed));
    }
    render(){
       return (<div>Medication: 
             {this.props.oneMed.name}
            <form id={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <Field label="Medicine Name: " type="text" component={Input} name="name" placeholder={this.props.oneMed.name} />
            <Field label="Amount taken per dose: "  type="text" component={Input} name="dosage" placeholder={this.props.oneMed.dosage} />
            <Field label="To be taken every X hours: " type="number" component={Input} name="rateAmount" placeholder={this.props.oneMed.rateAmount} />
            <Field label={`How many days to take ${this.props.oneMed.name}: `} type="number" component={Input} name="howLongAmount" placeholder={this.props.oneMed.howLongAmount} />
            <button type="submit">Update</button>
            </form>
            <p>For {this.props.oneMed.name}, {this.props.oneMed.doubleCheck} Correct?</p>
            <button type="click" onClick={()=>this.removeMed()}>Remove this medicine</button>
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
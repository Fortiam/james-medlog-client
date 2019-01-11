import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { removePatientInfo, editPatient } from '../actions/patients';
import { fetchAllEvents, everyEventsError } from '../actions/events';
import { registerError } from '../actions/register';

class PatientSingle extends Component {
    removePatient(){
        let goner = {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id}
        return this.props.dispatch(removePatientInfo(goner))
        .then(()=>this.props.dispatch(fetchAllEvents({'token': this.props.token})))
        .catch(err=>this.props.dispatch(everyEventsError(err)));
    }
    onSubmit(newValues){
        let edited = Object.assign({}, newValues, {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id});
        if(edited['age']){
            edited["age"]= parseInt(newValues.age);
        } else if(edited.age === null){
            delete edited.age;
        }
        this.props.dispatch(editPatient(edited));
    }
    render(){
        return(<div className='innerlist'>
            <form  id={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            <div >
                <label className='inputGroup'>Name: 
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='name'
                        component='input'
                        name='name'
                        placeholder={this.props.whom.name}
                    />
                    </label>
            </div>
            <p></p>
                <div>
                <label className='inputGroup'>Age:
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='age'
                        component='input'
                        type='number'
                        name='age'
                        placeholder={this.props.whom.age}
                    />
                 </label>
                </div>
                <p></p>
                <div>
               <label className='inputGroup'>Gender: 
               {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='gender'
                        component='input'
                        name='gender'
                        placeholder={this.props.whom.gender}
                    />
               </label>
                </div>
            <p></p>
            <div >
                <label className='inputGroup'>Height: 
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='name'
                        component='input'
                        name='height'
                        placeholder={this.props.whom.height}
                    />
                </label>
                </div>
            <p></p>
            <div >
                <label className='inputGroup'>Weight: 
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='name'
                        component='input'
                        name='weight'
                        placeholder={this.props.whom.weight}
                    />
                    </label>
               </div>
             <p></p>
             <div >
                <label className='inputGroup'>Alleriges: 
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='name'
                        component='input'
                        name='allergies'
                        placeholder={this.props.whom.alleriges}
                    />
                    </label>
            </div>
                <p></p>
            <div >
                <label className='inputGroup'>Dr.(name):
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='Dr.(name)'
                        component='input'
                        name='doctor.name'
                        placeholder={this.props.whom.doctor.name}
                    />
                </label>
           </div>
            <p></p>
            <div >
                <label className='inputGroup'>Dr.(contact): 
                {/* <p className='smallSpace'></p> */}
                    <Field 
                        label='Dr.(contact)'
                        component='input'
                        name='doctor.contact'
                        placeholder={this.props.whom.doctor.contact}
                    />
                </label>
            </div>
            <div className='textAlignLeft' >
                <button title={'submit form for update'} className='spaceAbove' type="submit"><i className="fas fa-check"></i></button>
               <button title={'remove this family member'} className='spaceAbove trash trashContainer' type='button' onClick={()=>this.removePatient()}><i className="far fa-trash-alt"></i></button>
            </div>
            </form>
        </div>);
    }
}
const mapStateToProps = (state)=>({
    token : state.auth.authToken,
    listOfOwnedByUser : [...state.patients.listOfOwnedByUser]
});

export default reduxForm({
    form: 'onePatientForm',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(connect(mapStateToProps)(PatientSingle));
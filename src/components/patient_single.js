import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePatientInfo, editPatient } from '../actions/patients';
import './patient_single.css';

class PatientSingle extends Component{
    sayGoodbye(){
        let goner = {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id}
        this.props.dispatch(removePatientInfo(goner));
    }
    editMe(familyValues){
        let edited = Object.assign({}, familyValues, {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id});
        this.props.dispatch(editPatient(edited));
    }
    render(){
        
    if(this.props.patientNumber != null){
        const monkeySauce = [];
        const fieldArray = ["name", "age", "gender", "height", "weight", "doctor's name","doctor's contact info", "allergies"];
        const personArray = [this.props.listOfOwnedByUser[this.props.patientNumber].name,
                             this.props.listOfOwnedByUser[this.props.patientNumber].age,
                             this.props.listOfOwnedByUser[this.props.patientNumber].gender,
                             this.props.listOfOwnedByUser[this.props.patientNumber].height,
                             this.props.listOfOwnedByUser[this.props.patientNumber].weight,
                             this.props.listOfOwnedByUser[this.props.patientNumber].doctor[0].name,
                             this.props.listOfOwnedByUser[this.props.patientNumber].doctor[0].contact,
                             this.props.listOfOwnedByUser[this.props.patientNumber].allergies
                            ];
        const validArray = personArray.map(f=> f? f: 'optional field not entered yet..');
        const displayArray = fieldArray.map((field, index)=>{
            return (<div key={index} className="person">
                <label htmlFor={field}>{field}: </label>
                <input id={field} type="text" placeholder={validArray[index]} ref={input => monkeySauce[index] = input} />
                <button type="click" onClick={()=>{
                    let values = {};
                    values[field] = monkeySauce[index].value.toString();
                    if(values.age){
                        values.age = parseInt(values.age);
                    }
                    if(values["doctor's name"]){
                        values.doctor = [{}];
                        values.doctor[0].name = values["doctor's name"];
                        delete values["doctor's name"];
                    }
                    if(values["doctor's contact info"]){
                        values.doctor = [{}];
                        values.doctor[0].contact = values["doctor's contact info"];
                        delete values["doctor's contact info"];
                    }
                    this.editMe(values);
                    }}>Update</button>
                </div>);
        });
        return (<div className="person header">
        <p>Family member details:</p>
        {displayArray}
        <button onClick={()=>this.sayGoodbye()} type="click">Remove this Family Member</button>
        </div>);
        } else {
            return '';
        }
    }
}

const mapStateToProps = state => ({
    listOfOwnedByUser : [...state.patients.listOfOwnedByUser],
    userId : state.auth.currentUser.id,
    token : state.auth.authToken,
});
export default connect(mapStateToProps)(PatientSingle);
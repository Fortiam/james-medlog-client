import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePatientInfo, editPatient } from '../actions/patients';

class PatientSingle extends Component{
    sayGoodbye(){
        let goner = {"token": this.props.token, "patientId": this.props.theList[this.props.patientNumber].id}
        this.props.dispatch(removePatientInfo(goner));
    }
    editMe(familyValues){
        let edited = Object.assign({}, familyValues, {"token": this.props.token, "patientId": this.props.theList[this.props.patientNumber].id});
        this.props.dispatch(editPatient(edited));
    }
    render(){
    if(this.props.patientNumber != null){
        const monkeySauce = [];
        const fieldArray = ["name", "age", "gender", "height", "weight"/*, "doctor", "allergies"*/];
        const personArray = [this.props.theList[this.props.patientNumber].name,
                             this.props.theList[this.props.patientNumber].age,
                             this.props.theList[this.props.patientNumber].gender,
                             this.props.theList[this.props.patientNumber].height,
                             this.props.theList[this.props.patientNumber].weight,
                             this.props.theList[this.props.patientNumber].doctor,
                             this.props.theList[this.props.patientNumber].allergies
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
                    this.editMe(values);
                    }}>Change!</button>
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
    theList : [...state.patients.listOfOwnedByUser],
    userId : state.auth.currentUser.id,
    token : state.auth.authToken,
});
export default connect(mapStateToProps)(PatientSingle);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePatientInfo } from '../actions/patients';
// need patientId 
class PatientSingle extends Component{
//step 1 change to input fields,
//step 2 changes to inputs dispatches edits action  editPatient
    sayGoodbye(){
        let goner = {"token": this.props.token, "patientId": this.props.theList[this.props.patientNumber].id}
        this.props.dispatch(removePatientInfo(goner));
    }
    render(){
    if(this.props.patientNumber != null){
        const fieldArray = ["name: ", "age: ", "gender: ", "height: ", "weight: ", "doctor: ", "allergies: "];
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
                <p>{field.concat(validArray[index])}</p>
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
// this.props.patientNumber is the index of the array to use for this comp.
const mapStateToProps = state => ({
    theList : [...state.patients.listOfOwnedByUser],
    userId : state.auth.currentUser.id,
    token : state.auth.authToken,
    // name : state.patients.name,
    // age : state.patents.age,
    // gender : state.patents.gender,
    // height : state.patents.height,
    // weight : state.patents.weight,
    // doctor : state.patients.doctor,
    // allergies : state.patients.allergies,
});
export default connect(mapStateToProps)(PatientSingle);
import React from 'react';
//import { connect } from 'react-redux';

export default function PatientSingle(props){
    if(props.patient != null){
        const fieldArray = ["name: ", "age: ", "gender: ", "height: ", "weight: ", "doctor: ", "allergies: "];
        const personArray = [props.patient.name, props.patient.age, props.patient.gender, props.patient.height, props.patient.weight, props.patient.doctor, props.patient.allergies];
        const validArray = personArray.map(f=> f? f: 'optional field not entered yet..');
        const displayArray = fieldArray.map((field, index)=>{
            return (<p key={index}>{field.concat(validArray[index])}</p>);
        });
        return (<div className="person">Family member details:{displayArray}</div>);
        }
}
// const mapStateToProps = state => ({
//     name : state.patients.name,
//     age : state.patents.age,
//     gender : state.patents.gender,
//     height : state.patents.height,
//     weight : state.patents.weight,
//     doctor : state.patients.doctor,
//     allergies : state.patients.allergies,
// });
//export default connect(mapStateToProps)(PatientSingle);
/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePatientInfo, editPatient } from '../actions/patients';
import { fetchAllEvents, everyEventsError } from '../actions/events';

class PatientSingle extends Component{
    sayGoodbye(){
        let goner = {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id}
        return this.props.dispatch(removePatientInfo(goner))
        .then(()=>this.props.dispatch(fetchAllEvents({'token': this.props.token})))
        .catch(err=>this.props.dispatch(everyEventsError(err)));
    }
    editMe(familyValues){
        let edited = Object.assign({}, familyValues, {"token": this.props.token, "patientId": this.props.listOfOwnedByUser[this.props.patientNumber].id});
        this.props.dispatch(editPatient(edited));
        //this.props.dispatch(getAllPatientsInfo({"token": this.props.token}));
    }
    
    prepSingleField(inputArray){
        const monkeySauce = [];
        const fieldArray = ["name", "age", "gender", "height", "weight", "Dr(name)","Dr(contact)", "allergies"];
        const readyArray = fieldArray.map((field, index)=>{
            return (<div key={index} className="personfield">
                <label htmlFor={field}>{field}: </label>
                <input id={field} className={field} type="text" placeholder={inputArray[index]} ref={input => monkeySauce[index] = input} />
                <button type="click" onClick={()=>{
                    let values = {};
                    values[field] = monkeySauce[index].value.toString();
                    if(values.age){
                        values.age = parseInt(values.age);
                    }
                    if(values["Dr(name)"]){
                        values.doctor = [{}];
                        values.doctor[0].name = values["Dr(name)"];
                        delete values["Dr(name)"];
                    }
                    if(values["Dr(contact)"]){
                        values.doctor = [{}];
                        values.doctor[0].contact = values["Dr(contact)"];
                        delete values["Dr(contact)"];
                    }
                    this.editMe(values);
                    }}><i className="fas fa-check"></i></button>
                </div>);
        });
        return readyArray;
    }
    render(){
        if(this.props.patientNumber != null){
            const personArray = [this.props.listOfOwnedByUser[this.props.patientNumber].name,
                                this.props.listOfOwnedByUser[this.props.patientNumber].age,
                                this.props.listOfOwnedByUser[this.props.patientNumber].gender,
                                this.props.listOfOwnedByUser[this.props.patientNumber].height,
                                this.props.listOfOwnedByUser[this.props.patientNumber].weight,
                                this.props.listOfOwnedByUser[this.props.patientNumber].doctor[0].name,
                                this.props.listOfOwnedByUser[this.props.patientNumber].doctor[0].contact,
                                this.props.listOfOwnedByUser[this.props.patientNumber].allergies
                                ];
            const validArray = personArray.map(f=> f? f: 'optional field..');
            const displayArray = this.prepSingleField(validArray);
            return (<div className="innerlist header">
                {displayArray}
                <div className='trashContainer'>
                <button className='spaceAbove trash' onClick={()=>this.sayGoodbye()} type="click"><i className="far fa-trash-alt"></i></button>
                </div></div>);
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
export default connect(mapStateToProps)(PatientSingle);*/
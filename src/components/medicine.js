import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MedsSingle from './meds_single';
import { createNewMeds } from '../actions/meds';

class Medicine extends Component {
    makeAMeds(){
        const newMeds = {"token": this.props.token, "name": "Tylenol", "dosage": "1 pill", "rateAmount": 4, "howLongAmount": 7};
        this.props.dispatch(createNewMeds(newMeds));
    }
    render(){
        if(this.props.loggedId){
            const common = (<p><button type="click" onClick={()=>this.makeAMeds()}>New Medicine</button></p>);
            const displayMeds = this.props.manyMeds.map((eachMed, index) => {
                return (<div key={index}><MedsSingle form={eachMed.id} formKey={eachMed.id} oneMed={eachMed} whichMed={index}/></div>);
            });
            if(this.props.manyMeds.length > 0){
            return (<div>
                <div>here is meds: {displayMeds}</div>
                {common}
                <p><Link to="/main" >Return to homepage</Link></p>
                </div>);
            } else {
                return (<div>No Meds have been added yet.
                    {common}
                    <p><Link to="/main" >Return to homepage</Link></p>
                </div>);
            }
        }
        else {
            return (<div>Hello there, 
                <Link to='/login'>please Log-in!</Link>
                </div>)
        }   
    }
}

const mapStateToProps = (state)=>({
    loggedId : state.auth.currentUser !== null,
    manyMeds : [...state.meds.manyMeds],
    token : state.auth.authToken
  });
export default connect(mapStateToProps)(Medicine);
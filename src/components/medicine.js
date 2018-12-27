import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MedsSingle from './meds_single';
import { createNewMeds } from '../actions/meds';
import * as newMedsToAdd from '../utils/medsDB';

class Medicine extends Component {
    makeAMeds(whichMeds){
        const newMeds = Object.assign({}, whichMeds, {"token": this.props.token});
        this.props.dispatch(createNewMeds(newMeds));
    }
    
    render(){
        if(this.props.loggedId){
            const common = (<div>
                <p><button type="click" onClick={()=>this.makeAMeds(newMedsToAdd.tylenol)}>Add Tylenol</button></p>
                <p><button type="click" onClick={()=>this.makeAMeds(newMedsToAdd.advil)}>Add Advil</button></p>
                <p><button type="click" onClick={()=>this.makeAMeds(newMedsToAdd.tussin)}>Add Robitussin</button></p>
                </div>);
            const displayMeds = this.props.manyMeds.map((eachMed, index) => {
                return (<div key={index}><MedsSingle form={eachMed.id} formKey={eachMed.id} oneMed={eachMed} whichMed={index}/></div>);
            });
            if(this.props.manyMeds.length > 0){
            return (<div>
                <div>{displayMeds}</div>
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
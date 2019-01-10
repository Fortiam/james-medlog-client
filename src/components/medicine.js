import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MedsSingle from './meds_single';
import { createNewMeds } from '../actions/meds';
import * as newMedsToAdd from '../utils/medsDB';

export class Medicine extends Component {
    makeAMeds(whichMeds){
        const newMeds = Object.assign({}, whichMeds, {"token": this.props.token});
        this.props.dispatch(createNewMeds(newMeds));
    }
    
    render(){
        if(this.props.loggedId){
            const common = (<div className='marginCenter smallbutton'>
                <button className='list' title='add new medicine' onClick={()=>this.makeAMeds(newMedsToAdd.tylenol)}><i className="fas fa-prescription-bottle-alt innerlist"></i></button>
                </div>);
            const displayMeds = this.props.manyMeds.map((eachMed, index) => {
                return (<div className='list' key={index}><MedsSingle form={eachMed.id} formKey={eachMed.id} oneMed={eachMed} whichMed={index}/></div>);
            });
            if(this.props.manyMeds.length > 0){
            return (<div >
                {displayMeds}
                {common}
               </div>);
            } else {
                return (<div className='list'><p className='innerlist'>No Meds have been added yet.</p>
                    {common}
                </div>);
            }
        }
        else {
            return (<Redirect to='/'/>);
        }   
    }
}

const mapStateToProps = (state)=>({
    loggedId : state.auth.currentUser !== null,
    manyMeds : [...state.meds.manyMeds],
    token : state.auth.authToken
  });
export default connect(mapStateToProps)(Medicine);
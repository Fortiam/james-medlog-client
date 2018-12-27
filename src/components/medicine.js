import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MedsSingle from './meds_single';

class Medicine extends Component {
    render(){
        if(this.props.loggedId){
            const displayMeds = this.props.manyMeds.map((eachMed, index) => {
                return (<div key={index}><MedsSingle oneMed={eachMed} whichMed={index}/></div>);
            });
            if(this.props.manyMeds.length > 0){
            return (<div>
                <div>here is meds: {displayMeds}</div>
                <p><Link to="/main" >Return to homepage</Link></p>
                </div>);
            } else {
                return (<div>No Meds have been added yet.
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
    manyMeds : [...state.meds.manyMeds]
  });
export default connect(mapStateToProps)(Medicine);
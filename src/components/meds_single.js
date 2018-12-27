import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { /*submitAction,*/ registerError, /*registerMe */} from '../actions/register';
// import { connect } from 'react-redux';

class MedsSingle extends Component {
    render(){
        return (<div>hello: {this.props.oneMed.name}</div>);
    }
}
// const mapStateToProps = state => ({
//     manyMeds : state.meds.manyMeds
// })
export default reduxForm({
    form: 'register',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(MedsSingle);
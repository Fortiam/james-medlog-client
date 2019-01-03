import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//define actions
import { /*submitAction,*/ registerError, registerMe } from '../actions/register';
import { login } from '../actions/auth';
//define components and functions
import { Input } from './input';
import { required, nonEmpty, legitPassword, stringy } from '../utils/localChecks';

class RegisterPage extends Component{
    onSubmit(values){
        let scopeValues = values;
        // this.props.dispatch(submitAction(values));
        this.props.dispatch(registerMe(values))
        .catch(err=>this.props.dispatch(registerError(err)))
        .then(()=>{
            if(this.props.error===null && this.props.error2.status !==401){
              this.props.dispatch(login(scopeValues.username,scopeValues.password))
              .catch(err=>this.props.dispatch(registerError(err)));
            }
        })
    }
    render(){
        if(this.props.loggedIn){
            return (<Redirect to={{pathname: '/main'}} />);

        }
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <p className="message message-success">
                    Message submitted successfully
                </p>
            );
        }
        let errorMessage;
        if (this.props.error2) {
            errorMessage = (<p className="message message-error">{this.props.error2.reason}</p>);
        }
        return (
            <div>
                <div>{successMessage}</div>
                <div>{errorMessage}</div>
                <form 
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <Field
                        name="username"
                        label="Enter Username: "
                        type="text"
                        component={Input}
                        validate={[required, nonEmpty, stringy]}>
                    </Field>
                    <Field
                        name="firstName"
                        label="Enter First Name(optional): "
                        type="text"
                        component={Input}>
                    </Field>
                    <Field
                        name="lastName"
                        label="Enter Last Name(optional): "
                        type="text"
                        component={Input}>
                    </Field>
                    <Field
                        name="email"
                        label="Enter Email Address(optional): "
                        type="text"
                        component={Input}>
                    </Field>
                    <Field
                        name="password"
                        label="Enter Password: "
                        type="text"
                        component={Input}
                        validate={[required, nonEmpty, stringy, legitPassword]}>
                    </Field>
                    <Field
                        name="useEmailForApi"
                        label="Would you like to have alerts sent to your email?(optional): "
                        component={Input}
                        element="select">
                        <option value='false'>No, thanks</option>
                        <option value='true'>Yes, please</option>
                    </Field>
                    <button type="submit"><i class="far fa-check-circle"></i></button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn : state.auth.currentUser,
    error : state.auth.error,
    error2 : state.signUp.error
});
export default reduxForm({
    form: 'register',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(connect(mapStateToProps)(RegisterPage));

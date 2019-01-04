
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { submitAction, registerError } from '../actions/register';
import { login } from '../actions/auth';
import { Redirect, Link } from 'react-router-dom';
import {Input} from './input';
import { required, nonEmpty, legitPassword, stringy } from '../utils/localChecks';
import { connect } from 'react-redux';

class Login extends Component{
    onSubmit(values){
        this.props.dispatch(submitAction(values));
        return this.props.dispatch(login(values.username, values.password))
        .catch(err=>{this.props.dispatch(registerError(err))});
    }
    
    render(){
        if(this.props.loggedIn){
            return (<Redirect to={{pathname: '/main'}} />);

        }
        let loadingMessage = '';
        if(this.props.loading){
            loadingMessage = (<p>Loading Please Wait..</p>);
        }
        let successMessage;
        if (this.props.submitSucceeded && !this.props.loggedIn) {
            successMessage = (
                <p className="message message-success">
                    Message submitted successfully
                </p>
            );
        }
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div><p className="message message-error">{this.props.error.error}</p>
                <p className="message message-error">{this.props.error.message}</p></div>
            );
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
                        name="password"
                        label="Enter Password: "
                        type="password"
                        component={Input}
                        validate={[required, nonEmpty, stringy, legitPassword]}>
                    </Field>
                    <button disabled={this.props.pristine || this.props.submitting} type="submit"><i className="far fa-check-circle"></i></button>
                </form>
                <div>{loadingMessage}</div>
                <p><Link to='/' >Cancel</Link></p>
            </div>
        );
    }
}
const mapStateToProps = state=> ({
    loggedIn : state.auth.currentUser,
    loading : state.auth.loading,
    error : state.auth.error
});
export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) =>
    dispatch(registerError(errors))
})(connect(mapStateToProps)(Login));

import React from 'react';
import { connect } from 'react-redux';
import { signup,receiveErrors  } from '../../actions/session_actions'; 
import SignupForm from './signup_form';
import { Link } from 'react-router-dom';

const mstp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "Sign up",
    navLink:< Link to = "/login" >Log in to complete your application</Link >,
  };
};

const mdtp = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mstp, mdtp)(SignupForm);

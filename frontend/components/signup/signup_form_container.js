import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions'; 
import SignupForm from './signup_form';
import { receiveErrors } from '../../actions/session_actions';

const mstp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "Sign up"
  };
};

const mdtp = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mstp, mdtp)(SignupForm);

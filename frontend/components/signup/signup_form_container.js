import { connect } from 'react-redux';
import { signup,receiveErrors  } from '../../actions/session_actions'; 
import SignupForm from './signup_form';

const mstp = ({ errors }) => {
  return {
    errors: Object.values(errors.session),
    formType: "Sign up",
  };
};

const mdtp = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mstp, mdtp)(SignupForm);

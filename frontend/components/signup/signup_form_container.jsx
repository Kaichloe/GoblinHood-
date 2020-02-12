import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions'; 
import SignupForm from './signup_form';

const mstp = ({ errors }) => {
  return {
    // errors: errors.session,
    formType: "Sign up"
  };
};

const mdtp = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
  };
};

export default connect(mstp, mdtp)(SignupForm);

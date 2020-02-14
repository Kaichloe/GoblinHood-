import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';
import { receiveErrors } from '../../actions/session_actions';

const mstp = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "Sign In"
  };
};

const mdtp = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(receiveErrors([]))
  };
};

export default connect(mstp, mdtp)(LoginForm);
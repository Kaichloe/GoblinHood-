import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mstp = ({ errors }) => {
  return {
    demoUser:{
      email:"admin_kai___activated@ggez.com",
      password:"adminkaiyip"
    },
    errors: errors.session,
    formType: "Sign In"
  };
};

const mdtp = dispatch => {
  return {
    // processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(receiveErrors([])),
    demoLogin: (user) => dispatch(login(user)),
  };
};

export default connect(mstp, mdtp)(LoginForm);
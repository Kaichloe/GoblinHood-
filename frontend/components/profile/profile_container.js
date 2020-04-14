import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import Profile from './profile'

const mstp = (state) => {
  return{
    currentUser: state.entities.users[0]
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mstp, mdtp)(Profile);

import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import Profile from './profile'
import { fetchAllCompanies, fetchCompany } from '../../actions/company_actions';

const mstp = (state) => {
  return{
    currentUser: state.entities.users[state.session.id]
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchAllCompanies: () => dispatch(fetchAllCompanies()),
    fetchCompany: (ticker) => dispatch(fetchCompany(ticker))
  }
}

export default connect(mstp, mdtp)(Profile);

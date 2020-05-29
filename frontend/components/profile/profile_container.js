import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions'
import Profile from './profile'
import { fetchCompany } from '../../actions/company_actions';
import { fetchPriceData, fetchBigPriceData, fetchLatestPrice} from '../../actions/company_actions';

const mstp = (state) => {
  return{
    balance: state.entities.users[state.session.id].buying_power,
    transactions: state.entities.transactions,
    currentUser: state.entities.users[state.session.id],
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCompany: (ticker) => dispatch(fetchCompany(ticker)),
    fetchLatestPrice: (symbol => dispatch(fetchLatestPrice(symbol))),
    fetchPriceData: (symbol, range) => dispatch(fetchPriceData(symbol, range)),
    fetchBigPriceData: (symbols) => dispatch(fetchBigPriceData(symbols)),
  }
}

export default connect(mstp, mdtp)(Profile);

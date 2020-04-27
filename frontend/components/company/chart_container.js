import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchPriceData } from '../../actions/company_actions';
import { createTransaction, destroyWatchStock, createWatchStock } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
  return {
    priceData: Object.values(state.entities.company),
    defaultPrice: Object.values(state.entities.company).slice(-1)[0],
    openPrice: Object.values(state.entities.company).slice(0, 1)[0],
    companyName: state.entities.stats.companyName,
    symbol: ownProps.match.params.symbol,
    balance: state.entities.users[state.session.id].buying_power.toFixed(2),
    user_port_val: state.entities.users[state.session.id].portfolio_value,
    currentUser: state.entities.users[state.session.id], 
    currentUserId: state.session.id,
    transactions: state.entities.users[state.session.id].transactions,
    error: Object.values(state.errors.session),
  };
}

const mdtp = (dispatch) => {
  
  return {
    fetchPriceData: (symbol,range) => dispatch(fetchPriceData(symbol, range)),
    createTransaction: (transaction) => dispatch(createTransaction(transaction)),
    createWatchStock: (stock) => dispatch(createWatchStock(stock)),
    destroyWatchStock: (stock) => dispatch(destroyWatchStock(stock)),
  }
}

export default withRouter(connect(mstp, mdtp)(ChartForm));
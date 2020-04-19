import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchPriceData } from '../../actions/company_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
  return {
    priceData: Object.values(state.entities.company),
    defaultPrice: Object.values(state.entities.company).slice(-1)[0],
    openPrice: Object.values(state.entities.company).slice(0,1)[0],
    companyName: state.entities.stats.companyName,
    symbol: ownProps.match.params.symbol,
    balance: state.entities.users[state.session.id].buying_power,
    currentUser: state.entities.users[0]
  };
}

const mdtp = (dispatch) => {
  return {
    fetchPriceData: (symbol,range) => dispatch(fetchPriceData(symbol, range)),
    buyStock: (transaction) => dispatch(createTransaction(transaction)),
  }
}

export default withRouter(connect(mstp, mdtp)(ChartForm));
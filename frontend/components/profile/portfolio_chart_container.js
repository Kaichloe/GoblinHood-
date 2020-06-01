import { connect } from "react-redux";
import PortfolioChart from "./portfolio_chart";
import { fetchPriceData, fetchBigPriceData } from '../../actions/company_actions';

const mstp = (state) => {
  return {
    balance: state.entities.users[state.session.id].buying_power,
    transactions: state.entities.transactions,
    currentUser: state.entities.users[state.session.id],
    ownedStocks: state.entities.users[state.session.id].owned_stocks,
    initStockValue: state.entities.users[state.session.id].portfolio_value,
  };
};

const mdtp = (dispatch) => {
  return {
    fetchPriceData: (symbol, range) => dispatch(fetchPriceData(symbol, range)),
    fetchBigPriceData: (symbols) => dispatch(fetchBigPriceData(symbols)),
  };
};

export default connect(mstp, mdtp)(PortfolioChart);

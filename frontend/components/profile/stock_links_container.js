import { connect } from "react-redux";
import StockLinks from "./stock_links";
import { fetchLatestPrice } from '../../actions/company_actions';

const mstp = (state) => {
  return {
    balance: state.entities.users[state.session.id].buying_power,
    ownedStocks: state.entities.users[state.session.id].owned_stocks,
    currentUser: state.entities.users[state.session.id],
    watchlist: state.entities.users[state.session.id].watchlist,
  };
};

const mdtp = (dispatch) => {
  return {
    fetchLatestPrice: (symbol => dispatch(fetchLatestPrice(symbol))),
  };
};

export default connect(mstp, mdtp)(StockLinks);

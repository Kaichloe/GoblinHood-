import { connect } from "react-redux";
import StockLinks from "./stock_links";

const mstp = (state) => {
  return {
    balance: state.entities.users[state.session.id].buying_power,
    owned_stocks: state.entities.users[state.session.id].owned_stocks,
    currentUser: state.entities.users[state.session.id],
    watchlist: state.entities.users[state.session.id].watchlist,
  };
};

const mdtp = (dispatch) => {
  return {
    
  };
};

export default connect(mstp, mdtp)(StockLinks);

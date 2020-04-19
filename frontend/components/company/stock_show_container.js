import { connect } from "react-redux";
import StockShow from "./stock_show";
import { fetchPriceData } from "../../actions/company_actions";
import { createTransaction } from "../../actions/transaction_actions";
import { withRouter } from "react-router-dom";

const mstp = (state, ownProps) => {
  return {
    priceData: Object.values(state.entities.company),
    symbol: ownProps.match.params.symbol,
  };
};

const mdtp = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mstp, mdtp)(StockShow));

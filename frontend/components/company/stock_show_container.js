import { connect } from "react-redux";
import StockShow from "./stock_show";
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

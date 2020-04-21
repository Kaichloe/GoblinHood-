import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import PortfolioChart from "./portfolio_chart"

const mstp = (state) => {
  return {
    balance: state.entities.users[state.session.id].buying_power,
    transactions: state.entities.transactions,
    currentUser: state.entities.users[state.session.id]
  };
};

const mdtp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mstp, mdtp)(PortfolioChart);

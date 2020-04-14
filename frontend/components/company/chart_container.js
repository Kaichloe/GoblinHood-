import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchPriceData } from '../../actions/company_actions';
import { withRouter } from 'react-router-dom';

const mstp = (state, ownProps) => {
  return {
    priceData: Object.values(state.entities.company),
    companyName: state.entities.stats.companyName,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = (dispatch) => {
  return {
    fetchPriceData: (symbol,range) => dispatch(fetchPriceData(symbol, range)),
    
  }
}

export default withRouter(connect(mstp, mdtp)(ChartForm));
import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchPriceData, fetchBigPriceData } from '../../actions/company_actions';


const mstp = (state, ownProps) => {
  return {
    company: state.entities.company,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = (dispatch) => {
  return {
    fetchPriceData: (symbol,range) => dispatch(fetchPriceData(symbol, range)),
    fetchBigPriceData: (symbol, range) => dispatch(fetchBigPriceData(symbol, range))
  }
}

export default connect(mstp, mdtp)(ChartForm);
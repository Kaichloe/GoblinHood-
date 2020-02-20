import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchPriceData } from '../../actions/company_actions';

const mstp = (state, ownProps) => {
  return {
    company: state.entities.company,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = (dispatch) => {
  return {
    fetchPriceData: (symbol) => dispatch(fetchPriceData(symbol))
  }
}

export default connect(mstp, mdtp)(ChartForm);
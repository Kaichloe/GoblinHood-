import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchCompanyHistoricPrices } from '../../actions/company_actions';

const mstp = (state, ownProps) => {
  return {
    company: state.entities.company,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = (dispatch) => {
  return {
    fetchCompanyHistoricPrices: (symbol) => dispatch(fetchCompanyHistoricPrices(symbol))
  }
}

export default connect(mstp, mdtp)(ChartForm);
import { connect } from 'react-redux';
import ChartForm from './chart_form';
import { fetchCompanyHistoricPrices } from '../../actions/company_actions';

const mstp = (state, ownProps) => {
  return {
    stock: state.entities.stock,
    ticker: ownProps.match.params.ticker
  }
}

const mdtp = (dispatch) => {
  return {
    fetchCompanyHistoricPrices: (ticker, interval, range) => dispatch(fetchCompanyHistoricPrices(ticker, interval, range))
  }
}

export default connect(mstp, mdtp)(ChartForm);
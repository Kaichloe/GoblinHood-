import { connect } from 'react-redux';
import ChartForm from './chart_form'

const mstp = (state, ownProps) => {
  return {
    ticker: ownProps.match.params.ticker
  }
}

const mdtp = (dispatch) => {
  return {
    fetchHistorialPrices: (ticker, range, interval) => dispatch(fetchCompanyHistoricPrices(ticker, range, interval))
  }
}

export default connect(mstp, mdtp)(ChartForm);
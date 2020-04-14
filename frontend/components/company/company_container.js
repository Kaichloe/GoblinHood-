import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CompanyForm from './company_form';
import {fetchCompanyBasics, fetchCompanyKeyStats} from '../../actions/company_actions';


const mstp = (state, ownProps) => {
  return {
    stats: state.entities.stats,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = dispatch =>{
  return {
    fetchCompanyBasics: (symbol) => dispatch(fetchCompanyBasics(symbol)),
    fetchCompanyKeyStats: (symbol) => dispatch(fetchCompanyKeyStats(symbol))
  }
}

export default withRouter(connect(mstp, mdtp)(CompanyForm));
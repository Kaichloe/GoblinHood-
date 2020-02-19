import { connect } from 'react-redux';
import CompanyForm from './company_form';


const mstp = (state, ownProps) => {
  return {
    ticker: ownProps.match.params.ticker
  }
}

const mdtp = dispatch =>{
  return {
    fetchCompanyBasic: ()
  }
}

export default connect(mstp, mdtp)(CompanyForm);
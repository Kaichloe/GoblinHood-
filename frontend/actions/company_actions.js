import * as APICompUtil from '../util/company_api_util';

export const RECEIVE_COMPANY = "RECEIVE_COMPANY";
export const RECEIVE_COMPANIES = "RECEIVE_COMPANIES";
export const RECEIVE_COMPANY_BASICS = "RECEIVE_COMPANY_BASICS";
export const RECEIVE_COMPANY_HISTORIC_PRICES = "RECEIVE_COMPANY_HISTORIC_PRICES"

const receiveCompany = (company) => {
  return ({
    type: RECEIVE_COMPANY,
    company,
  })
}

const receiveCompanies = (companies) => ({
  type: RECEIVE_COMPANIES,
  companies,
});

const receiveCompanyHistoricPrices = (prices) => {
  return ({
    type: RECEIVE_COMPANY_HISTORIC_PRICES,
    prices,
  })
}

const receiveCompanyBasics = (company_data) =>{
  return {
    type: RECEIVE_COMPANY_BASICS, 
    company_data
  }
}

export const fetchCompany = (ticker) => (dispatch) => {
  return APICompUtil.fetchCompany(ticker)
    .then((company) => dispatch(receiveCompany(company),
      (err) => dispatch(receiveErrors(err))));
}

export const fetchCompanies = () => dispatch => {
  return APICompUtil.fetchCompanies()
    .then(companies => dispatch(receiveCompanies(companies)))
};

export const fetchCompanyHistoricPrices = (symbol) => (dispatch) => {return APICompUtil.fetchCompanyHistoricPrices(symbol)
  .then((prices) => dispatch(receiveCompanyHistoricPrices(prices)));
}
  
// export const fetchCompanyBasics= (ticker) => dispatch => {
//   return APICompUtil.fetchCompanyBasics(ticker)
//     .then(companyData => dispatch(receiveCompanyBasics(companyData)))
// };




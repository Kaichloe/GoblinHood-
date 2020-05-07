import * as APICompUtil from '../util/company_api_util';
import { receiveErrors } from './session_actions';
export const RECEIVE_HISTORICAL_PRICES = "RECEIVE_HISTORICAL_PRICES";
export const RECEIVE_COMPANY_BASICS = "RECEIEVE_COMPANY_BASICS";
export const RECEIVE_COMPANY_KEY_STATS = "RECEIVE_COMPANY_KEY_STATS";
export const RECEIVE_BIG_HISTORICAL_PRICES = "RECEIVE_BIG_HISTORICAL_PRICES";
export const RECEIVE_COMPANY = "RECEIVE_COMPANY";
export const RECEIVE_ALL_COMPANIES = "RECEIVE_ALL_COMPANIES";

const receiveCompany = (company) =>{
  return{
    type: RECEIVE_COMPANY,
    company,
  }
}

const receiveAllCompanies = (companies) => {
  return{
    type: RECEIVE_ALL_COMPANIES,
    companies,
  }
}


const receivePriceHistory = (priceData) => {
  return {
    type: RECEIVE_HISTORICAL_PRICES, 
    priceData
  };
};

const receiveCompanyBasics = (basics) => {
  return {
    type: RECEIVE_COMPANY_BASICS,
    basics
  }
}

const receiveCompanyKeyStats = (keyStats) => {
  return {
    type: RECEIVE_COMPANY_KEY_STATS,
    keyStats
  }
}

const receiveBigPriceHistory = (priceData) => {
  return {
    type: RECEIVE_BIG_HISTORICAL_PRICES,
    bigPriceData
  }
}

export const fetchCompany = (ticker) => (dispatch) => {
  return (
    APICompUtil.fetchCompany(ticker)
    .then(company => dispatch(receiveCompany(company),
      err => dispatch(receiveErrors(err))))
  )
}

export const fetchAllCompanies = () => (dispatch) => {
  return (
    APICompUtil.fetchCompany()
      .then(companies => dispatch(receiveAllCompanies(companies),
        err => dispatch(receiveErrors(err))))
  )
}

export const fetchPriceData = (symbol, range) => dispatch => {
  return (
    APICompUtil.fetchHistoricalPrices(symbol, range).then((priceData) =>
      dispatch(receivePriceHistory(priceData))
    )
  );
};

export const fetchCompanyBasics = (symbol) => dispatch => {
  return (
    APICompUtil.fetchCompanyBasics(symbol).then(basics => dispatch(receiveCompanyBasics(basics)))
  )
}

export const fetchCompanyKeyStats = (symbol) => dispatch => {
  return (
    APICompUtil.fetchCompanyKeyStats(symbol).then(keyStats => dispatch(receiveCompanyKeyStats(keyStats)))
  )
}

export const fetchBigPriceData = (symbol, range) => dispatch => {
  return (
    APICompUtil.fetchBigHistoricalPrices(symbol, range).then(BigPriceData => dispatch(receiveBigPriceHistory(BigPriceData)))
  )
};




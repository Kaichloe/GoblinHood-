import * as APICompUtil from '../util/company_api_util';

export const RECEIVE_HISTORICAL_PRICES = "RECEIVE_HISTORICAL_PRICES";

const receivePriceHistory = (priceData) => {
  return {
    type: RECEIVE_HISTORICAL_PRICES, 
    priceData
  };
};

export const fetchPriceData = symbol => dispatch => {
  return (
    APICompUtil.fetchHistoricalPrices(symbol).then(priceData => dispatch(receivePriceHistory(priceData)))
  )
};


import { RECEIVE_HISTORICAL_PRICES, RECEIVE_BIG_HISTORICAL_PRICES,  } from '../actions/company_actions';

const companiesReducer = (oldState = [], action) => {
  let innerData;
  let dateClosePrices;
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_HISTORICAL_PRICES:
      innerData = action.priceData.intraday;
      dateClosePrices = Object.keys(innerData).map(key => {
        return [key, innerData[key]['close']];
      });
      return dateClosePrices;
    case RECEIVE_BIG_HISTORICAL_PRICES:
      innerData = action.priceData.history;
      dateClosePrices = Object.keys(innerData).map(key => {
        return [key, innerData[key]['close']];
      });
      return dateClosePrices;
    default:
      return oldState;
  }
}

export default companiesReducer;
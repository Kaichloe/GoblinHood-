import { RECEIVE_HISTORICAL_PRICES } from '../actions/company_actions';

const companiesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_HISTORICAL_PRICES:
      const innerData = action.priceData.intraday;
      let dateClosePrices = Object.keys(innerData).map(key => {
        return [key, innerData[key]['close']];
      });
      return dateClosePrices ;
    default:
      return oldState;
  }
}

export default companiesReducer;
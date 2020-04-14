import { RECEIVE_HISTORICAL_PRICES,RECEIVE_COMPANY_KEY_STATS, RECEIVE_COMPANY_BASICS } from '../actions/company_actions';

const companiesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_HISTORICAL_PRICES:
      return action.priceData ;
    default:
      return oldState;
  }
}

export default companiesReducer;
import { RECEIVE_ALL_COMPANIES, RECEIVE_COMPANY } from '../actions/company_actions';

const AllExchangesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_COMPANY:
      return Object.assign({}, oldState, {[action.company.ticker]: action.company});
    case RECEIVE_ALL_COMPANIES:
      return Object.assign({}, oldState, action.companies);
    default:
      return oldState;
  }
}

export default AllExchangesReducer;
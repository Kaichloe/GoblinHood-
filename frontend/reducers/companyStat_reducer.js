import {
  RECEIVE_COMPANY_KEY_STATS,
  RECEIVE_COMPANY_BASICS,
} from "../actions/company_actions";

const companyStats_Reducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_COMPANY_BASICS:
      return Object.assign({}, oldState, action.basics);
    case RECEIVE_COMPANY_KEY_STATS:
      return Object.assign({}, oldState, action.keyStats);
    default:
      return oldState;
  }
};

export default companyStats_Reducer;

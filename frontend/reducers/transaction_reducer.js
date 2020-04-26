import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';


const transactionReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, action.transaction)
    default:
      return oldState;
  }
}

export default transactionReducer;
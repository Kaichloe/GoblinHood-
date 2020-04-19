import { RECEIVE_TRANSACTION, FETCH_ALL_TRANSACTIONS } from '../actions/transaction_actions';

const transactionReducer = (oldState = [] , action) =>{
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TRANSACTION:
      return Object.assign({}, oldState, {[action.transaction.id]: action.transaction});
    case FETCH_ALL_TRANSACTIONS:
      return Object.assign({}, oldState, action.allTransaction)
    default:
      return oldState;
  }
}

export default transactionReducer;
import * as APIUtil from '../util/transaction_api_util';
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const FETCH_ALL_TRANSACTIONS ="FETCH_ALL_TRANSACTIONS"

const receiveTransaction = (transaction) => {
  return {
    type: RECEIVE_TRANSACTION,
    transaction
  }
}

const fetchAllTransaction = (allTransaction) => {
  return {
    type: FETCH_ALL_TRANSACTIONS,
    allTransaction,
  };
};

export const createTransaction = (transaction) => (dispatch) => {
  return APIUtil.createTransaction(transaction).then( (payload) => dispatch(receiveTransaction(payload)))
} 

export const fetchTransactions = (transactions) => (dispatch) => {
  return APIUtil.fetchTransactions(transactions).then ( (payload) => dispatch(fetchAllTransaction(payload)))
}
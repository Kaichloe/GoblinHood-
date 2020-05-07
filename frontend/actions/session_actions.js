import * as APIUtil from '../util/session_api_util';
import * as TransactionAPIUtil from "../util/transaction_api_util";
import * as WatchlistAPIUtil from "../util/watchlist_api_util";
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  }
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
};

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(logoutCurrentUser())
  ))
);

export const createTransaction = (transaction) => (dispatch) =>
  TransactionAPIUtil.createTransaction(transaction).then(
    (res) => dispatch(receiveCurrentUser(res)), err=> (
      dispatch(receiveErrors(err.responseJSON))
    )
);

export const createWatchStock = (stock) => (dispatch) => {
  return WatchlistAPIUtil.watchStock(stock).then(
    (res) => dispatch(receiveCurrentUser(res)), err => (
      dispatch(receiveErrors(err.responseJSON))
    )
  )
};

export const destroyWatchStock = (stock) => (dispatch) => {
  // debugger
  return WatchlistAPIUtil.unWatchStock(stock).then(
    (res) => dispatch(receiveCurrentUser(res)), err => (
      dispatch(receiveErrors(err.responseJSON))
    )
  )
};
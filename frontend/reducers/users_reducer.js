import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import {RECEIVE_TRANSACTION} from '../actions/transaction_actions';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case RECEIVE_TRANSACTION:
      const user_id = action.transaction.user_id;
      const oldPortVal = state[user_id].portfolio_value;
      const oldBuyPower = state[user_id].buying_power;

      let newBuyPower = "";
      let newPortVal = "";

      const totalPrice =
        action.transaction.quantity * action.transaction.purchase_price;

      if (action.transaction.buy) {
        newBuyPower = oldBuyPower - totalPrice;
        newPortVal = oldPortVal + totalPrice;
      } else {
        newBuyPower= oldBuyPower + totalPrice;
        newPortVal = oldPortVal - totalPrice;
      }

      const newUser = Object.assign({}, state[user_id]);
      newUser.portfolio_value = newPortVal;
      newUser.buying_power = newBuyPower;
      newUser.transactions.push(action.transaction);

      return Object.assign({}, state, { [user_id]: newUser });
    default:
      return state;
  }
};

export default UsersReducer;
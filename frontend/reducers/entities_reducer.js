import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import NewsReducer from './news_reducer';
import companiesReducer from './company_reducer';
import companyStatReducer from './companyStat_reducer';
import transactionReducer from './transaction_reducer';


const EntitiesReducer = combineReducers({
  users:UsersReducer,
  // transactions: transactionReducer,
  news:NewsReducer,
  company: companiesReducer,
  stats: companyStatReducer,
})

export default EntitiesReducer; 
import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import NewsReducer from './news_reducer';
import companiesReducer from './company_reducer';
import companyStatReducer from './companyStat_reducer';



const EntitiesReducer = combineReducers({
  users:UsersReducer,

  news:NewsReducer,
  company: companiesReducer,
  stats: companyStatReducer,
})

export default EntitiesReducer; 
import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import NewsReducer from './news_reducer';

const EntitiesReducer = combineReducers({
  users:UsersReducer,
  news:NewsReducer,
})

export default EntitiesReducer; 
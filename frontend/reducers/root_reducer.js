import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: errorsReducer
})

export default RootReducer;
import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  errors: errorsReducer,
  session: sessionReducer
})

export default RootReducer;
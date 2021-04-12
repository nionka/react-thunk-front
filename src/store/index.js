import { combineReducers, createStore } from 'redux';
import serviceAddReducer from '../redusers/serviceAdd';
import serviceEditReducer from '../redusers/serviceEdit';
import serviceListReducer from '../redusers/serviceList';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
  serviceEdit: serviceEditReducer,
});

const store = createStore(
  reducer
);

export default store;
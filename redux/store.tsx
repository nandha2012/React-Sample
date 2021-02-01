import { createStore, combineReducers } from 'redux';
import { formReducer,fileReducer } from './reducers/formReducer';
import { errorReducer } from './reducers/errorReducer';
const rootReducer = combineReducers({ formReducer, errorReducer,fileReducer});
const store = createStore(rootReducer);
export default store; 
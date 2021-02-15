import { createStore, combineReducers,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { formReducer,fileReducer } from './reducers/formReducer';
import { errorReducer } from './reducers/errorReducer';
import { dashBoardReducer, FilterReducer } from './reducers/dashboardReducer'
import thunk from 'redux-thunk';
const rootReducer = combineReducers({ formReducer, errorReducer, fileReducer, dashBoardReducer, FilterReducer});
const store = createStore(rootReducer,applyMiddleware(thunk));
export default store; 
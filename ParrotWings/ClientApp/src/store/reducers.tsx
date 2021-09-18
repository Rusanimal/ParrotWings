import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import accountReducer from './account/slice';
import userReducer from './user/slice';
import transactionReducer from './transaction/slice';

const reducers = {
    account: accountReducer,
    transaction: transactionReducer,
    user: userReducer
};

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ...reducers
});

export default createRootReducer
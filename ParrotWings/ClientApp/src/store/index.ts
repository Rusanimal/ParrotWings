import { AccountState } from './account/types';
import accountReducer from './account/reducers';
import userReducer from './user/reducers';
import { UserState } from './user/types';
import { TransactionState } from './transaction/types';
import transactionReducer from './transaction/reducers';

// The top-level state object
export interface ApplicationState {
    account: AccountState;
    transaction: TransactionState;
    user: UserState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    account: accountReducer,
    transaction: transactionReducer,
    user: userReducer
};
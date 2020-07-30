import { Action, Reducer } from 'redux';
import { UserAction } from './actions';
import { UserState, UserActionTypes } from "./types";


const initialState: UserState = {
    isLoading: false,
    name: '',
    balance: 0,
    transactionList: [],
    userList: []
}

const reducer: Reducer<UserState> = ((state = initialState, incomingAction: Action): UserState => {
    state = state || initialState;

    const action = incomingAction as UserAction;
    switch (action.type) {
        case UserActionTypes.GET_USER_INFO_SUCCESS:
            return { ...state, balance: action.data.balance, name: action.data.name, isLoading: false };
        case UserActionTypes.GET_USER_INFO_FAIL:
            return { ...state, balance: 0, name: '', isLoading: false };
        case UserActionTypes.REQUEST_START:
            return { ...state, isLoading: true };
        case UserActionTypes.GET_BALANCE_SUCCESS:
            return { ...state, balance: action.data };
        case UserActionTypes.GET_BALANCE_FAIL:
            return { ...state, balance: 0 };
        case UserActionTypes.GET_BALANCE_HISTORY_SUCCESS:
            return { ...state, transactionList: action.data };
        case UserActionTypes.GET_BALANCE_HISTORY_FAIL:
            return { ...state, transactionList: [] };
        default:
            return state;
    }
});

export { reducer as userReducer }
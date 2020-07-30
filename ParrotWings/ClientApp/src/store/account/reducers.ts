import { Action, Reducer } from 'redux';
import { AccountAction } from './actions';
import { AccountState, AccountActionTypes } from "./types";


const initialState: AccountState = {
    isAuthenticated: true,
    isLoading: false,
    error: '',
    isCreated: false
}

const reducer: Reducer<AccountState> = ((state = initialState, incomingAction: Action): AccountState => {
    state = state || initialState;

    const action = incomingAction as AccountAction;
    switch (action.type) {
        case AccountActionTypes.LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, isLoading: false };
        case AccountActionTypes.LOGIN_FAIL:
            return { ...state, isAuthenticated: false, isLoading: false, error: action.error };
        case AccountActionTypes.REGISTER_SUCCESS:
            return { ...state, isLoading: false, isCreated: true };
        case AccountActionTypes.REGISTER_FAIL:
            return { ...state, isLoading: false, error: action.error };
        case AccountActionTypes.REQUEST_START:
            return { ...state, isLoading: true, error: '' };
        case AccountActionTypes.CLEAR_ERROR:
            return { ...state, error: '' };
        case AccountActionTypes.RESET_CREATED:
            return { ...state, isCreated: false };
        case AccountActionTypes.LOGOUT:
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
});

export { reducer as accountReducer }
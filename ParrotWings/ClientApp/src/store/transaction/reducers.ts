import { TransactionState, TransactionActionTypes } from "./types";
import { Reducer, Action } from "redux";
import { TransactionAction } from "./actions";

const initialState: TransactionState = {
    isLoading: false,
    error: '',
    isCreated: false,
    step: 0,
    correspondent: null,
    isBalanceOk: false
}

const reducer: Reducer<TransactionState> = ((state = initialState, incomingAction: Action): TransactionState => {
    state = state || initialState;

    const action = incomingAction as TransactionAction;
    switch (action.type) {
        case TransactionActionTypes.GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                amount: action.data.amount,
                correspondent: {
                    name: action.data.correspondentName ?? "",
                    id: action.data.correspondentId
                },
                step: 2,
                isLoading: false
            };
        case TransactionActionTypes.GET_TRANSACTION_FAIL:
            return { ...state, isLoading: false, error: action.error };
        case TransactionActionTypes.CREATE_TRANSACTION_SUCCESS:
            return { ...state, isLoading: false, isCreated: true };
        case TransactionActionTypes.CREATE_TRANSACTION_FAIL:
            return { ...state, isLoading: false, error: action.error };
        case TransactionActionTypes.REQUEST_START:
            return { ...state, isLoading: true, error: '' };
        case TransactionActionTypes.BACK_STEP:
            return { ...state, step: state.step - 1 };
        case TransactionActionTypes.NEXT_STEP:
            return { ...state, step: state.step + 1 };
        case TransactionActionTypes.SET_AMOUNT:
            return { ...state, amount: action.data };
        case TransactionActionTypes.SET_CORRESPONDENT:
            return { ...state, correspondent: action.data }
        case TransactionActionTypes.CHECK_BALANCE_SUCCESS:
            return { ...state, isBalanceOk: action.data, isLoading: false };
        case TransactionActionTypes.CHECK_BALANCE_FAIL:
            return { ...state, isBalanceOk: false, isLoading: false };
        case TransactionActionTypes.RESET_STATE:
            return initialState;
        default:
            return state;
    }
});

export { reducer as transactionReducer }
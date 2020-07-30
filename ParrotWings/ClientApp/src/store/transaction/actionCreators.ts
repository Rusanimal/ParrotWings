import { AppThunkAction } from "..";
import { TransactionAction } from "./actions";
import { serverApi } from "../../utils/serverApi";
import { AxiosError } from "axios";
import { CreateTransactionModel, TransactionActionTypes } from "./types";
import { AccountActionTypes } from "../account/types";
import { AccountAction } from "../account/actions";
import { UserModel } from "../user/types";

export function createTransaction(model: CreateTransactionModel): AppThunkAction<TransactionAction | AccountAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.REQUEST_START });
        serverApi.post<void>(`Transaction/CreateTransaction`, model)
            .then(function (response) {
                dispatch({ type: TransactionActionTypes.CREATE_TRANSACTION_SUCCESS });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch({ type: AccountActionTypes.LOGOUT });
                    }
                    else {
                        dispatch({ type: TransactionActionTypes.CREATE_TRANSACTION_FAIL, error: error.response.data });
                    }
                } else {
                    dispatch({ type: TransactionActionTypes.CREATE_TRANSACTION_FAIL, error: error.message });
                }
            });
    }
};
export function getTransaction(id: number): AppThunkAction<TransactionAction | AccountAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.REQUEST_START });
        serverApi.get<CreateTransactionModel>(`Transaction/GetTransaction/` + id)
            .then(function (response) {
                dispatch({ type: TransactionActionTypes.GET_TRANSACTION_SUCCESS, data: response.data });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    if (error.response.status === 401) {
                        dispatch({ type: AccountActionTypes.LOGOUT });
                    }
                    else {
                        dispatch({ type: TransactionActionTypes.GET_TRANSACTION_FAIL, error: error.response.data });
                    }
                } else {
                    dispatch({ type: TransactionActionTypes.GET_TRANSACTION_FAIL, error: error.message });
                }
            });
    }
};

export function resetState(): AppThunkAction<TransactionAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.RESET_STATE });
    }
};

export function backStep(): AppThunkAction<TransactionAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.BACK_STEP });
    }
};

export function nextStep(): AppThunkAction<TransactionAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.NEXT_STEP });
    }
};

export function setAmount(amount: number): AppThunkAction<TransactionAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.SET_AMOUNT, data: amount });
    }
};

export function setCorrespondent(model: UserModel | null): AppThunkAction<TransactionAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.SET_CORRESPONDENT, data: model });
    }
};

export function checkUserBalance(amount: number): AppThunkAction<TransactionAction | AccountAction> {
    return (dispatch) => {
        dispatch({ type: TransactionActionTypes.REQUEST_START });
        serverApi.get<boolean>(`User/CheckUserBalance/` + amount)
            .then(function (response) {
                dispatch({ type: TransactionActionTypes.CHECK_BALANCE_SUCCESS, data: response.data });
            })
            .catch(function (error: AxiosError) {
                if (error.response && error.response.status === 401) {
                    dispatch({ type: AccountActionTypes.LOGOUT });
                }
                else {
                    dispatch({ type: TransactionActionTypes.CHECK_BALANCE_FAIL });
                }
            });
    }
};
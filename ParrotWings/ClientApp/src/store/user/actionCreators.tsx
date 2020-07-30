import { AppThunkAction } from "..";
import { UserActionTypes, UserInfoModel, TransactionModel } from "./types";
import { UserAction } from "./actions";
import { serverApi } from "../../utils/serverApi";
import { AxiosError } from "axios";
import { AccountActionTypes } from "../account/types";
import { AccountAction } from "../account/actions";

export function getUserInfo(): AppThunkAction<UserAction | AccountAction> {
    return (dispatch) => {
        dispatch({ type: UserActionTypes.REQUEST_START });
        serverApi.get<UserInfoModel>(`User/GetUserInfo`)
            .then(function (response) {
                dispatch({ type: UserActionTypes.GET_USER_INFO_SUCCESS, data: response.data });
            })
            .catch(function (error: AxiosError) {
                if (error.response && error.response.status === 401) {
                    dispatch({ type: AccountActionTypes.LOGOUT });
                }
                else {
                    dispatch({ type: UserActionTypes.GET_USER_INFO_FAIL });
                }
            });
    }
};

export function getBalance(): AppThunkAction<UserAction | AccountAction> {
    return (dispatch) => {
        serverApi.get<number>(`User/GetBalance`)
            .then(function (response) {
                dispatch({ type: UserActionTypes.GET_BALANCE_SUCCESS, data: response.data });
            })
            .catch(function (error: AxiosError) {
                if (error.response && error.response.status === 401) {
                    dispatch({ type: AccountActionTypes.LOGOUT });
                }
                else {
                    dispatch({ type: UserActionTypes.GET_BALANCE_FAIL });
                }
            });
    }
};

export function getBalanceHistory(): AppThunkAction<UserAction | AccountAction> {
    return (dispatch) => {
        dispatch({ type: UserActionTypes.REQUEST_START });
        serverApi.get<Array<TransactionModel>>(`User/GetBalanceHistory`)
            .then(function (response) {
                dispatch({ type: UserActionTypes.GET_BALANCE_HISTORY_SUCCESS, data: response.data });
            })
            .catch(function (error: AxiosError) {
                if (error.response && error.response.status === 401) {
                    dispatch({ type: AccountActionTypes.LOGOUT });
                }
                else {
                    dispatch({ type: UserActionTypes.GET_BALANCE_HISTORY_FAIL });
                }
            });
    }
};
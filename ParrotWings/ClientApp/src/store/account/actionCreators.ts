import { AppThunkAction } from "..";
import { LoginModel, AccountActionTypes, RegisterModel } from "./types";
import { AccountAction } from "./actions";
import { serverApi } from "../../utils/serverApi";
import { AxiosError } from "axios";

export function login(model: LoginModel): AppThunkAction<AccountAction> {
    return (dispatch) => {
        dispatch({ type: AccountActionTypes.REQUEST_START });
        serverApi.post<string>(`Account/Login`, model)
            .then(function (response) {
                dispatch({ type: AccountActionTypes.LOGIN_SUCCESS });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    dispatch({ type: AccountActionTypes.LOGIN_FAIL, error: error.response.data });
                } else if (error.request) {
                    dispatch({ type: AccountActionTypes.LOGIN_FAIL, error: error.request });
                } else {
                    dispatch({ type: AccountActionTypes.LOGIN_FAIL, error: error.message });
                }
            });
    }
};
export function register(model: RegisterModel): AppThunkAction<AccountAction> {
    return (dispatch) => {
        dispatch({ type: AccountActionTypes.REQUEST_START });
        serverApi.post<string>(`Account/Register`, model)
            .then(function (response) {
                dispatch({ type: AccountActionTypes.REGISTER_SUCCESS });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    dispatch({ type: AccountActionTypes.REGISTER_FAIL, error: error.response.data });
                } else if (error.request) {
                    dispatch({ type: AccountActionTypes.REGISTER_FAIL, error: error.request });
                } else {
                    dispatch({ type: AccountActionTypes.REGISTER_FAIL, error: error.message });
                }
            });
    }
};

export function clearError(): AppThunkAction<AccountAction> {
    return (dispatch) => {
        dispatch({ type: AccountActionTypes.CLEAR_ERROR });
    }
};

export function resetCreated(): AppThunkAction<AccountAction> {
    return (dispatch) => {
        dispatch({ type: AccountActionTypes.RESET_CREATED });
    }
};

export function logout(): AppThunkAction<AccountAction> {
    return (dispatch) => {
        serverApi.get<string>(`Account/Logout`)
            .then(function (response) {
                dispatch({ type: AccountActionTypes.LOGOUT });
            })
            .catch(function (error: AxiosError) {
                if (error.response) {
                    dispatch({ type: AccountActionTypes.LOGIN_FAIL, error: error.response.data.error });
                } else if (error.request) {
                    dispatch({ type: AccountActionTypes.REGISTER_FAIL, error: error.request });
                } else {
                    dispatch({ type: AccountActionTypes.REGISTER_FAIL, error: error.message });
                }
            });
    }
};
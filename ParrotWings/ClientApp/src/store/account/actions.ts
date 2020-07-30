import { AccountActionTypes } from "./types";

interface LoginSuccessAction { type: AccountActionTypes.LOGIN_SUCCESS }
interface LoginFailAction { type: AccountActionTypes.LOGIN_FAIL, error: string }
interface RegisterSuccessAction { type: AccountActionTypes.REGISTER_SUCCESS }
interface RegisterFailAction { type: AccountActionTypes.REGISTER_FAIL, error: string }
interface RequestStartAction { type: AccountActionTypes.REQUEST_START }
interface ClearErrorAction { type: AccountActionTypes.CLEAR_ERROR }
interface ResetCreatedAction { type: AccountActionTypes.RESET_CREATED }
interface LogoutAction { type: AccountActionTypes.LOGOUT }

export type AccountAction = LoginSuccessAction | LoginFailAction | LogoutAction | ResetCreatedAction
    | RegisterSuccessAction | RegisterFailAction | RequestStartAction | ClearErrorAction ;
export enum AccountActionTypes {
    LOGIN_SUCCESS = '@@account/LOGIN_SUCCESS',
    LOGIN_FAIL = '@@account/LOGIN_FAIL',
    REGISTER_SUCCESS = '@@account/REGISTER_SUCCESS',
    REGISTER_FAIL = '@@account/REGISTER_FAIL',
    REQUEST_START = '@@account/REQUEST_START',
    CLEAR_ERROR = '@@account/CLEAR_ERROR',
    RESET_CREATED = '@@account/RESET_CREATED',
    LOGOUT = '@@account/LOGOUT'
}

export type AccountState = Readonly<{
    error: string,
    isAuthenticated: boolean,
    isLoading: boolean,
    isCreated: boolean
}>

export interface LoginModel {
    email: string;
    password: string;
}

export interface RegisterModel {
    confirmPassword: string;
    email: string;
    name: string;
    password: string;
}
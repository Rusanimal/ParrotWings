export enum UserActionTypes {
    GET_USER_INFO_SUCCESS = '@@user/GET_USER_INFO_SUCCESS',
    GET_USER_INFO_FAIL = '@@user/GET_USER_INFO_FAIL',
    GET_BALANCE_SUCCESS = '@@user/GET_BALANCE_SUCCESS',
    GET_BALANCE_FAIL = '@@user/GET_BALANCE_FAIL',
    GET_BALANCE_HISTORY_SUCCESS = '@@user/GET_BALANCE_HISTORY_SUCCESS',
    GET_BALANCE_HISTORY_FAIL = '@@user/GET_BALANCE_HISTORY_FAIL',
    REQUEST_START = '@@user/REQUEST_START'
}

export type UserState = Readonly<{
    name: string,
    balance: number,
    isLoading: boolean,
    userList: Array<UserModel>,
    transactionList: Array<TransactionModel>
}>

export interface UserInfoModel {
    name: string;
    balance: number;
}

export interface UserModel {
    id: number;
    name: string;
}

export interface TransactionModel {
    amount: number;
    correspondentName: string;
    creationDate: string;
    resultingBalance: number;
    transitionId: number;
}

export enum OrderFields {
    CreateDateDesc = 0,
    CreateDateAsc = 1,
    AmountDesc = 2,
    AmountAsc = 3,
    RecepientDesc = 4,
    RecepientAsc = 5
}
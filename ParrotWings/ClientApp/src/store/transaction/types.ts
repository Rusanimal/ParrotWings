import { UserModel } from "../user/types";

export enum TransactionActionTypes {
    CREATE_TRANSACTION_SUCCESS = '@@transaction/CREATE_TRANSACTION_SUCCESS',
    CREATE_TRANSACTION_FAIL = '@@transaction/CREATE_TRANSACTION_FAIL',
    GET_TRANSACTION_SUCCESS = '@@transaction/GET_TRANSACTION_SUCCESS',
    GET_TRANSACTION_FAIL = '@@transaction/GET_TRANSACTION_FAIL',
    REQUEST_START = '@@transaction/REQUEST_START',
    RESET_STATE = '@@transaction/RESET_STATE',
    NEXT_STEP = '@@transaction/NEXT_STEP',
    BACK_STEP = '@@transaction/BACK_STEP',
    SET_AMOUNT = '@@transaction/SET_AMOUNT',
    SET_CORRESPONDENT = '@@transaction/SET_CORRESPONDENT',
    CHECK_BALANCE_SUCCESS = '@@transaction/CHECK_BALANCE_SUCCESS',
    CHECK_BALANCE_FAIL = '@@transaction/CHECK_BALANCE_FAIL',
}

export type TransactionState = Readonly<{
    amount?: number,
    error: string,
    correspondent: UserModel | null,
    isLoading: boolean,
    isCreated: boolean,
    step: number,
    isBalanceOk: boolean
}>

export interface CreateTransactionModel {
    amount: number;
    correspondentId: number;
    correspondentName?: string;
}
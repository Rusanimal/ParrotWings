import { TransactionActionTypes, CreateTransactionModel } from "./types";
import { UserModel } from "../user/types";

interface CreateTransactionFailAction { type: TransactionActionTypes.CREATE_TRANSACTION_FAIL, error: string }
interface CreateTransactionSuccessAction { type: TransactionActionTypes.CREATE_TRANSACTION_SUCCESS }
interface GetTransactionFailAction { type: TransactionActionTypes.GET_TRANSACTION_FAIL, error: string }
interface GetTransactionSuccessAction { type: TransactionActionTypes.GET_TRANSACTION_SUCCESS, data: CreateTransactionModel }
interface RequestStartAction { type: TransactionActionTypes.REQUEST_START }
interface ResetStateAction { type: TransactionActionTypes.RESET_STATE }
interface BackStepAction { type: TransactionActionTypes.BACK_STEP }
interface NextStepAction { type: TransactionActionTypes.NEXT_STEP }
interface SetAmountAction { type: TransactionActionTypes.SET_AMOUNT, data: number }
interface SetCorrespondentAction { type: TransactionActionTypes.SET_CORRESPONDENT, data: UserModel | null }
interface CheckBalanceSuccessAction { type: TransactionActionTypes.CHECK_BALANCE_SUCCESS, data: boolean }
interface CheckBalanceFailAction { type: TransactionActionTypes.CHECK_BALANCE_FAIL }

export type TransactionAction = CreateTransactionFailAction | CreateTransactionSuccessAction | CreateTransactionSuccessAction
    | GetTransactionFailAction | GetTransactionSuccessAction | RequestStartAction | ResetStateAction | BackStepAction
    | NextStepAction | SetAmountAction | SetCorrespondentAction | CheckBalanceSuccessAction | CheckBalanceFailAction;
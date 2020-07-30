import { UserActionTypes, UserInfoModel, TransactionModel } from "./types";

interface GetUserInfoSuccessAction { type: UserActionTypes.GET_USER_INFO_SUCCESS, data: UserInfoModel }
interface GetUserInfoFailAction { type: UserActionTypes.GET_USER_INFO_FAIL }
interface GetBalanceSuccessAction { type: UserActionTypes.GET_BALANCE_SUCCESS, data: number }
interface GetBalanceFailAction { type: UserActionTypes.GET_BALANCE_FAIL }
interface GetBalanceHitorySuccessAction { type: UserActionTypes.GET_BALANCE_HISTORY_SUCCESS, data: Array<TransactionModel> }
interface GetBalanceHitoryFailAction { type: UserActionTypes.GET_BALANCE_HISTORY_FAIL }
interface RequestStart { type: UserActionTypes.REQUEST_START }

export type UserAction = GetUserInfoSuccessAction | GetUserInfoFailAction 
     | GetBalanceSuccessAction | GetBalanceFailAction | GetBalanceHitorySuccessAction
    | GetBalanceHitoryFailAction | RequestStart;
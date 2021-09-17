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
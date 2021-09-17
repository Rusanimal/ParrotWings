import { UserModel } from "../user/types";

export type TransactionState = Readonly<{
    amount?: number,
    error: string | undefined,
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
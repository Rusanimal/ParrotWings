import { TransactionState, CreateTransactionModel } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../utils/serverApi";
import { logout } from "../account/slice";

const initialState: TransactionState = {
    isLoading: false,
    error: '',
    isCreated: false,
    step: 0,
    correspondent: null,
    isBalanceOk: false
}

export const createTransactionAsync = createAsyncThunk('transaction/create', async (model: CreateTransactionModel, thunkApi) => {
    const response = await serverApi.post<void>(`Transaction/CreateTransaction`, model);
    if (response.status === 401) thunkApi.dispatch(logout);
    return response.data;
});

export const getTransactionAsync = createAsyncThunk('transaction/get', async (id: number, thunkApi) => {
    const response = await serverApi.get<CreateTransactionModel>(`Transaction/GetTransaction/` + id);
    if (response.status === 401) thunkApi.dispatch(logout);
    return response.data;
});

export const checkUserBalanceAsync = createAsyncThunk('transaction/checkUserBalance', async (amount: number, thunkApi) => {
    const response = await serverApi.get<Boolean>('User/CheckUserBalance/' + amount);
    if (response.status === 401) thunkApi.dispatch(logout);
    return response.data;
});

export const transactionSlice = createSlice({
    name: 'Transaction',
    initialState,
    reducers: {
        resetState: state => initialState,
        backStep: state => {
            state.step -= 1;
        },
        nextStep: state => {
            state.step += 1;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setCorrespondent: (state, action) => {
            state.correspondent = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createTransactionAsync.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(createTransactionAsync.fulfilled, (state) => {
                state.isCreated = true;
                state.isLoading = false;
            })
            .addCase(createTransactionAsync.rejected, (state, action) => {
                state.error = action.error.message;
                state.isCreated = false;
                state.isLoading = false;
            })
            .addCase(getTransactionAsync.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getTransactionAsync.fulfilled, (state, action) => {
                state.amount = action.payload.amount;
                state.correspondent = {
                    name: action.payload.correspondentName ?? "",
                    id: action.payload.correspondentId
                };
                state.step = 2;
                state.isLoading = false;
            })
            .addCase(getTransactionAsync.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
            .addCase(checkUserBalanceAsync.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(checkUserBalanceAsync.fulfilled, (state, action) => {
                state.isBalanceOk = action.payload;
                state.isLoading = false;
            })
            .addCase(checkUserBalanceAsync.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

export const { resetState, backStep, nextStep, setAmount, setCorrespondent } = transactionSlice.actions;

export default transactionSlice.reducer;
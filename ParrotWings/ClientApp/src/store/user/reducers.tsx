import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverApi } from '../../utils/serverApi';
import { logout } from '../account/reducers';
import { UserState, UserInfoModel, TransactionModel } from "./types";


const initialState: UserState = {
    isLoading: false,
    name: '',
    balance: 0,
    transactionList: [],
    userList: []
}

export const getUserInfoAsync = createAsyncThunk('user/getUserInfo', async () => {
    const response = await serverApi.get<UserInfoModel>(`User/GetUserInfo`);
    return response.data;
});

export const getBalanceAsync = createAsyncThunk('user/getBalace', async () => {
    const response = await serverApi.get<number>(`User/GetBalance`);
    return response.data;
});

export const getBalanceHistoryAsync = createAsyncThunk('user/getBalanceHistoryAsync', async () => {
    const response = await serverApi.get<Array<TransactionModel>>(`User/GetBalanceHistory`);
    return response.data;
});

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserInfoAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserInfoAsync.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.balance = action.payload.balance;
                state.isLoading = false;
            })
            .addCase(getUserInfoAsync.rejected, (state, action) => {
                if (action.error.code === '401') logout();
                state.name = '';
                state.balance = 0;
                state.isLoading = false;
            })
            .addCase(getBalanceAsync.fulfilled, (state, action) => {
                state.balance = action.payload;
            })
            .addCase(getBalanceAsync.rejected, (state, action) => {
                state.balance = 0;
            })
            .addCase(getBalanceHistoryAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBalanceHistoryAsync.fulfilled, (state, action) => {
                state.transactionList = action.payload;
                state.isLoading = false;
            })
            .addCase(getBalanceHistoryAsync.rejected, (state, action) => {
                state.transactionList = [];
                state.isLoading = false;
            })
    }
});

export default userSlice.reducer;
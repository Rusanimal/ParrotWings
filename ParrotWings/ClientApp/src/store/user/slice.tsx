import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverApi } from '../../utils/serverApi';
import { logout } from '../account/slice';
import { UserState, UserInfoModel, TransactionModel } from "./types";


const initialState: UserState = {
    isLoading: false,
    name: '',
    balance: 0,
    transactionList: [],
    userList: []
}

export const getUserInfoAsync = createAsyncThunk('user/getUserInfo', async (_, thunkApi) => {
    try {
        const response = await serverApi.get<UserInfoModel>(`User/GetUserInfo`);
        return response.data;
    }
    catch (err) {
        if (err.response.status === 401) thunkApi.dispatch(logout());
        return thunkApi.rejectWithValue(err.response.data);
    }
});

export const getBalanceAsync = createAsyncThunk('user/getBalace', async (_, thunkApi) => {
    try {
        const response = await serverApi.get<number>(`User/GetBalance`);
        return response.data;
    }
    catch (err) {
        if (err.response.status === 401) thunkApi.dispatch(logout());
        return thunkApi.rejectWithValue(err.response.data);
    }
});

export const getBalanceHistoryAsync = createAsyncThunk('user/getBalanceHistoryAsync', async (_, thunkApi) => {
    try {
        const response = await serverApi.get<Array<TransactionModel>>(`User/GetBalanceHistory`);
        return response.data;
    }
    catch (err) {
        if (err.response.status === 401) thunkApi.dispatch(logout());
        return thunkApi.rejectWithValue(err.response.data);
    }
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
                state.name = action.payload!.name;
                state.balance = action.payload!.balance;
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
            .addCase(getBalanceHistoryAsync.rejected, (state) => {
                state.transactionList = [];
                state.isLoading = false;
            })
    }
});

export default userSlice.reducer;
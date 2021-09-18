import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
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

export const getUserInfoAsync = (dispatch) => {
    dispatch({ type: UserActionTypes.REQUEST_START });
    serverApi.get<UserInfoModel>(`User/GetUserInfo`)
        .then(function (response) {
            dispatch({ type: UserActionTypes.GET_USER_INFO_SUCCESS, data: response.data });
        })
        .catch(function (error: AxiosError) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
            }
            else {
                dispatch({ type: UserActionTypes.GET_USER_INFO_FAIL });
            }
        });
};

export const getBalanceAsync = createAsyncThunk('user/getBalace', async (_, thunkApi) => {
    const response = await serverApi.get<number>(`User/GetBalance`);
    if (response.status === 401) thunkApi.dispatch(logout());
    return response.data;
});

export const getBalanceHistoryAsync = createAsyncThunk('user/getBalanceHistoryAsync', async (_, thunkApi) => {
    const response = await serverApi.get<Array<TransactionModel>>(`User/GetBalanceHistory`);
    if (response.status === 401) thunkApi.dispatch(logout());
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
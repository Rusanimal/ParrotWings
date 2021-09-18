import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverApi } from "../../utils/serverApi";
import { AccountState, LoginModel, RegisterModel } from "./types";


const initialState: AccountState = {
    isAuthenticated: true,
    isLoading: false,
    error: '',
    isCreated: false
}

export const logoutAsync = createAsyncThunk('account/logout', async () => {
    const response = await serverApi.get<string>(`Account/Logout`);
    return response.data;
});

export const loginAsync = createAsyncThunk('account/login', async (model: LoginModel) => {
    const response = await serverApi.post<string>(`Account/Login`, model);
    return response.data;
});

export const registerAsync = createAsyncThunk('account/register', async (model: RegisterModel) => {
    const response = await serverApi.post<string>(`Account/Register`, model);
    return response.data;
});

export const accountSlice = createSlice({
    name: "Account",
    initialState,

    reducers: {
        clearError: state => {
            state.error = '';
        },
        resetCreated: state => {
            state.isCreated = false;
        },
        logout: state => {
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(loginAsync.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginAsync.rejected, (state, action) => {         
                state.error = action.error.message;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.isCreated = true;
                state.isLoading = false;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            })
    }
});

export const { clearError, resetCreated, logout } = accountSlice.actions;

export default accountSlice.reducer;


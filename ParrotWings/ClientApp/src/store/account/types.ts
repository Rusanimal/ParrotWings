export type AccountState = Readonly<{
    error: string | undefined,
    isAuthenticated: boolean,
    isLoading: boolean,
    isCreated: boolean
}>

export interface LoginModel {
    email: string;
    password: string;
}

export interface RegisterModel {
    confirmPassword: string;
    email: string;
    name: string;
    password: string;
}
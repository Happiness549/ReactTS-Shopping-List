import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";

interface LoginForm{
    email: string;
    password: string;
}

interface LoginState{
    loginForm: LoginForm;
    loading: boolean;
    error: string | null;
    success: string | null;
}

const initialState: LoginState ={
    loginForm: {
        email: "",
        password: ""
    },

    loading: false,
    error: null,
    success: null,
};



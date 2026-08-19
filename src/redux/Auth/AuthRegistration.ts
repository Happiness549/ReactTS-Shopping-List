import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export interface UserData{
    name: string;
    surname: string;
    email: string;
    cellNumber: number;
    password: string;
}

interface AuthState{
    user: UserData | null;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    errorMessage: null
}

export const AuthRegistration = createAsyncThunk('auth/RegistrationSlice',
    async(AuthState, UserData) =>{
        const response = await fetch('http://localhost:3000/',{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AuthState),
        });

        const data = await response.json();
        return data;
        
    }
) 
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

const RegistrationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
})




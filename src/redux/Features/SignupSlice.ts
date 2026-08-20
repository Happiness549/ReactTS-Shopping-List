import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export interface UserData{
    id: number;
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    password: string;
}

interface Inputs{
    name: string;
    surname: string; 
    email: string;
    cellNumber: string;
    password: string;
}

export interface AuthState{
    users: UserData[];
    loading: boolean
    error: string | null;
    inputs: Inputs;
   

}

const initialState: AuthState = {
    users: [],
    loading: false,
    error: null,
    inputs: {
        name: '',
        surname: '',
        email: '',
        cellNumber: '',
        password: ''
    }
}

export const AuthRegistration = createAsyncThunk('auth/registration',
    async(newUser: Omit<UserData, "id">) =>{
        const response = await fetch('http://localhost:3000/users',{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        if(!response.ok){
            throw new Error("failed to add list")
        }

        const userData = await response.json();
        return userData;
        
    }
);

const signUpSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updatedField: (state, action) => {
            const{name, value} = action.payload
            state.inputs[name] = value;
        },
        resetForm: (state) => {
      state.inputs = { name: '', surname: '', email: '', cellNumber: '', password: '' };
    }
    },
    extraReducers: (builder) => {
        builder.addCase(AuthRegistration.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(AuthRegistration.fulfilled, (state) => {
            state.loading = false;
        
        });

        builder.addCase(AuthRegistration.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message ?? "Failed to add user."
        })

    }
})
export const {updatedField, resetForm} = signUpSlice.actions

export default signUpSlice.reducer
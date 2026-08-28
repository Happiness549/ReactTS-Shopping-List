import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { UserData } from './SignupSlice';
import { saveUser, getUser } from '../../utils/localStorage'; 

interface LoginState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: LoginState = {
  userData: getUser(),
  loading: false,
  error: null,
  success: null,
};


export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const email = state.user.signupForm.email;
      const password = state.user.signupForm.password;

      if (!email || !password) {
        return rejectWithValue('Please enter your email and password');
      }

const response = await fetch(
  `http://localhost:3000/users?email=${encodeURIComponent(email)}`
);

if (!response.ok) {
  throw new Error('Failed to reach authentication server');
}

const users: UserData[] = await response.json();


if (users.length === 0) {
  return rejectWithValue('User with this email does not exist');
}


const foundUser = users[0];
const inputPassword = String(password).trim();
const dbPassword = String(foundUser.password).trim(); 

if (inputPassword !== dbPassword) {
  return rejectWithValue('Invalid password');
}


return foundUser; 

    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  }
);

export const updateUser = createAsyncThunk("login/updateUser",
  async(updatedUser: UserData, {rejectWithValue}) => {
    try{
      const response = await fetch(`http://localhost:3000/users/${updatedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUser)
        });
        if(!response.ok){
          throw new Error("Failed to update profile");
        }
        const user: UserData = await response.json();
        return user;
    }catch(error) {
      return rejectWithValue(error instanceof Error
        ? error.message : "Something went wrong"
      )
    }
  }
);

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    clearLoginMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        saveUser(action.payload);
        state.success = 'Login successful!';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Invalid email or password';
        state.success = null;
        state.userData = null;
      })

      .addCase(updateUser.pending,(state)=>{
        state.loading = true;
        state.error = null;
        state.success =null
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.loading =false;
        state.userData =action.payload;
        saveUser(action.payload);
        state.success = "Profile updated successfully!";
        state.error = (action.payload as any) || "Failed to update profile";
        state.success = null;
      })
  },
});

export const { logout, clearLoginMessage } = LoginSlice.actions;
export default LoginSlice.reducer;

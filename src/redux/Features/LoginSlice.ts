import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { UserData } from './SignupSlice';

interface LoginState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: LoginState = {
  userData: null,
  loading: false,
  error: null,
  success: null,
};

// Fixed syntax errors and added an optional arg parameter if you want to pass credentials directly
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      
      // CRITICAL NOTE: Ensure state.user.signupForm is where your active login inputs are stored.
      const email = state.user.signupForm.email;
      const password = state.user.signupForm.password;

      console.log('Response status email:', email);
      console.log('Response status password:', password);

      if (!email || !password) {
        return rejectWithValue('Please enter your email and password');
      }
// 1. Fetch only by email to prevent URL parameter type bugs
const response = await fetch(
  `http://localhost:3000/users?email=${encodeURIComponent(email)}`
);

if (!response.ok) {
  throw new Error('Failed to reach authentication server');
}

const users: UserData[] = await response.json();
console.log('Users found with this email:', users);

if (users.length === 0) {
  return rejectWithValue('User with this email does not exist');
}

// 2. Safely verify password, handling both string "123456" and number 123456
const foundUser = users[0];
const inputPassword = String(password).trim();
const dbPassword = String(foundUser.password).trim(); // assuming key name is 'password'

if (inputPassword !== dbPassword) {
  return rejectWithValue('Invalid password');
}

// 3. Return the specific user object, not the whole array
return foundUser; 

    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Something went wrong'
      );
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
        state.success = 'Login successful!';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Invalid email or password';
        state.success = null;
        state.userData = null;
      });
  },
});

export const { logout, clearLoginMessage } = LoginSlice.actions;
export default LoginSlice.reducer;

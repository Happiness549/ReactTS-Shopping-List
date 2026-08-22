import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ShoppingList {
  id: number;
  userId?: string;
  category: string;
  numberOfItem: number;
  completed: number;
}

interface ListState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  lists: [],
  loading: false,
  error: null,
};

// add list to db
export const addList = createAsyncThunk(
  "lists/addList",
  async (newList: Omit<ShoppingList, "id">, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;

      if (!userId) {
        return rejectWithValue("You must be logged in");
      }

      const listWithUser = {
        ...newList,
        userId,
      };

      const response = await fetch("http://localhost:3000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listWithUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add list");
      }

      const listData = await response.json();
      return listData as ShoppingList;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

export const fetchLists = createAsyncThunk(
  "lists/fetchlists",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;

      if (!userId) {
        return rejectWithValue("You must be logged in");
      }

      const response = await fetch(`http://localhost:3000/lists?userID=${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch shopping lists");
      }

      const data: ShoppingList[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(addList.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to add list";
      })
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch shopping lists";
      });
  },
});

export default listSlice.reducer;

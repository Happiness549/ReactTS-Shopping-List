import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface ShoppingList {
  id?: number;
  userId?: string;
  category: string;
  numberOfItem: number;
  completed: number;
}

interface ListState {
  shoppingList: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  shoppingList: [],
  loading: false,
  error: null,
};

// ADD LIST
export const addList = createAsyncThunk(
  "lists/addList",
  async (
    newList: Omit<ShoppingList, "id">,
    { getState, rejectWithValue }
  ) => {
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

      const data: ShoppingList = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

// FETCH LISTS
export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;

      if (!userId) {
        return rejectWithValue("You must be logged in");
      }

      const response = await fetch(
        `http://localhost:3000/lists?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shopping lists");
      }

      const data: ShoppingList[] = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

// UPDATE LIST
export const updateList = createAsyncThunk(
  "lists/updateList",
  async (
    updatedList: ShoppingList,{ getState, rejectWithValue }) => {
   
      try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;

      if (!userId) {
        return rejectWithValue("You must be logged in");
      }

      if (!updatedList.id) {
        return rejectWithValue("List ID is missing");
      }

      const existingList = state.list.shoppingList.find((list) => list.id === updatedList.id);

      if (
        !existingList ||
        existingList.userId == null ||
        String(existingList.userId) !== String(userId)
      ) {
        return rejectWithValue(
          "You are not allowed to update this list"
        );
      }

      const response = await fetch(
        `http://localhost:3000/lists/${updatedList.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: updatedList.category,
            numberOfItem: updatedList.numberOfItem,
            completed: updatedList.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update list");
      }

      const data: ShoppingList = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

// DELETE LIST
export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (
    listId: number,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;

      const list = state.list.shoppingList.find(
        (currentList) => currentList.id === listId
      );

      if (!list || list.userId !== userId) {
        return rejectWithValue(
          "You are not allowed to delete this list"
        );
      }

      const response = await fetch(
        `http://localhost:3000/lists/${listId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete list");
      }

      return listId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
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

      // ADD
      .addCase(addList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addList.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList.push(action.payload);
      })

      .addCase(addList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add list";
      })

      // FETCH
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList = action.payload;
      })

      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch shopping lists";
      })

      // UPDATE
      .addCase(updateList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateList.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.shoppingList.findIndex((list) => list.id === action.payload.id);
        if (index !== -1) {
          state.shoppingList[index] = action.payload;
        }
      })

      // Replacing the whole object of lists returned from the thunk with updated list
      .addCase(updateList.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
            ? action.payload : "Failed to update list";
      })

      // DELETE
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;

        state.shoppingList = state.shoppingList.filter(
          (list) => list.id !== action.payload
        );
      })

      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete list";
      });
  },
});

export default listSlice.reducer;

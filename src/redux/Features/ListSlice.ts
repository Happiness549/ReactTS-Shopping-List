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

      const listWithUser = {...newList, userId,};

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
  'lists/fetchlists',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.login.userData?.id;
      
      
      if (!userId) {
        return rejectWithValue('You must be logged in');
      }
      
      const response = await fetch(`http://localhost:3000/lists?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shopping lists');
      }
      
      const data: ShoppingList[] = await response.json();
      
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  }
);

export const deleteList = createAsyncThunk('lists/deleteLists',
  async(listId: number,{getState}) => {
    const state = getState() as RootState;
    const deleteUserId = state.login.userData?.id;

    const list = state.list.shoppingList.find((currentlLIST) => currentlLIST.id ===listId);
    
    if(!list || list.userId !== deleteUserId){
      throw new Error("You are not allowed to delete this list");
    }
    const response = await fetch(`http://localhost:3000/list/${listId}`,
      {
        method: "DELETE",
      }
    );

    if(!response.ok){
      throw new Error("Failed to delete list");
    }
  },
  

  
  
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
        state.shoppingList.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to add list";
      })

      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(fetchLists.fulfilled, (state, action) => {
        state.shoppingList = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch shopping lists";
      })

      .addCase(deleteList.pending,(state) =>{
           state.loading = true;
           state.error = null;
      })
      .addCase(deleteList.fulfilled,(state, action) => {
        state.loading = false;
        state.shoppingList.filter((list) => list.id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) =>{
        state.error = action.payload as string || "Failed to delete list";
      })
      
  },
});

export default listSlice.reducer;

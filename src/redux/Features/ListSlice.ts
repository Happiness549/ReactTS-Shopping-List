import { createSlice } from "@reduxjs/toolkit";
import { addList } from "./listThunk";

export interface ShoppingList{
    id: number;
    category: string
    numberOfItem: number;
    completed: number;
}

interface ListState{
    lists: ShoppingList[];
    loading: boolean;
    error: string | null;
}

const initialState: ListState ={
    lists: [],
    loading: false,
    error: null,
}

const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
    builder.addCase(addList.pending, (state) => {
        state.loading =true;
        state.error = null
    });

    builder.addCase(addList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload)
    });

    builder.addCase(addList.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add list";
    })

    }
})

export default listSlice.reducer

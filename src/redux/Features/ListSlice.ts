import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


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

// get list from db
export const addList = createAsyncThunk("lists/addList",
    async(newList: Omit<ShoppingList, "id">) =>{
        const response = await fetch("http://localhost:3000/lists",
            {
                method: "POST",
                headers: {
                    "Contene-Type": "application/json",
                },
                body: JSON.stringify(newList),
            } );
                
            if(!response.ok){
            throw new Error("Failed to add list");
        }
        const listData =await response.json();
        return listData; 
        }

    
);

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

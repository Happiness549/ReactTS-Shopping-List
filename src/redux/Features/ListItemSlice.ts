import {} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'

export interface ListItem{
    title: string;
    category: string;
    notes?: string;
    Quantity: number;
    image?: string;
    id?: number;
    listId?: string;
}

export interface ListState{
    items: ListItem[];
    loading: boolean;
    error: string | null;  
};

const initialState: ListState ={
    items: [],
    loading: false,
    error: null,
}

export const fetchListItems = createAsyncThunk("items/fetchListItems",
    async(listId:string,{rejectWithValue}) => {
        
        try{
            const response = await fetch("http://localhost/3000/itemList?listId=${listId}");
            if(!response.ok) throw new Error("Failed to fetch list items");
                return(await response.json() as ListItem[]);
                
            }catch(err:any){
                return rejectWithValue(err.message)
        }
    }
    );
    

    export const addListItem = createAsyncThunk<ListItem, Omit<ListItem, "id">>('items/addListItem',
        async(newItemData, {rejectWithValue}) =>{
            try{
                const response = await fetch(`http:localhost/3000/itemList`, {
                    method: 'Post', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newItemData),
                });
                if(!response.ok) throw new Error('Failed to add item');
                return (await response.json()) as ListItem;
            } catch (error: any) {
                return rejectWithValue(error.message);
            }
        }
    );
    

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 

        .addCase(addListItem.pending, (state) => {
           state.loading = true;
           state.error = null;
        })
        .addCase(addListItem.fulfilled, (state, action:PayloadAction<ListItem>) => {
            state.items.push(action.payload);
        })
        .addCase(addListItem.rejected, (state, action) => {
            state.error = action.payload as string;
        })

           .addCase(fetchListItems.pending, (state) => {
           state.loading = true;
           state.error = null;
        })
        // .addCase(fetchListItems.fulfilled, (state, action:PayloadAction<ListItem>) => {
        //     state.loading = false;
        //     state.ListItem = action.payload;
        // })
        .addCase(fetchListItems.rejected, (state, action) => {
            state.error = action.payload as string;
        })
    }
});



export default itemSlice.reducer
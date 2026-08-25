import {} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit'

export interface ListItem{
    title: string;
    category: string;
    notes?: string;
    Quantity: string;
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
            const response = await fetch("http://localhost/3000/lists/${listId}/listItem");
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
                const {listId} = newItemData;
                const response = await fetch(`http:localhost/3000/lists/${listId}/listItem`, {
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
    

const ListSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {}
});



export default ListSlice.reducer
import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'

export interface ListItem{
    title: string;
    category: string;
    notes: string;
    Quantity: string;
     id?: number;
     listId?: string;
}

export interface ListState{
    list: ListItem[];
    loading: boolean;
    error: string | null;
    categoryId: string | null
};

const initialState: ListState ={
    list: [],
    loading: false,
    error: null,
    categoryId: null

}

export const listItemThunk = createAsyncThunk("listitem/list",
    async(listId:string,{rejectWithValue}) => {
        
        try{
            const response = await fetch("http://localhost/3000/{listId}/listItem");
            if(!response.ok) throw new Error("Failed to fetch list items");
                return(await response.json() as ListItem[]);
                
            }catch(err:any){
                return rejectWithValue(err.message)
        }
    }
    );
    
    

const ListSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {}
},

);



export default ListSlice.reducer
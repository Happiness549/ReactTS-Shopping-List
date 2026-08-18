import {createSlice} from '@reduxjs/toolkit'

export interface ListItem{
    title: string;
    category: string;
    notes: string;
    Quantity: string;
    id: number;
}

export interface ListState{
    list: ListItem[];
};

const initialState: ListState ={
    list: [{
        title: "veg",
        category: "veg",
        notes: "Buy at shoprite",
        Quantity: "1kg",
        id: 1
    }],
}

const ListSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        populateLists: (state, action) => {
            return action.payload
        }
    }
})

export const {populateLists} = ListSlice.actions
export default ListSlice.reducer
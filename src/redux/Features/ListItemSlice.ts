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
    list: [],
}

const ListSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        populateLists: (state, action) => {
            state.list.push(action.payload)
        }
    }
})

export const {populateLists} = ListSlice.actions
export default ListSlice.reducer
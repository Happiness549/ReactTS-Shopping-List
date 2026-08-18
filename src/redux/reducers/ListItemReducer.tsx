import {createSlice} from '@reduxjs/toolkit'

const ListSlice = createSlice({
    name: 'list',
    initialState: [],
    reducers: {
        populateLists: (state, action) => {
            return action.payload
        }
    }
})

export const {populateLists} = ListSlice.actions
export default ListSlice.reducer
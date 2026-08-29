import {createSlice, type PayloadAction} from '@reduxjs/toolkit'


 interface SearchState{
    searchTerm: string;
    sortBy: 'category' | 'dateCreated' | '';
    sortOrder: 'asc' | 'desc';
}


const initialState: SearchState = {
    searchTerm: '',
    sortBy: '',
    sortOrder: 'asc',
    
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) =>{
            state.searchTerm = action.payload;     
        },
        clearSearh: (state) => {
            state.searchTerm = ''
        },
       setSortBy: (state,action: PayloadAction<'category' | 'dateCreated' | ''>) => {
            state.sortBy = action.payload;
        },

        setSortOrder: ( state,action: PayloadAction<'asc' | 'desc'>) => {
            state.sortOrder = action.payload;
        },
    },
});

export const { setSearchTerm,  clearSearh, setSortOrder, setSortBy} = SearchSlice.actions;
export default SearchSlice.reducer;
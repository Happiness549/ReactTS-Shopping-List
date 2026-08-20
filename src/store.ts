import {configureStore} from '@reduxjs/toolkit'
import ListItemReducer from './redux/Features/ListItemSlice'
import listReducer from './redux/Features/ListSlice'



const store = configureStore({
    reducer: {
        listItemLists: ListItemReducer,
        lists: listReducer,
    },
     
})


export type RootState = ReturnType<typeof store.getState>
export default store
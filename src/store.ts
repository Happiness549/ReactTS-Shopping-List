import {configureStore} from '@reduxjs/toolkit'
import ListItemReducer from './redux/Features/ListItemSlice'
import listReducer from './redux/Features/ListSlice'
import SignupReducer from './redux/Features/SignupSlice'



const store = configureStore({
    reducer: {
        listItemLists: ListItemReducer,
        lists: listReducer,
        users: SignupReducer

    },
     
})


export type RootState = ReturnType<typeof store.getState>
export default store
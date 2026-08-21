import {configureStore} from '@reduxjs/toolkit'
import ListItemReducer from './redux/Features/ListItemSlice'
import listReducer from './redux/Features/ListSlice'
import SignupReducer from './redux/Features/SignupSlice'
import LoginReducer from './redux/Features/LoginSlice'



const store = configureStore({
    reducer: {
        listItemLists: ListItemReducer,
        lists: listReducer,
        user: SignupReducer,
        login: LoginReducer,

    },
     
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
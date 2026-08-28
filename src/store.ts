import {configureStore} from '@reduxjs/toolkit'
import {type TypedUseSelectorHook, useSelector } from 'react-redux'
import listReducer from './redux/Features/ListSlice'
import SignupReducer from './redux/Features/SignupSlice'
import LoginReducer from './redux/Features/LoginSlice'
import itemReducer from './redux/Features/ListItemSlice'
import SearchReducer from './redux/Features/SearchSlice'



const store = configureStore({
    reducer: {
        items: itemReducer,
        list: listReducer,
        user: SignupReducer,
        login: LoginReducer,
        search: SearchReducer,



    },
     
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store
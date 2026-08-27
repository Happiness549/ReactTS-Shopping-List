import {configureStore} from '@reduxjs/toolkit'
import listReducer from './redux/Features/ListSlice'
import SignupReducer from './redux/Features/SignupSlice'
import LoginReducer from './redux/Features/LoginSlice'
import itemReducer from './redux/Features/ListItemSlice'



const store = configureStore({
    reducer: {
        items: itemReducer,
        list: listReducer,
        user: SignupReducer,
        login: LoginReducer,


    },
     
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
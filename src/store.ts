import {configureStore} from '@reduxjs/toolkit'
import ListItemReducer from './redux/Features/ListItemSlice'


const store = configureStore({
    reducer: {
        lists: ListItemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store
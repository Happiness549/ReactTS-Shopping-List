import {configureStore} from '@reduxjs/toolkit'
import ListItemReducer from './reducers/ListItemReducer'


const store = configureStore({
    reducer: {
        lists: ListItemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store
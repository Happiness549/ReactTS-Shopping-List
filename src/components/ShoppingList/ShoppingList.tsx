 import react from 'react'
 import {useSelector} from 'react-redux'
 import type  {RootState} from '../../redux/store'
 
 export const ShoppingList=() => {
    const list = useSelector((state: RootState) => state.lists)
 }
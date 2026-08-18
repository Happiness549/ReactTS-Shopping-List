 import react from 'react'
 import {useSelector} from 'react-redux'
 import type  {RootState} from '../../redux/store'
 
interface ListProps{
    title: string;
    category: string;
    notes: string;
    Quantity: string;
}

 export const ShoppingList=() => {
    const list = useSelector((state: RootState) => state.lists)
 }
 import react from 'react'
 import {useSelector} from 'react-redux'
 import type  {RootState} from '../../store'
 import { ListCard } from './ListCard'
 
 


 export const ShoppingList=() => {
    const list = useSelector((state: RootState) => state.lists.list)

    if (ite.length === 0) {
    return <p>Your vault is empty! Add your first link above.</p>;
    

    return(
        <>
        {list.map((listItem) =>(
            <ListCard key={listItem.id} 
            listItem={listItem} />
        ))}
        </>
    )
 }



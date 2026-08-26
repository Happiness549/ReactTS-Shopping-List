import React, { useEffect } from 'react'
import { ShoppingList } from '../components/ShoppingList/ShoppingList'
import {Navbar} from '../components/ShoppingList/Navbar'
import { ListItemForm } from '../components/ShoppingList/ListItemForm'
import { useDispatch} from 'react-redux'
import type { AppDispatch} from '../store'
import { fetchLists } from '../redux/Features/ListSlice'
import {ListForm} from '../components/ShoppingList/ListForm'



export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() =>{
    dispatch(fetchLists())
  }, [dispatch])


  return (
    <div className='rounded-r-4xl min-h-screen w-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5),_0_1px_3px_rgba(255,255,255,0.1),_0_20px_40px_rgba(99,102,241,0.12)] '>
       <Navbar />
       <div className='ml-10'>
        <ListForm/> 
       <ShoppingList />
       <ListItemForm/>

       </div>
     
      
    </div>
  )
}
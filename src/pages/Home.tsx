import React, { useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Text } from '../components/ui/Text'
import {Navbar} from '../components/ShoppingList/Navbar'
import { ShoppingCartIcon } from 'lucide-react'
import { Clipboard } from 'lucide-react'
import { PlusIcon } from 'lucide-react'
import { ListItemForm } from '../components/ShoppingList/ListItemForm'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchLists } from '../redux/Features/ListSlice'

export const Home = () => {
  const userData = useSelector((state:RootState) =>  (state.login as any)?.user);
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState)=> state.lists.lists)
  useEffect(() =>{
    dispatch(fetchLists())
  }, [dispatch])


  return (
    <div className='rounded-r-4xl min-h-screen w-full border border-white/10   shadow-[0_4px_30px_rgba(0,0,0,0.5),_0_1px_3px_rgba(255,255,255,0.1),_0_20px_40px_rgba(99,102,241,0.12)] '>
       
       <Navbar />
       <Text variant='p'>Welcome {userData?.name}</Text>


       <div className='flex'>
        <div className='rounded-full h-40 w-40 ml-130 mt-30 bg-[#BCFEFE] '>
          <Clipboard size={120} className=' mt-5 ml-5 text-[#2D99AE] '/>
        </div> 
       <ShoppingCartIcon size={120} className=' mt-40 text-[#2D99AE] '/>
       </div>
       
       <div className='mt-20 text-center'>
          <Text variant={'h1'} className='text-3xl font-bold text-[#001C44]'>You don't have any lists yet</Text>
          <Text variant={'p'} className='text-2xl text-[#001C44] mt-5'>Create your first shopping list and keep <br />
            everything organized.
         </Text>
         
        <Button text={'Add List'}
        className='mt-8 w-50 relative mr-10'/>
        <PlusIcon className=' ml-132 text-white absolute -mt-9'/>

       </div>
     
      <ListItemForm/>
      
    </div>
  )
}
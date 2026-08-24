import React, { type ReactNode } from 'react'
import {Text} from '../ui/Text'
import { deleteList, type ShoppingList } from '../../redux/Features/ListSlice'
import { Button } from '../ui/Button'
import { TrashIcon } from 'lucide-react'
import { EditIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import type{ AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { list } from 'postcss'


interface ListCardProps{
  shoppingList: ShoppingList;
  
}


export const ListCard:React.FC<ListCardProps> = ({shoppingList}) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate= useNavigate();
  
  const handleDelete =() =>{
    if (shoppingList.id === undefined) return;
    dispatch(deleteList(shoppingList.id));
  };

  // const handleCardClick = () => {
  //   navigate(`/lists/${shoppingList.id}`);
  // }

  return (
    <div className=''>
      <div className='rounded-4xl p-8 mt-5  w-70 h-70 border border-gray-300 xl'>
        <div className='p-2'>
             <Text variant={'h2'} className='font-bold text-2xl text-[#001C44]'>{shoppingList.category}</Text>
             <Text variant={'p'} className='p-2 text-[#001C44]'>{shoppingList.numberOfItem}items</Text>
             <Text variant={'p'} className='text-[#001C44]'>{shoppingList.completed}completed</Text>
        </div>
     
        <div className='flex gap-4 mt-4'>
           <Button text='' className='w-12 h-12 mt-3 bg-red-300 rounded-full' onClick={handleDelete}/>
           <TrashIcon className='absolute mt-5 ml-3 text-red-700'/>
           <Button text='' className='w-11 h-11 mt-4 '/>
           <EditIcon className='absolute ml-19 mt-6'/>
        </div>
        
    </div>
    </div>
    
  )
}

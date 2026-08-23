import React, { type ReactNode } from 'react'
import {Card} from '../ui/Card'
import {Text} from '../ui/Text'
import type { ShoppingList } from '../../redux/Features/ListSlice'
import { Button } from '../ui/Button'
import { DeleteIcon } from 'lucide-react'


interface ListCardProps{
  shoppingList: ShoppingList;
  
}

export const ListCard:React.FC<ListCardProps> = ({shoppingList}) => {
  return (
    <div className=''>
      <div className='rounded-4xl p-8 mt-5  w-70 h-50 border border-gray-300 xl'>
      <Text variant={'h2'} className='font-bold text-2xl text-[#001C44]'>{shoppingList.category}</Text>
        <Text variant={'p'} className='p-2 text-[#001C44]'>{shoppingList.numberOfItem}items</Text>
        <Text variant={'p'} className='text-[#001C44]'>{shoppingList.completed}completed</Text>
    </div>
    <Button text='' className='absolute h-12 w-12 -mt-47 ml-40 bg-red-300 rounded-full'/>
    
    </div>
    
  )
}

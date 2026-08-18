import React from 'react'
import { Button } from '../components/ui/Button'
import { Text } from '../components/ui/Text'
import {Navbar} from '../components/ShoppingList/Navbar'

export const Home = () => {
  return (
    <div className='rounded-r-4xl min-h-screen w-310 border border-white/10   shadow-[0_4px_30px_rgba(0,0,0,0.5),_0_1px_3px_rgba(255,255,255,0.1),_0_20px_40px_rgba(99,102,241,0.12)] '>
       <Navbar/>
       <div className='mt-40 text-center'>
          <Text variant={'h1'} className='text-3xl font-bold text-[#001C44]'>You don't have any lists yet</Text>
          <Text variant={'p'} className='text-2xl text-[#001C44] mt-5'>Create your first shopping list and keep <br />
            everything organized.
         </Text>
        <Button text={'Add List'}
        className='mt-8'/>

       </div>
     

    </div>
  )
}
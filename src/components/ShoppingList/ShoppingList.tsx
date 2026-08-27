 
 import {useSelector} from 'react-redux'
 import type  {RootState} from '../../store'
 import { ListCard } from './ListCard'
 import { ShoppingCartIcon } from 'lucide-react'
 import { Clipboard } from 'lucide-react'
 import { PlusIcon } from 'lucide-react'
 import { Button } from '../ui/Button'
 import { Text } from '../ui/Text'
 import { Card } from '../ui/Card'
 import {useNavigate} from 'react-router-dom'


 

 export const ShoppingList=() => {
    const lists = useSelector((state: RootState) => state.list.shoppingList);
    const userData = useSelector((state: RootState) => state.login.userData);
    const navigate = useNavigate(); // ✅ Handle routing here

      const handleCardClick = (id: string) => {
        navigate(`/lists/${id}`); 
      };

    

    return(
       <>
       {lists.length === 0 ? (
  <>
    <div className="flex" >
      <Text variant={'h1'} className='font-bold text-3xl'>Welcome: {userData?.name}</Text>
      <div className="rounded-full h-40 w-40 ml-130 mt-30 bg-[#BCFEFE]">
      <Clipboard size={120} className="mt-5 ml-5 text-[#2D99AE]"/>
      </div>
      <ShoppingCartIcon size={120} className="mt-40 text-[#2D99AE]"/>
    </div>

    <div className="mt-20 text-center">
      <Text variant={"h1"} className="text-3xl font-bold text-[#001C44]"> You don't have any lists yet</Text>
      <Text variant={"p"} className="text-2xl text-[#001C44] mt-5"> Create your first shopping list and keep <br />everything organized.</Text>
      <Button text={"Add List"} className="mt-8 w-50 relative mr-10"/>
      <PlusIcon className="ml-132 text-white absolute -mt-9" />
    </div>
  </>
) : (
  <>
    {lists.map((listItem) => (
      <ListCard
        key={listItem.id}
        shoppingList={listItem} 
      /> 
    ))}

     

    <Card className='flex  bg-[#BCFEFE] w-300 mt-10 justify-cente text-center h-30 mt-40'>
      <div className='text-center'>
         <Text variant={'h1'} className='font-bold text-2xl text-[#001C44]'>Need something quickly?</Text>
         <Text variant={'p'}>Add a new shopping list in seconds</Text>
      </div>
      <div>
         <Button text={"Add List"} className="w-50 ml-160" id="openModalBtn"/>
         <PlusIcon className="ml-168 text-white absolute -mt-9" />
      </div> 
    </Card>
  </>
)}
  </>
)}
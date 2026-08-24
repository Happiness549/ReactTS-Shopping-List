import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import type  {RootState} from '../../store'
import {Text} from '../ui/Text'



export const ListItems = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const selectedList = useSelector((state:RootState) => state.list.shoppingList.find((list) =>list.id ===id));
  if(!selectedList) return <Text variant={'p'}>List not found</Text>
    
  return (
    <div>ListItems
      <button ></button>


    </div>
  )
}

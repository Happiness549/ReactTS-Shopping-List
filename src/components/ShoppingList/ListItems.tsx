import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import type  {RootState} from '../../store'
import {Text} from '../ui/Text'
import {ListItemCard} from './ListItemCard'



export const ListItems = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const selectedList = useSelector((state:RootState) => state.items.items)
  if(!selectedList) return <Text variant={'p'}>List not found</Text>
    
  return (
    <div>
      {selectedList.map((list) => (
        <ListItemCard 
         key={list.id}
         ListItem={list}
        />
      ))}

    </div>
  )
}

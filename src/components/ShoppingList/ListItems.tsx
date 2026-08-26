import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import type  {RootState} from '../../store'
import {Text} from '../ui/Text'
import {ListItemCard} from './ListItemCard'
import {ListForm} from './ListForm'




export const ListItems = () => {
  const {listId} = useParams<{listId:string}>();
  
 const selectedList = useSelector((state: RootState) =>
  state.items.items.find((item) => item.id === listId)
);



  if(!selectedList) return <Text variant={'p'}>List not found</Text>
  
    
  return (
    <>
 <ListForm/>
    <div>
      <ListItemCard
        key={selectedList.id}
        ListItem={selectedList}
      />

    </div>
      
    </>
  )
}

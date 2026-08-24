import React from 'react'
import { useParams } from 'react-router-dom'

export const ListItems = () => {
    const {listId} =useParams();
    console.log(listId)
  return (
    <div>ListItems</div>
  )
}

import React,{useState} from 'react'
import {Input} from '../UI/Input'
import {Text} from '../UI/Text' 
import type {ListItem} from '../../redux/Features/ListItemReducer'
import {useDispatch} from 'react-redux'
import {populateLists} from '../../redux/Features/ListItemReducer'

export const ListForm = () =>{
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit =(e: React.FormEvent) => {
        
        e.preventDefault()

        const newList: ListItem = {
            id: Date.now(),
            title,
            category,
            Quantity,
            notes
        }
        dispatch(populateLists (newList));

        setTitle('');
        setCategory('');
        setQuantity('');
        setNotes('');

        

    }


    return(
        <>
        <form>
            <Input
            label='Title'
            placeholder='Enter your list title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
            

        </form>
        </>
    )
}
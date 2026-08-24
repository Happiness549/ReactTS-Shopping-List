import React,{useState} from 'react'
import {Input} from '../ui/Input'
import {Text} from '../ui/Text' 
import type {ListItem} from '../../redux/Features/ListItemSlice'
import {useDispatch} from 'react-redux'
import {populateLists} from '../../redux/Features/ListItemSlice'
import {Button} from '../ui/Button'
import {listItemThunk} from '../../redux/Features/ListItemSlice'


export const ListForm = () =>{
    const dispatch = useDispatch<any>()


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit =(e: React.FormEvent) => {
        e.preventDefault()
        dispatch(listItemThunk ({
            title,
            category,
            Quantity,
            notes
        }));

        setTitle('');
        setCategory('');
        setQuantity('');
        setNotes('');
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <Input
            label='Title'
            placeholder='Enter your list title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

            <Input
            label='Title'
            placeholder='Enter your list title'
            type='text'
            value={title}
            onChange={(e) => setCategory(e.target.value)}
        />
        
            <Input
            label='Title'
            placeholder='Enter your list title'
            type='text'
            value={title}
            onChange={(e) => setQuantity(e.target.value)}
        />
        
            <Input
            label='Title'
            placeholder='Enter your list title'
            type='text'
            value={title}
            onChange={(e) => setNotes(e.target.value)}
        />
        
        <Button text={'Submit'}/>
        </form>
        </>
    )
}
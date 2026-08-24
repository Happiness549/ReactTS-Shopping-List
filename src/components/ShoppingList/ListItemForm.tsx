import React,{useState} from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useDispatch } from 'react-redux'
import { addList } from '../../redux/Features/ListSlice'



export const ListItemForm = () => {
    const dispatch = useDispatch<any>();

    const [category, setCategory] = useState('');

    const handleSubmit =(e: React.FormEvent) => {
        
        e.preventDefault();

        dispatch(
            addList({
                category,
                numberOfItem: 0,
                completed: 0,
            })
        );
        setCategory('');
    
    }
  return (

     <form onSubmit={handleSubmit}>
                <Input
                label='Title'
                placeholder='Enter your list title'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            
            <Button text={'Create List'}/>
            </form>

  )
}

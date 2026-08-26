 import React,{useState, useEffect} from 'react'
 import {Input} from '../ui/Input'
 import {useDispatch} from 'react-redux'
 import {Button} from '../ui/Button'
 import {addListItem, fetchListItems} from '../../redux/Features/ListItemSlice'
 import {useParams} from 'react-router-dom'
 import {useSelector} from 'react-redux'
 import type {RootState, AppDispatch} from '../../store'


 export const ListForm = () =>{
       const {listId} = useParams<{listId: string}();
       const dispatch = useDispatch<AppDispatch>()

       const {items, loading} = useSelector((state: RootState) => state.items)


     const [title, setTitle] = useState('');
     const [category, setCategory] = useState('');
     const [Quantity, setQuantity] = useState(1);
     const [notes, setNotes] = useState('');
     const [image, setImage] = useState<File | null>(null);

     useEffect(() => {
        if(listId) dispatch(fetchListItems(listId));
     }, [dispatch, listId])

     const handleSubmit =(e: React.FormEvent) => {
         e.preventDefault()
         

         dispatch(addListItem ({
            listId,
            title,
            category,
            Quantity,
            notes: notes || undefined,
         })
         );

         setTitle('');
         setCategory('');
         setQuantity(1);
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
             label='Category'
             placeholder='Enter your list title'
             type='text'
             value={category}
             onChange={(e) => setCategory(e.target.value)}
         />
        
             <Input
             label='Title'
             placeholder='Enter your list title'
             type='text'
             value={Quantity}
             onChange={(e) => setQuantity(e.target.value)}
         />
        
             <Input
             label='Title'
             placeholder='Enter your list title'
             type='text'
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
         />
        
         <Button text={'Submit'}/>
         </form>
         </>
     )
 }
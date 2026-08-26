 import React,{useState, useEffect} from 'react'
 import {Input} from '../ui/Input'
 import {useDispatch} from 'react-redux'
 import {Button} from '../ui/Button'
 import {addListItem} from '../../redux/Features/ListItemSlice'
 import type { AppDispatch} from '../../store'
 import {useParams} from 'react-router-dom'


    export const ListForm = () =>{
        const { listId } = useParams<{ listId: string }>(); 
        const dispatch = useDispatch<AppDispatch>()


        const [form, setForm] = useState({
            title: '',
            category: '',
            notes: '',
            Quantity: '',
            image: ''
        })

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {name, value} = e.target;
            setForm((prev) => ({
                ...prev, 
                [name]: value,
            }));
        };

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({
                    ...prev,
                    image: reader.result as string,
                }));
                reader.readAsDataURL(file);
            }
        }



        const handleSubmit = (e: React.FormEvent) =>{
            e.preventDefault();

            if (!listId) {
    console.error("Dispatch blocked: listId is undefined or empty!");
    return; 
}

            dispatch(addListItem({
               listId: listId,
                title: form.title,
                category: form.category,
                notes: form.notes,
                Quantity: form.Quantity,
                image: form.image   
            })
            ); 

        setForm({
            title: '',
            category: '',
            notes: '',
            Quantity: '',
            image: '',
        });
        
    }



     return(
         <>
         <form onSubmit={handleSubmit}>

            <Input
             label='Title'
             placeholder='Enter your list title'
             type='text'
             value={form.title}
             onChange={handleChange}
         />

             <Input
             label='Category'
             placeholder='Enter your list title'
             type='text'
             value={form.category}
             onChange={handleChange}
         />

           <label>Notes</label>
             <textarea
             name='notes'
             value={form.Quantity}
             placeholder='Add notes'
             onChange={handleChange}
         />
        
             <Input
             label='Quantity'
             type="number"
             name="quantity"
             placeholder = 'Add quantity'
             value={form.Quantity}
             onChange={handleChange}
         />

       

         <label>Image</label>
         <input  type='file' accept="image/*" onChange={handleImageChange}/>
         {form.image && (
           <img
           src= {form.image}
           alt="Selected item"
           />
         )}
       
         <Button text={'Submit'}/>
         </form>
         </>
     )
 }
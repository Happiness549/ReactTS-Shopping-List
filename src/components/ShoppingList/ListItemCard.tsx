import { useNavigate } from 'react-router-dom';
import {Text} from '../ui/Text'
import {Button} from '../ui/Button'
import {useDispatch} from 'react-redux'
import type{AppDispatch} from '../../store'
import type {ListItem} from '../../redux/Features/ListItemSlice'
 

interface ListCardProps{
  ListItem: ListItem; 
}


export const ListItemCard: React.FC<ListCardProps> = ({ListItem}) =>{
    const navigate = useNavigate();
    // const dispatch = useDispatch
    // const handleCardClick=() =>{
    //     navigate(`/list`)
    // }

    return(
        <div className='rounded-4xl p-8 mt-5  w-70 h-70 border border-gray-300 xl'>
            <div>
                <Text variant={'p'}>{ListItem.image}</Text>
                <Text variant={'p'}>{ListItem.title}</Text>
                <Text variant={'p'}>{ListItem.category}</Text>
                <Text variant={'p'}>{ListItem.Quantity}</Text>
                <Text variant={'p'}>{ListItem.notes}</Text>
            </div>
        </div>
    )
}
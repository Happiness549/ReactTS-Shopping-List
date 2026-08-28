import {Input} from '../ui/Input'
import { Search } from 'lucide-react'; 
import { type AppDispatch, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../../redux/Features/SearchSlice';


export const Searchbar = () => { 
    const dispatch = useDispatch<AppDispatch>();
    const query = useAppSelector((state) => state.search.searchTerm);


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
      };
      

    return(

        <div>
        <Input
        value={query}
        onChange={handleInputChange}
        placeholder='Search items...'
        className='ml-90 mt-3'
        />
        <Search className='absolute -mt-9 ml-200'/>
    
        </div>
    )

}
import { useNavigate } from 'react-router-dom';


export const ListItemCard = () =>{
    const navigate = useNavigate();

    const handleCardClick=() =>{
        navigate(`/list`)
    }

    return(
        <div className='rounded-4xl p-8 mt-5  w-70 h-70 border border-gray-300 xl'>


        </div>
    )
}
import {Card} from '../ui/Card'
import {Text} from '../ui/Text'
import { Link }from 'react-router-dom'

export const Sidebar = () => {

    return(
        
    <div className='bg-[#001C44] min-h-screen w-50 rounded-l-4xl ml-5'>
        <Text variant={'h1'} className='text-white text-4xl ml-10 mt-'>Shoply</Text>
        <div className='flex flex-col ml-10 gap-10 mt-20 '>
            <Link to='/Home'>
             <Text variant={'p'} className='text-white'>Home</Text>
            </Link>
           
           <Link to=''>
           <Text variant={'p'} className='text-white'>My lists</Text>
           </Link>
            
            <Link to=''>
             <Text variant={'p'} className='text-white'>categories</Text>
            </Link>
           
           <Link to=''>
            <Text variant={'p'} className='text-white'>Settings</Text>
           </Link>
           
           <Link to=''>
            <Text variant={'p'} className='text-white'>Logout</Text>
           </Link>
           

        </div>
    </div>

    )
}
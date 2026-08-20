import {Card} from '../ui/Card'
import {Text} from '../ui/Text'
import { Link }from 'react-router-dom'
import { HomeIcon } from 'lucide-react'
import { ListChecksIcon } from 'lucide-react'
import { TagsIcon } from 'lucide-react'
import { SettingsIcon } from 'lucide-react'
import { LogOutIcon } from 'lucide-react'
import { ShoppingCartIcon } from 'lucide-react'

export const Sidebar = () => {

    return(
        
    <div className='bg-[#001C44] min-h-screen w-50 rounded-l-4xl ml-5'>

        
            <Text variant={'h1'} className='text-white text-4xl ml-14 mt-10'>Shoply</Text>
            <ShoppingCartIcon className='absolute text-white -mt-6 ml-4'/>

            <div className='absolute text-white flex flex-col gap-10 mt-20 ml-4'>
                <HomeIcon className='  '/>
                <ListChecksIcon />
                <SettingsIcon />
                <TagsIcon/>
                <LogOutIcon />
            </div>
        
        
        <div className='flex flex-col ml-14 gap-10 mt-20 '>
            <Link to='/Home'>
             <Text variant={'p'} className='text-white '>Home</Text>
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
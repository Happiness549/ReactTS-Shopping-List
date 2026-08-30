
import {Text} from '../ui/Text'
import { Link }from 'react-router-dom'
import { HomeIcon } from 'lucide-react'
import { ListChecksIcon } from 'lucide-react'
import { TagsIcon } from 'lucide-react'
import { SettingsIcon } from 'lucide-react'
import { LogOutIcon } from 'lucide-react'
import { ShoppingCartIcon } from 'lucide-react'
import { CircleUser } from 'lucide-react';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Features/LoginSlice";
import { Button } from '../ui/Button'

export const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
    dispatch(logout());
     
    navigate("/login");
    };

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
                <CircleUser />
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
           <button onClick={handleLogout}className="text-[#001C44] hover:text-[#2D99AE] transition-colors  ">
           <Text variant={'p'} className='text-white mr-25'>Logout</Text>
           </button>
           
            <Link to='/Profile'>
            <Text variant={'p'} className='text-white'>Profile</Text>
           </Link>
           

        </div>
    </div>

    )
}
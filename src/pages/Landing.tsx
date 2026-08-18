import react from 'react'
import {Text} from '../components/ui/Text'
import Shopping from '../assets/Shopping.jpg'
import Trolley from '../assets/Trolley.webp'
import { Link } from 'react-router-dom'



export const Landing = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#021733] '>

       <div className='absolute right-0 top-0 h-full w-1/2 rounded-l-[50%] bg-[#D2FAFC] [clip-path:ellipse(80%_70%_at_100%_50%)]'>

         </div>
         
          <div className='ml-15'> 
            <div className='flex gap-3 mt-10'>
              <img 
                src={Trolley} 
                alt="Trolley " 
                className="w-14 h-auto object-contain rounded-lg shadow-xl text-[#9ECAE1]"
              />
              <Text variant={'p'} className='text-white ml-130'><Link to='/login'>Login</Link></Text>
              <Text variant={'p'} className='text-white '><Link to='/home'>Home</Link></Text>
            </div>
       
            <Text variant={'h1'} className='text-white text-7xl mt-20 '>Smart <br />Shopping.</Text>
            <Text variant={'h1'} className='text-[#9ECAE1] text-6xl mt-3 '>better Living.</Text>
            <Text variant={'p'} className='text-white mt-9'>Creat lists.  Track items. </Text>
            <Text variant={'p'} className='text-white text-2xl'>Shop with ease.</Text>

              <img 
          src={Shopping} 
          alt="Shopping Bag " 
          className="w-104 h-auto object-contain rounded-lg shadow-xl mt-20 "
        />
          
          </div>

    </div>
  )
}







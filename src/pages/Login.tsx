import {Card } from '../components/UI/Card'
import {Text} from '../components/UI/Text'
import { Link } from 'react-router-dom'
import Waving from '../assets/Waving.png'
import {Input} from '../components/UI/Input'
import {Button} from '../components/UI/Button'


export const Login = () => {
  return (
    <Card className='h-150 mt-20 w-200'>
        
        <Text variant={'h1'} className='text-[#001C44] text-5xl text-center font-bold'> Welcome Back </Text>
        <img 
          src={Waving} 
          alt="Shopping Bag " 
          className="w-14 h-auto object-contain rounded-lg ml-140 -mt-15"
        />
         <Text variant={'h1'} className='text-[#001C44] text-2xl text-center mt-9'> Login to your page </Text>

         <form className='mt-15 text-center flex flex-col gap-8 items-start'>
            <Input
               placeholder='@example.com'
               
            />
            <Input
              placeholder='Password'
            />
         </form>
         <div className='flex gap-35 ml-58'>
            <Text variant={'p'} >remember me</Text>
             <Text variant={'p'} className='text-[#0C5776]'>Forgot password?</Text>
         </div>
         <Button
         text={'Login'}
         className='text-white mt-10 w-100 ml-50'
         />
         <div className='flex gap-29 ml-58 mt-5'>
              <Text variant={'p'}>Don't have an account? </Text>
              <Text variant={'p'} className='text-[#0C5776]'>Create one </Text>
         </div>

       
    
    </Card>
  )
}
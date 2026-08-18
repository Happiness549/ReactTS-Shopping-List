import {Card} from '../UI/Card'
import {Text} from '../UI/Text'
import { Link }from 'react-router-dom'

export const Sidebar = () => {
    <Card className='bg-[#001C44] min-h-screen w-80 rounded-1-4xl'>
        <Text variant={'h1'} className='text-white text-4xl'></Text>
        <div className='flex flex-col pag-10 mt-20'>
            <Text variant={'p'} className='text-white'>Home</Text>
            <Text variant={'p'} className='text-white'>My lists</Text>
            <Text variant={'p'} className='text-white'>categories</Text>
            <Text variant={'p'} className='text-white'>Settings</Text>
            <Text variant={'p'} className='text-white'>Logout</Text>

        </div>
    </Card>
}
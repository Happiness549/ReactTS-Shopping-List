import {Card } from '../components/UI/Card'
import {Text} from '../components/UI/Text'
import {Input} from '../components/UI/Input'
import {Button} from '../components/UI/Button'

export const SignUp = () => {

    return(
        <Card className='h-200 mt-20 w-200 text-center text-[#001C44] '>
            <Text variant='h1' className='text-4xl '>Create your account </Text>
            <Text variant='h1' className='text-2xl mt-5'>Join shoply and start shopping smarter </Text>

            <form className='mt-7 flex flex-col gap-8'>
                <Input
                label='Name'
                placeholder='Enter you name'
                type='text'
                />
                <Input
                label='Surname'
                placeholder='Enter you name'
                type='text'
                />
                <Input
                label='Email address'
                placeholder='Enter you name'
                type='text'
                />
                <Input
                label='Cell number'
                placeholder='Enter you name'
                type='text'
                />
                <Input
                label='Password'
                placeholder='Enter you name'
                type='text'
                />
                <Input
                label='Confirm password'
                placeholder='Enter you name'
                type='text'
                />
                <Button text='Create Account'
                className='w-100 ml-9'/>
            </form>
            <div className='flex'>
            <Text>Already have an account?</Text>
            <Text variant='p' className='text-[#0C5776]'>Login</Text>

            </div>

        


        </Card>

    )
}
import {Card } from '../components/ui/Card'
import {Text} from '../components/ui/Text'
 import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import {Link} from 'react-router-dom'
import type{ ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatedInputField, AuthRegistration } from '../redux/Features/SignupSlice'
import type { RootState, AppDispatch } from '../store'

export const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {signupForm, loading, error,success, } = useSelector((state: RootState) => state.user);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updatedInputField({
            field: e.target.name as "name" | "surname"| "email" | "password" | "confirmPassword" | "cellNumber",
            value: e.target.value
        })
    );
    };

    const handleSubmit = (e: FormEvent<HTMLElement>)=>{
        e.preventDefault();
        dispatch(AuthRegistration(signupForm))
    };


    return(
        <Card className='h-200 mt-20 w-200 text-center ml-50 text-[#001C44] '>
            <Text variant='h1' className='text-4xl '>Create your account </Text>
            <Text variant='h1' className='text-2xl mt-5'>Join shoply and start shopping smarter </Text>

            <form className='mt-7 flex flex-col gap-8' onSubmit={handleSubmit}>
                <Input
                
                label='Name'
                type='text'
                name='name'
                value={signupForm.name}
                onChange= {handleChange}
                placeholder='Enter your name'
                />

                <Input
                
                label='Surname'
                type='surname'
                name='surname'
                value={signupForm.surname}
                onChange= {handleChange}
                placeholder='Enter surname'
                />

                <Input
                label='email'
                type='email'
                name='email'
                value={signupForm.email}
                onChange= {handleChange}
                placeholder='Enter email'
                />
                
                <Input
                label='password'
                type='password'
                name='password'
                value={signupForm.password}
                onChange= {handleChange}
                placeholder='password'
                />
                <Input
                
                label='confirm password'
                type='confirm password'
                name="confirm password"
                value={signupForm.confirmPassword}
                onChange= {handleChange}
                placeholder=' Confirm password'
                /> 
                
                
                <Button text='Create Account'
                className='w-100 ml-9'/>
          
            <div className='flex ml-60 mt-5'>
            <Text>Already have an account?</Text>
            <Text variant='p' className='text-[#0C5776]'><Link to='/login'>Login</Link></Text>

            </div>

            {error && (<Text variant='p'>{error}</Text>)}
            <button type='submit' disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
            </button>
            {success && (<Text variant='p'>{success}</Text>)}
       </form>
        </Card>

    )
}
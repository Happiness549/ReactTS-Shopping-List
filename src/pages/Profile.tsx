import { useSelector,useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { updateUser } from '../redux/Features/LoginSlice';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { CircleUser } from 'lucide-react';
import { useState, useEffect } from 'react'; 


export const Profile = () => {
    const userData = useSelector((state: RootState) => state.login.userData);
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "", 
        surname: "",
        email: "",
        cellNumber: "",
    });

    
    useEffect(() => {
        if (userData) {
            setEditForm({
                name: userData.name ?? "",
                surname: userData.surname ?? "",
                email: userData.email ?? "",
                cellNumber: userData.cellNumber ?? "",
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className='ml-10'>
            <div className='flex gap-210 mt-4'>
                <Text variant={'h1'} className='font-bold text-2xl text-[#001C44] '>My Profile</Text>
                <Button text={'Edit Profile'} onClick={(e) => { e.preventDefault(); setIsEditing(true); }} />
            </div>

            <div className='w-270 h-40 bg-sky-100 rounded-3xl p-3 mt-5'>
                <CircleUser className='absolute' size={130} />
                <div className='flex gap-5 font-bold text-3xl text-center ml-50'>
                    <Text variant={'h2'}>{userData?.name}</Text>
                    <Text variant={'h2'}>{userData?.surname}</Text>
                </div>
                <Text variant={'h2'} className='mt-3 ml-50'>{userData?.email}</Text>
                <Text variant={'h2'} className='mt-3 ml-50'>{userData?.cellNumber}</Text>
            </div>

            <Text variant={'h1'} className='font-bold text-2xl text-text-[#001C44] mt-10 '>Personal Information</Text>
            <div className='border border-gray-300 w-80 h-70 p-2'>
                <div className='flex flex-col gap-3 ml-5'>
                    {isEditing ? (
                        <>
                            <input name="name" value={editForm.name} onChange={handleChange} className="border p-1" />
                            <input name="surname" value={editForm.surname} onChange={handleChange} className="border p-1" />
                            <input name="email" value={editForm.email} onChange={handleChange} className="border p-1" />
                            <input name="cellNumber" value={editForm.cellNumber} onChange={handleChange} className="border p-1" />
                            <Button text={'Save Changes'}
                            onClick={() => {
                                if(!userData) return;
                                dispatch(updateUser({...userData, ...editForm,}));
                                setIsEditing(false);
                            }}
                            />
                        </>
                    ) : (
                        <div className='flex flex-col gap-4 p-6'>
                            <Text variant={'h2'}>Name: {userData?.name}</Text>
                            <Text variant={'h2'}>Surname: {userData?.surname}</Text>
                            <Text variant={'h2'}>Email: {userData?.email}</Text>
                            <Text variant={'h2'}>Cell: {userData?.cellNumber}</Text>
                        </div>
                    )}
                </div> 
            </div>

            {/* <div className='border border-gray-300 w-80 h-40 p-2 mt-5'>
                <Text variant={'h2'}>Password</Text>  
                <Button text={'change Password'} className='' />
            </div> */}
        </div>
    );
};
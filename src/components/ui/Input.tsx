import React, { type ChangeEvent } from 'react'
interface InputProps{
    type?: string;
    placeholder: string;
    value: string;
    onChange?:(e: ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    
}

export const Input:React.FC<InputProps> = ({type, placeholder, value, onChange}) => {
  return (
    <div className='w-full outline-none'> 
        <input 
          type= {type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='appearance-none outline-none'
        />

    </div>
  )
}
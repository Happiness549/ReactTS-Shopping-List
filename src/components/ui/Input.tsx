import React, { type ChangeEvent } from 'react'
interface InputProps{
  label?: string;
    type?: string;
    placeholder: string;
    value?: string;
    onChange?:(e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    
}

export const Input:React.FC<InputProps> = ({type, placeholder, value, onChange}) => {
  return (
    <div className='w-100 h-12 rounded-2xl  outline-none border ml-50'> 
        <input 
          type= {type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='appearance-none outline-none appearance-none '
        />

    </div>
  )
}
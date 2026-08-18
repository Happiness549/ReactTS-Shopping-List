import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import {Login} from './pages/Login'
import {SignUp} from './pages/SignUp'

function App() {


  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
  
    
  )
}

export default App

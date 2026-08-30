
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import {Login} from './pages/Login'
import {SignUp} from './pages/SignUp'
import { MainLayout } from './components/ShoppingList/MainLayout'
import { Home } from './pages/Home'
import { ProtectedRoute } from './components/ShoppingList/ProtectedRoute'
import {ListItems} from './components/ShoppingList/ListItems'
import {Profile} from './pages/Profile'

 

function App() {
  


  return (

    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />}/>
    
      <Route element={<MainLayout/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/lists/:listId' element={<ListItems/>}/>

      <Route element={<ProtectedRoute/>}>
       <Route path='/home' element={<Home/>}/>
      </Route> 
      </Route>
    </Routes>
    </BrowserRouter>
  
 
  )
}

export default App

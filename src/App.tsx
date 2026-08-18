import {useDispatch} from 'react-redux'
import {populateLists} from './redux/reducers/ListItemReducer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import {Login} from './pages/Login'
import {SignUp} from './pages/SignUp'
import {ShoppingList} from './components/ShoppingList/ShoppingList'

function App() {
  const dispatch = useDispatch()


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

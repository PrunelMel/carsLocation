import React from 'react'
import {apiService} from './services/api'
import { Routes,Route } from 'react-router-dom'
import Board from './pages/Board'
import Agents from './pages/Agents'
import Locations from './pages/Locations'
import Login from './pages/Login'
import Parking from './pages/Parking'

function App() {
    
  
  return (
    <div className='min-h-screen '>
   <Routes>
        <Route path='/admin' element={<Board></Board>}></Route>
        <Route path='/admin/agents' element={<Agents></Agents>}></Route>
        <Route path='/admin/parking' element={<Parking></Parking>}></Route>
        <Route path='/admin/locations' element={<Locations></Locations>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
       
   </Routes>
   </div>
  )
}

export default App
import React from 'react'
import Landing from './components/Landing/Landing'
import { Routes, Route } from 'react-router-dom'
import './App.sass'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App () {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
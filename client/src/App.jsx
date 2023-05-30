import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.sass'
import Landing from './views/Landing/Landing'
import Login from './views/Login/Login'
import Signup from './views/Signup/Signup'
import Dashboard from './views/Dashboard/Dashboard'
import AddExam from './views/AddExam/AddExam'
import Exam from './views/Exam/Exam'

function App () {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/add' element={<AddExam />} />
      <Route path='/dashboard/:exam' element={<Exam />} />
    </Routes>
  )
}

export default App
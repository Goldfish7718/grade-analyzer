import React from 'react'
import Landing from './components/Landing/Landing'
import { Routes, Route } from 'react-router-dom'
import './App.sass'

function App () {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
    </Routes>
  )
}

export default App
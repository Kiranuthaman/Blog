import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import CardPage from './pages/CardPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth register = {true} />} />
        <Route path='/page' element={<CardPage/>} />
      </Routes>

    </>
  )
}

export default App

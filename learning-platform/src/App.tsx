import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './Pages&Comp/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>} />
    </Routes>
    </BrowserRouter>
     
  )
}

export default App

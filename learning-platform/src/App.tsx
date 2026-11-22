import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './Pages&Comp/Home'
import Courses from './Pages&Comp/Courses'
import Auth from './Pages&Comp/Auth'
import Lesson from './Pages&Comp/Lesson'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div style={{ 'display': 'flex' }}>
        <Courses />
        <Routes>
          <Route path='auth' element={<Auth />} />
          <Route path='/home/:course' element={<Home />} >
            <Route path=':lesson' element={<Lesson />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App

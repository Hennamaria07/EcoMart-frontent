import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, NotFount, Register } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Routes>
      <Route 
      path={"/"}
      element={<Home />}
      />
      <Route 
      path={"/sign-up"}
      element={<Register />}
      />
      <Route 
      path={"/login"}
      element={<Login />}
      />
      <Route 
      path={"*"}
      element={<NotFount />}
      />
     </Routes>
    </BrowserRouter>
  )
}

export default App

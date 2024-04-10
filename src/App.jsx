import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Faq, Home, Login, NotFount, Register } from './pages'
import ProductedRouter from './utils/ProductedRouter';
import {useSelector} from "react-redux"

function App() {
  const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated)
  // console.log('isAuthenticated--------> ',isAuthenticated);
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
      path={"/faq"}
      element={<Faq />}
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

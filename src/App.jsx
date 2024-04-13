import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddProducts, Dashboard, EditProduct, EditUser, Faq, Home, Login, NotFount, Products, Register, Users } from './pages'
import ProductedRouter from './utils/ProductedRouter';
import { useSelector } from "react-redux"
import EditProductImg from './pages/admin/EditProductImg';

function App() {
  const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated)
  const role = useSelector(state => state.userAuth?.user?.role)
  console.log('isAuthenticated--------> ', role);
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

        //admin routers
        <Route
          path='/admin'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <Dashboard />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/products'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <Products />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/create-product'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <AddProducts />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/users'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <Users />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/edit-user/:id'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <EditUser />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/edit-product/:id'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <EditProduct />
            </ProductedRouter>
          }
        />
        <Route
          path='/admin/change-product-img/:id'
          element={
            <ProductedRouter isAuthenticated={isAuthenticated} role={role}>
              <EditProductImg />
            </ProductedRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import AddProduct from './pages/admin/AddProduct'
import AdminLayout from './pages/AdminLayout'
import AllProducts from './pages/admin/AllProducts'
import InStock from './pages/admin/InStock'
import OutOfStock from './pages/admin/OutOfStock'
import Orders from './pages/Orders'
import Settings from './pages/admin/Settings'
import Cart from './pages/Cart'
import ProtectedRoute from './routes/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'
import AdminRoute from './routes/AdminRoute'
import Profile from './pages/Profile'
import DetailedCard from './pages/DetailedCard'
import Contact from './pages/Contact'
import OrderDetails from './pages/OrderDetails'
import EditProductDetails from './pages/admin/EditProductDetails'
import AdminOrders from './pages/admin/AdminOrders'

function App() {
  return (
    <>
    {/* <Navbar /> */}
    <Routes>
      <Route path='/signup' element={ <Signup /> } />
      <Route path='/login' element={ <Login /> } />

      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
       } />
      
      <Route path='/details/:id' element={
        <ProtectedRoute>
          <DetailedCard />
        </ProtectedRoute>
      } />
      

      <Route path='/cart' element={ 
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
       } />

      <Route path='/profile' element={ 
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
       } />

      <Route path='/orders' element={ 
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
       } />

      <Route path='/orders/:id' element={ 
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
       } />

      <Route path='/contact' element={ 
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
       } />

      
    

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>          
        }>
        <Route index element={<AllProducts />} /> 
        <Route path="edit" element={ <EditProductDetails /> } />
        <Route path="edit/:id" element={ <EditProductDetails /> } />
        <Route path="in-stock" element={<InStock />} />
        <Route path="out-of-stock" element={<OutOfStock />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="settings" element={<Settings />} />
      </Route>


      {/* {/* 404 NOT FOUND */}
      <Route path='*' element={ <NotFoundPage /> } />

    </Routes>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/*Admin rute*/}
      <Route path='' element={<AdminRoute />}>
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      </Route>
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
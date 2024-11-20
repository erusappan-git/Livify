import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import { Provider } from 'react-redux';
import { store } from './store.js';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='product/:productId' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

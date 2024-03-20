import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//import screens
import Home from './Screens/Home'
import App from './App'
import Login from './Screens/Login'

const router = createBrowserRouter(
    createRoutesFromElements (
        <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)

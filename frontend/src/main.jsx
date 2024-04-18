import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//import screens
import App from './App'
import Home from './Screens/Home'
import Login from './Screens/Login'
import Sub from './Screens/Sub'
import Individual from './Screens/Individual'
import Favs from './Screens/Favs'
import Admin from './Screens/Admin/Admin'
import Items from './Screens/Items'
import Register from './Screens/Register'
import AdminItems from './Screens/Admin/AdminItems'
import AdminUsers from './Screens/Admin/AdminUsers'
import AddItem from './Screens/Admin/AddItem'
import EditItem from './Screens/Admin/EditItem'
import ViewFav from './Screens/ViewFav'
import EditFav from './Screens/EditFav'


const router = createBrowserRouter(
    createRoutesFromElements (
        <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/sub' element={<Sub/>}/>
            <Route path='/item' element={<Items/>}/>
            <Route path='/item/:id' element={<Individual/>}/>
            <Route path='/favs' element={<Favs/>}/>
            <Route path='/favs/:subid' element={<ViewFav/>}/>
            <Route path='/favs/edit/:subid' element={<EditFav/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/admin/items' element={<AdminItems/>}/>
            <Route path='/admin/items/add' element={<AddItem/>}/>
            <Route path='/admin/item/edit/:id' element={<EditItem/>}/>
            <Route path='/admin/users' element={<AdminUsers/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'
import Footer from './Components/Footer'
import { AuthProvider } from './Components/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
  <>
  <AuthProvider>
    <Header/>
    <main className='py-3'>
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
  </AuthProvider>
  </>
  )
}

export default App

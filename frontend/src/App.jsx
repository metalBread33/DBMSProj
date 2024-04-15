import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'
import Footer from './Components/Footer'
import { AuthProvider } from './Components/Auth'

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
  </AuthProvider>
  </>
  )
}

export default App

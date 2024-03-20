import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
  <>
    <Header/>
    <main class='py-3'>
      <Container>
        <Outlet/>
      </Container>
    </main>
  </>
  )
}

export default App

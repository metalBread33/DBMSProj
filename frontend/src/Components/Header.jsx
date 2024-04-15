import React from 'react'
import { Navbar, Nav, Container, NavbarCollapse, NavbarOffcanvas } from 'react-bootstrap'
import {FaUser, FaSignOutAlt  } from 'react-icons/fa'
import { useAuth } from './Auth'


const Header = () => {

    const auth = useAuth()
  return (
    <header>
        <Navbar bg="light" expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>PDNC</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                {!auth.user ? (
                  <Nav.Link href='/login'><FaUser/> Sign In</Nav.Link>
                ) : (
                  <>
                    <Nav.Link href='/'> <FaSignOutAlt/>Logout</Nav.Link>
                  </>
                )}
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      
    </header>
  )
}

export default Header

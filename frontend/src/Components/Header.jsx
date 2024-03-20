import React from 'react'
import { Navbar, Nav, Container, NavbarCollapse } from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
        <Navbar bg="light" expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>PDNC</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='/login'><FaUser/> Sign In</Nav.Link>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      
    </header>
  )
}

export default Header

import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/Auth'

const Home = () => {

  const auth = useAuth()

  const nav = useNavigate()

  const ItemClick = () => {
    nav('/item')
  }

  const SubClick = () => {
    nav('/sub')
  }

  const FavClick = () => {
    nav('/favs')
  }

  const AdminClick = () => {
    nav ('/admin')
  }
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Welcome to the Unoffical Publix Deli Nutritional Calculator</h1>
      <Col>
        <Row>
        <Button className='btn-success' onClick={ItemClick}>Individual Items</Button>
        </Row>
        <br></br>
        <Row>
          <Button className='btn-success' onClick={SubClick}>Calculate Sub Nutrition</Button>
        </Row>
        <br></br>
        {auth.user && (
          <Row>
            <Button className='btn-success' onClick={FavClick}>View Favorites</Button>
          </Row> )
        }
        <br></br>
        {auth.user && auth.user.admin && (
          <Row>
            <Button className='btn-success' onClick={AdminClick}>Admin</Button>
          </Row> )
        }


      </Col>
    </>
  )
}

export default Home

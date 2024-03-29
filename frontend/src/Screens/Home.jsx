import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Home = () => {

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
      <div style={{textAlign: 'center'}}>Welcome to the Unoffical Publix Deli Nutritional Calculator</div>
      <Col>
        <Row>
        <Button className='btn-success' onClick={ItemClick}>Individual Items</Button>
        </Row>
        <br></br>
        <Row>
          <Button className='btn-success' onClick={SubClick}>Calculate Sub Nutrition</Button>
        </Row>
        <br></br>
        {true &&
          <Row>
            <Button className='btn-success' onClick={FavClick}>View Favorites</Button>
          </Row>
        }
        <br></br>
        {true &&
          <Row>
            <Button className='btn-success' onClick={AdminClick}>Admin</Button>
          </Row>
        }


      </Col>
    </>
  )
}

export default Home

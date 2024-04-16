import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Components/Auth'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

const Admin = () => {
  const auth = useAuth()
  const nav = useNavigate()

  useEffect(() => { //used to make sure users on this page are admins
    if( auth.user == null || auth.user.admin == false)
      nav('/')
  }, [])



  return (
    <>
      <h1 style={{textAlign: 'center'}}>Select group to edit</h1>
      <Col>
        <Row>
          <Button className='btn-success' onClick={(e) => {
            nav('/admin/items')
          }}>Food Items</Button>
        </Row>
        <br></br>
        <Row>
          <Button className='btn-success' onClick={(e) => {
            nav('/admin/users')
          }}>Users</Button>
        </Row>

      </Col>
    </>
  )
}

export default Admin

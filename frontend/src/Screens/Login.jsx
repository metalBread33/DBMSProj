import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import {toast} from 'react-toastify'
import { useAuth } from '../Components/Auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()
  const nav = useNavigate()
  

  const fetchData = async () => {
    try {
    const response = await fetch(`http://localhost:5000/api/user/${email}`)
    const data = await response.json()
    return data[0]
    } catch (error) {
      console.log(error.message);  
    }
  }

  useEffect(() => {
  }, [email])

  const submit = async (e) => {
    e.preventDefault()
    const foundUser = await fetchData()
    if(!foundUser){
      console.log("no user found")
    } else if(foundUser.password !== password){
      console.log("passwords dont match")
    } else {

      auth.login(foundUser)
      nav('/')
    }
  }
  return (
    <div>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1>Login</h1>
          <Form onSubmit={submit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Your Email'
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password'
              value={password} 
              onChange={(e) => {setPassword(e.target.value)}}/>
            </Form.Group>

            <Button type='submit' className='btn-success mt-2'>
              Sign in
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login

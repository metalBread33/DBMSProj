import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { GiConsoleController } from 'react-icons/gi'
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const fetchData = async () => {
    try {
    const response = await fetch(`http://localhost:5000/api/user/${email}`)
    const data = await response.json()
    console.log(data[0]);
    console.log(response)
    return data
    } catch (error) {
      console.log(error.message);  
    }
  }

  useEffect(() => {
  }, [email])

  const submit = async () => {
    const foundUser = await fetchData()
    console.log(foundUser)
    if(foundUser ===   undefined){
      console.log("no user found")
    } else 
    if(foundUser.password != password){
      console.log("passwords dont match")
    } else {

    console.log(email)
    console.log(password)
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

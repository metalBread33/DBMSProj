import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useAuth } from '../Components/Auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
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

  const postData = async () => {
    try {
        const body = {email, username, password}
        const response = await fetch(`http://localhost:5000/api/user/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        return response
    } catch (error) {
        console.error(error.message)
    }
  }

    const submit = async (e) => {
      e.preventDefault()
      const foundUser = await fetchData()
      if(foundUser){
        console.log("User already exists")
        toast.error("User already exists")
      } else if(password2 !== password){
        toast.error("Passwords do not match")
        console.log("passwords dont match")
      } else {
        const data = await postData()
        const newUser = await data.json()
        auth.login(newUser)
        nav('/')
      }
    }

  return (
      <div>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1>Sign Up</h1>
          <Form onSubmit={submit}>
            
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Your Email'
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type='username' placeholder='Enter your name'
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Enter your password'
              value={password} 
              onChange={(e) => {setPassword(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Renter your password'
              value={password2} 
              onChange={(e) => {setPassword2(e.target.value)}}/>
            </Form.Group>

            <Button type='submit' className='btn-success mt-2'>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register

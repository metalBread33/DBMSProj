import React, {useState, useEffect} from 'react'
import { Row, Col, Form, InputGroup, Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/Auth'
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa'
import { toast } from 'react-toastify'


const AdminItems = () => {

  const auth = useAuth()
  const nav = useNavigate()
  const [users, setUsers] = useState([])

  //fetch items from database
    const getUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000/users')
          const data = await response.json()

          setUsers(data)
        } catch (error) {
            console.error(error.message)
        }
    }


    useEffect(() => {
      if(auth.user === null || auth.user.admin == false)
        nav('/')
      getUsers()
    }, [users])

    const deleteItem = async (email) => {
      if(window.confirm("Are you sure you want to delete this user?")){
        try {
          console.log(`Delete ${email}`);
          const response = await fetch(`http://localhost:5000/users/${email}`,
          {
            method: "DELETE"
          })

          toast.success("User deleted")
          
          return response
        } catch (error) {
         console.error(error) 
        }
      }
    }

  return (
<>
    <Row>
      <Col>
        <Row>
          <Table striped hover responsive className='table-lg'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td> 
                    <Button style={{color: 'black'}} variant='link'
                      onClick={() => {deleteItem(user.email)}}>
                      <FaTrash/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

    </Col>
  </Row>
</>
  )
}


export default AdminItems

import React, {useState, useEffect} from 'react'
import { Row, Col, Form, InputGroup, Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/Auth'
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa'

const Favs = () => {
  const auth = useAuth()
  const nav = useNavigate()
  const [favs, setFavs] = useState([])
  const [updated, setUpdated] = useState(true)

  const getFavs = async () => {
    try {
      const email = auth.user.email
      const response = await fetch(`http://localhost:5000/get/fav/${email}`)
      const data = await response.json()
      setFavs(data)

    } catch (error) {
      console.error(error)
    }
  }

  const deleteSub = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete/sub/${id}`, {
        method: "DELETE"
      })
      setUpdated(true)
    } catch (error) {
     console.error(error) 
    }
  }

  useEffect(() => {
    if(!auth.user)
      nav('/')
    getFavs()
    setUpdated(false)
  }, [updated])
  return (
    <>
      <Col>
        <Row>
          <Table striped hover responsive className='table-lg'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {favs.map((fav) => 
                <tr key={fav.subid}>
                  <td>{fav.subname}</td>
                  <td>
                    <Button style={{color: 'black'}}
                      variant='link'
                      onClick={() => console.log("edit")}>
                        <FaEdit/>
                    </Button>
                  </td>
                  <td>
                    <Button style={{color: 'black'}}
                      variant='link'
                      onClick={() => deleteSub(fav.subid)}>
                        <FaTrash/>
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Col>
    </>
  )
}

export default Favs

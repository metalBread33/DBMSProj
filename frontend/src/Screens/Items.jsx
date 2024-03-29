import React, {useEffect, useState} from 'react'
import { Table, Row, Col, InputGroup, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Items = () => {

    const getItems = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/individual')
          const data = await response.json()

          console.log(data)
          setItems(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const [items, setItems] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
      getItems()
    }, [])

    console.log(search)
  return (
<>
    <Row>

    <Col md={2}>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control placeholder="Search items"
            onChange={(e) => setSearch(e.target.value)}/>
        </InputGroup>
        <hr></hr>
      </Form>
    </Col>
    <Col md={10}>
    <Table striped hover responsive className='table-lg'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Carbs</th>
          <th>Fat</th>
          <th>Protein</th>
        </tr>
      </thead>
      {/* need to replace with data in db */}
      <tbody>
        {items.filter((item) => {
          return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
        }).map((item) => (
          <tr key={item.itemid}>
            <td><Link style={{color: 'black'}} to='/'>{item.name}</Link></td>
            <td>{item.cals} cals</td>
            <td>{item.carbs} g</td>
            <td>{item.fat} g</td>
            <td>{item.protein} g</td>

          </tr>
        ))}
              </tbody>
    </Table>
    </Col>
    </Row>
</>
  )
}

export default Items

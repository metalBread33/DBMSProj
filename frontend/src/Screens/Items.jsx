import React, {useEffect, useState} from 'react'
import { Table, Row, Col, InputGroup, Form, ToggleButton, FormCheck} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Items = () => {

  //fetch items from database
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
    const [bhOnly, setBhOnly] = useState(false)
    console.log(bhOnly)

    useEffect(() => {
      getItems()
    }, [])

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
        <Form.Check label="Show Boar's Head Only"
          onChange={(e) => setBhOnly(!bhOnly)}/>
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
        }).filter((item) => {
          return ! bhOnly? item : item.bh
        }
        ).map((item) => (
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

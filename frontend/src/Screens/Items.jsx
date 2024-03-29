import React, {useEffect, useState} from 'react'
import { Table, Button } from 'react-bootstrap'
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

    useEffect(() => {
      getItems()
    }, [])
  return (
  <>
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
        {items.map((item) => (
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
  </> 
  )
}

export default Items

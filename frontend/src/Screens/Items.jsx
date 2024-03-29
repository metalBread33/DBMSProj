import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Items = () => {

    const getItems = async () => {
        console.log("hwllo ")
        try {
            console.log("yo")
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
  <>
    <Table striped hover responsive className='table-lg'>
      <thead>
        <th>Name</th>
        <th>Calories</th>
        <th>Carbs</th>
        <th>Fat</th>
        <th>Protein</th>
      </thead>
      {/* need to replace with data in db */}
      <tbody>
        <td><Link to="/">Boar's Head Turkey</Link></td>
        <td>100</td>
        <td>0g</td>
        <td>0g</td>
        <td>20g</td>
      </tbody>
    </Table>
  </> 
  )
}

export default Items

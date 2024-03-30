import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import PieChart from '../Components/PieChart'

const Individual = () => {
  
  const {id : id} = useParams()
  const [item, setItem] = useState([])
  
const getItem = async() => {
    try {
      const response = await fetch(`http://localhost:5000/api/individual/${id}`)
      const data = await response.json()

      setItem(data[0])
    } catch (error) {
        console.error(error.message)
    }
  }


  useEffect(() => {
    getItem()
  }, [])
  
  return (
    <div>
      <Row>
        <Col md={6}>
          <PieChart/>
        </Col>
        <Col md={6}>
          <p>{item.name}</p>
        </Col>
      </Row>
    </div>
  )
}

export default Individual

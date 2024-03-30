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
        <Col md={8}>
          {item.cals===0 ? 
            <h2 style={{textAlign: 'center', bottom: 0, top: 15 }}>This item is calorie free</h2> : 
          <PieChart/>
         }
        </Col>
        <Col md={4}>
          <h2>{item.name}</h2>
          <h3>{item.cals} Calories</h3>
          <h3>{item.carbs}g of Carbs</h3>
          <h3>{item.fat}g of Fat</h3>
          <h3>{item.protein}g of Protein</h3>
          <h3>{item.na}mg of Sodium</h3>
          <h3>{item.cholesterol}mg of Cholesterol</h3>

        </Col>
      </Row>
    </div>
  )
}

export default Individual

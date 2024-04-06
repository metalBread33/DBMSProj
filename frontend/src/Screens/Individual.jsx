import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
//import PieChart from '../Components/PieChart'
import {PieChart, Pie, ResponsiveContainer} from 'recharts'

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

  const calsFromCarbs = item.carbs * 4;
  const calsFromFat = item.fat  * 9;
  const calsFromProtein = item.protein * 4;
  const base = calsFromCarbs + calsFromCarbs + calsFromProtein;
  
  console.log(calsFromCarbs)
  const pieData = [
    {name: "Calories From Carbs", value: calsFromCarbs},
    {name: "Calories From Fat", value: calsFromFat},
    {name: "Calories From Protein", value: calsFromProtein},
  ]


  useEffect(() => {
    getItem()
  }, [])
  
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>{item.name} Breakdown</h1>
        <br/>
      <Row>
        <Col md={8}>
          {item.cals===0 ? 
            <h2 style={{textAlign: 'center', margin: '15px auto' }}>This item is calorie free</h2> : (
              
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>
                </PieChart>
 
              </ResponsiveContainer>
        )
      }</Col>
        <Col md={4}>
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

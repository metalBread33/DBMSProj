import React, { useEffect, useState } from 'react'
import PieChart from "../Components/PieChart"
import {Row, Col, Button} from "react-bootstrap"

const Sub = () => {
    const [toppings, setToppings] = useState([])
    const [kits, setKits] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [breads, setBreads] = useState([])

    const getToppings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/toppings')
        const data = await response.json()

        setToppings(data)
      } catch (error) {
          console.error(error.message)
      }
    }

    const getCheeses = async() => {
      try {
          const response = await fetch('http://localhost:5000/api/cheese')
          const data = await response.json()

          setCheese(data)
        } catch (error) {
            console.error(error.message)
        } 
      }


    const getBreads = async() => {
      try {
          const response = await fetch('http://localhost:5000/api/breads')
          const data = await response.json()

          setBreads(data)
        } catch (error) {
            console.error(error.message)
        } 
      }

    const getKits = async() => {
      try {
          const response = await fetch('http://localhost:5000/api/kits')
          const data = await response.json()

          setKits(data)
        } catch (error) {
            console.error(error.message)
        } 
      }

    const useEffect = () => {
      getToppings()
      getBreads()
      getCheeses()
      getKits()
    }
  return (
    <div>
      <Row>
        <Col style={{textAlign: 'left'}}>
          <h2>Select your choice of bread</h2>

          <h2>Select your choice of cheese</h2>

          <h2>Select your desired sandwich</h2>

          <h2>Select your toppings</h2>
        </Col>

        <Col md={3}>
          <PieChart/>
          <Button>Save sub to favorites</Button>
        </Col>

      </Row>
    </div>
  )
}

export default Sub

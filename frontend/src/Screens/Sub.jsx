import React, { useEffect, useState } from 'react'
import PieChart from "../Components/PieChart"
import {Row, Col, Button, Form} from "react-bootstrap"

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

          setCheeses(data)
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

     useEffect (() => {
      getToppings()
      getBreads()
      getCheeses()
      getKits()
    }, [])
  return (
    <div>
      <Row>
        <Col style={{textAlign: 'left'}}>
          <Form>
            <h2>Select your choice of bread</h2>
            <Form.Select placeholder={" "}>
              {breads.map((bread) => (
                <option>{bread.name}</option>
              ))}
            </Form.Select>          

            <h2>Select your choice of cheese</h2>
            <Form.Select>
              {cheeses.map((cheese) => (
                <option>{cheese.name}</option>
              ))}
            </Form.Select>

            <h2>Select your desired sandwich</h2>
            <Form.Select>
              {kits.map((kit) => (
                <option>{kit.name}</option>
              ))}
            </Form.Select>

              <h2>Select your toppings</h2>
              {
                toppings.map(top => {return <Form.Check label={top.name}></Form.Check>})
              }

            <h2>Extras</h2>
            <Form.Check label='Double Meat'></Form.Check>
            <Form.Check label='Double Cheese'></Form.Check>
          </Form>
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

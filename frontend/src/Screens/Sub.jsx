import React, { useEffect, useState } from 'react'
import PieChart from "../Components/PieChart"
import {Row, Col, Button, Form} from "react-bootstrap"

const Sub = () => {
    const [toppings, setToppings] = useState([])
    const [kits, setKits] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [breads, setBreads] = useState([])
    //const [selectedBread, setSelectedBread] = useState({})
    let topLength = 0
    let totalCals = 0;
    let totalCarbs = 0
    let totalFat = 0
    let totalProtein = 0
    let totalNa = 0
    let totalCholes = 0

    const fetchData = async () => {
      try {
        const breadRes = await fetch('http://localhost:5000/api/breads')
        const toppingRes = await fetch('http://localhost:5000/api/toppings')
        const cheeseRes = await fetch('http://localhost:5000/api/cheese')
        const kitRes = await fetch('http://localhost:5000/api/kits')
        setBreads(await breadRes.json())
        setToppings(await toppingRes.json())
        setCheeses(await cheeseRes.json())
        setKits(await kitRes.json())
      } catch (error) {
        console.error(error)
      }
    }
    
     useEffect (() => {
      fetchData()
      updateTotals()
    }, [])

    const updateBread = async (e) => {
      //console.log(e)
      try {
        const response = await fetch(`http://localhost:5000/api/${e}`)
        const item = await response.json()
        //setSelectedBread(item)
        //console.log(item);
      } catch (error) {
        
      }
    }

    const updateTotals = () => {
     // totalCals = selectedBread.cals
     // console.log(totalCals)
      //console.log(selectedBread.cals)
    }

    //totalCals = selectedBread.cals
  return (
    <div>
      <Row>
        <Col md={6}style={{textAlign: 'left'}}>
          <Form>
            <h2>Select your choice of bread</h2>
            <Form.Select onChange={(e)=> {updateBread(e.target.value); 
              updateTotals(totalCals, selectedBread)
            }}>
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
        <h2>Nutrition</h2>
        <p>{totalCals} cals</p>
        <p>{totalCarbs}g of Carbs</p>
        <p>{totalFat}g of Fat</p>
        <p>{totalProtein}g of Protein</p>
        <p>{totalNa}mg of Sodium</p>
        <p>{totalCholes}mg of Cholesterol</p>
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

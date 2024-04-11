import React, { useEffect, useState } from 'react'
import PieChart from "../Components/PieChart"
import {Row, Col, Button, Form} from "react-bootstrap"

const Sub = () => {
    const [toppings, setToppings] = useState([])
    const [kits, setKits] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [breads, setBreads] = useState([])
    const [selectedBread, setSelectedBread] = useState({})
    const [selectedCheese, setSelectedCheese] = useState({})
    const [selectedKit, setSelectedKit] = useState({})
    const [totalCals, setTotalCals] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFat, setTotalFat] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalNa, setTotalNa] = useState(0)
    const [totalCholes, setTotalCholes] = useState(0)

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

    useEffect(() => {
      updateTotals()
    }, [selectedBread, selectedCheese, selectedKit])

    const updateItem = async (e) => {
      try {
        const response = await fetch(`http://localhost:5000/api/${e}`)
        const data  = await response.json()
        const item = data[0]
        if (item.itemtype === 4)
          setSelectedBread(item)
        if (item.itemtype === 2)
          setSelectedCheese(item)
        if (item.itemtype === 1)
          setSelectedKit(item)
      } catch (error) {
        console.log(error); 
      }
    }

    const updateTotals = () => {
      const cals = selectedBread.cals + selectedCheese.cals + selectedKit.cals
      const carbs = selectedBread.carbs + selectedCheese.carbs + selectedKit.carbs
      const fat = selectedBread.fat + selectedCheese.fat + selectedKit.fat
      const protein = selectedBread.protein + selectedCheese.protein + selectedKit.protein
      const sodium = selectedBread.na + selectedCheese.na + selectedKit.na
      const cholesterol = selectedBread.cholesterol + selectedCheese.cholesterol + selectedKit.cholesterol

      isNaN(cals) ? setTotalCals(0) : setTotalCals(cals) 
      isNaN(carbs) ? setTotalCarbs(0) : setTotalCarbs(carbs)
      isNaN(fat) ? setTotalFat(0) : setTotalFat(fat)
      isNaN(protein) ? setTotalProtein(0) : setTotalProtein(protein)
      isNaN(sodium) ? setTotalNa(0) : setTotalNa(sodium)
      isNaN(cholesterol) ? setTotalCholes(0) : setTotalCholes(cholesterol)
    }

  return (
    <div>
      <Row>
        <Col md={6}style={{textAlign: 'left'}}>
          <Form>
            <h2>Select your choice of bread</h2>
            <Form.Select onChange={(e)=> {updateItem(e.target.value); 
             updateTotals() 
            }}>
              <option></option>
              {breads.map((bread) => (
                <option>{bread.name}</option>
              ))}
            </Form.Select>          

            <h2>Select your choice of cheese</h2>
            <Form.Select onChange={(e) => {updateItem(e.target.value);
            updateTotals()}}>
              <option></option>
              <option>No Cheese</option>
              {cheeses.map((cheese) => (
                <option>{cheese.name}</option>
              ))}
            </Form.Select>

            <h2>Select your desired sandwich</h2>
            <Form.Select onChange={(e) => {updateItem(e.target.value);
            updateTotals()}}>
              <option></option>
              {kits.map((kit) => (
                <option>{kit.name}</option>
              ))}
            </Form.Select>

              <h2>Select your toppings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {
                toppings.map(top => <Form.Check key={top.id} label={top.name} />)
              }
              </div>

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

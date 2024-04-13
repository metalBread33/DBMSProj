import React, { useEffect, useState } from 'react'
import PieChart from "../Components/PieChart"
import {Row, Col, Button, Form} from "react-bootstrap"
import { RxFontRoman } from 'react-icons/rx'

const Sub = () => {
    const [toppings, setToppings] = useState([])
    const [kits, setKits] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [breads, setBreads] = useState([])
    const [selectedBread, setSelectedBread] = useState({})
    const [selectedCheese, setSelectedCheese] = useState({})
    const [selectedKit, setSelectedKit] = useState({})
    const [whole, setWhole] = useState(false)
    const [doubleMeat, setDoubleMeat] = useState(false)
    const [doubleCheese, setDoubleCheese] = useState(false)
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
    }, [])

    useEffect(() => {
      updateTotals()
    }, [selectedBread, selectedCheese, selectedKit, whole, doubleCheese, doubleMeat])

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
      let cals = selectedBread.cals + selectedCheese.cals + selectedKit.cals
      let carbs = selectedBread.carbs + selectedCheese.carbs + selectedKit.carbs
      let fat = selectedBread.fat + selectedCheese.fat + selectedKit.fat
      let protein = selectedBread.protein + selectedCheese.protein + selectedKit.protein
      let sodium = selectedBread.na + selectedCheese.na + selectedKit.na
      let cholesterol = selectedBread.cholesterol + selectedCheese.cholesterol + selectedKit.cholesterol
      
      if(!whole) {
        cals = cals/2
        carbs = carbs/2 
        fat = fat/2 
        protein = protein/2 
        sodium = sodium/2 
        cholesterol = cholesterol/2 
      }

      if(doubleCheese) {
        cals += selectedCheese.cals
        carbs += selectedCheese.carbs
        fat += selectedCheese.fat
        protein += selectedCheese.protein
        sodium += selectedCheese.na
        cholesterol += selectedCheese.cholesterol
      }
      
      if(doubleMeat) {
        cals += selectedKit.cals
        carbs += selectedKit.carbs
        fat += selectedKit.fat
        protein += selectedKit.protein
        sodium += selectedKit.na
        cholesterol += selectedKit.cholesterol
      }


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
            <Row>
              <Col md={5}>
                <Form.Select onChange={(e)=> {updateItem(e.target.value); 
                updateTotals()}}>
                  <option></option>
                  {breads.map((bread) => (
                    <option key={bread.itemid}>{bread.name}</option>
                  ))}
                </Form.Select> 
              </Col>
              <Col>
                  <Form.Check type="switch"label="Whole?" onChange={() => {
                    setWhole(!whole)
                  }}/>
              </Col>
            </Row>
                     

            <h2>Select your choice of cheese</h2>
            <Row>
              <Col md={5}>
                <Form.Select onChange={(e) => {updateItem(e.target.value); updateTotals()}}>
                  <option></option>
                    {cheeses.map((cheese) => (
                  <option key={cheese.itemid}>{cheese.name}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col>
                  <Form.Check type='switch' label='Double Cheese' onChange={() => {
                    setDoubleCheese(!doubleCheese)
                  }}/>
              </Col>
            </Row>
            
            <h2>Select your desired sandwich</h2>
          <Row>
           <Col md={5}>
            <Form.Select onChange={(e) => {updateItem(e.target.value);
              updateTotals()}}>
              <option></option>
              {kits.map((kit) => (
                <option key={kit.itemid}>{kit.name}</option>
              ))}
            </Form.Select>
           </Col> 

           <Col>
              <Form.Check type='switch' label='Double Meat' onChange={() => {
                setDoubleMeat(!doubleMeat)
              }} />
           </Col>
          </Row>  
        
          <h2>Select your toppings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {
              toppings.map(top => <Form.Check key={top.itemid} label={top.name} />)
            }
            </div>

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

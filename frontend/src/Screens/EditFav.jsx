import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../Components/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditFav = () => {
    const auth = useAuth()
    const [toppings, setToppings] = useState([])
    const [kits, setKits] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [breads, setBreads] = useState([])
    const [selectedBread, setSelectedBread] = useState(null)
    const [selectedCheese, setSelectedCheese] = useState(null)
    const [selectedKit, setSelectedKit] = useState(null)
    const [selectedToppings, setSelectedToppings] = useState([])
    const [whole, setWhole] = useState(false)
    const [doublemeat, setdoublemeat] = useState(false)
    const [doublecheese, setdoublecheese] = useState(false)
    const [totalCals, setTotalCals] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFat, setTotalFat] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalNa, setTotalNa] = useState(0)
    const [totalCholes, setTotalCholes] = useState(0)
    const [subname, setSubName] = useState("My favorite sub")
    const {subid: subid} = useParams()
    const nav = useNavigate()

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
          transferFromSub()
        } catch (error) {
          console.error(error)
        }
      }

    const transferFromSub = async () => {
        try {
          const subRes = await fetch(`http://localhost:5000/api/get/update/sub/${subid}`)
          const subData = await subRes.json()
          setSubName(subData[0].subname)
//          const cheese = await (await fetch(`http://localhost:5000/api/individual/${subData[0].cheeseid}`)).json()
  //        console.log(cheese)
    //      setSelectedCheese(cheese)
      //    setWhole(subData[0].whole)
        } catch (error) {
          console.error(error)  
        }
    }

    useEffect(() => {
        if(!auth.user)
            nav('/')
        fetchData()
    }, [])
    
useEffect(() => {
    updateTotals()
  }, [selectedBread, selectedCheese, selectedKit, selectedToppings, whole, doublecheese, doublemeat, selectedToppings])

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

  const addToppings = async (toppingID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/individual/${toppingID}`)
      const data = await response.json()
      const topping = data[0]
      let tempArray = [...selectedToppings]

      console.log(topping)
      console.log(tempArray)

      var inArray = false
      for (var i = 0; i < selectedToppings.length; i++) {
        if(JSON.stringify(selectedToppings[i]) === JSON.stringify(topping))
          inArray = true
      }

      if(inArray) {
        const index = tempArray.indexOf(topping)
        tempArray.splice(index, 1)
      } else {
        tempArray.push(topping)
      }

      setSelectedToppings(tempArray)
    } catch (error) {
     console.error(error.message); 
    }
  } 

  const updateTotals = () => {
    let cals = 0
    let carbs = 0
    let fat = 0
    let protein = 0
    let sodium = 0
    let cholesterol = 0

    if(selectedBread != null ) {
      cals += selectedBread.cals
      carbs += selectedBread.carbs
      fat += selectedBread.fat
      protein += selectedBread.protein
      sodium += selectedBread.na 
      cholesterol += selectedBread.cholesterol 
    }

    if(selectedCheese != null) {
      cals += selectedCheese.cals
      carbs += selectedCheese.carbs
      fat += selectedCheese.fat 
      protein += selectedCheese.protein 
      sodium += selectedCheese.na 
      cholesterol += selectedCheese.cholesterol
    }
    

    if(selectedKit != null) {
      cals += selectedKit.cals
      carbs += selectedKit.carbs
      fat += selectedKit.fat 
      protein += selectedKit.protein 
      sodium += selectedKit.na 
      cholesterol += selectedKit.cholesterol
    }


    selectedToppings.forEach((topping) => {
      cals += topping.cals
      carbs += topping.carbs
      fat += topping.fat
      protein += topping.protein
      sodium += topping.na
      cholesterol += topping.cholesterol
    })

    if(!whole) {
      cals = cals/2
      carbs = carbs/2 
      fat = fat/2 
      protein = protein/2 
      sodium = sodium/2 
      cholesterol = cholesterol/2 
    }

    if(doublecheese) {
      cals += selectedCheese.cals
      carbs += selectedCheese.carbs
      fat += selectedCheese.fat
      protein += selectedCheese.protein
      sodium += selectedCheese.na
      cholesterol += selectedCheese.cholesterol
    }
    
    if(doublemeat) {
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

  const updateFav = async () => {
    try {
      const breadid = selectedBread.itemid
      const meatid = selectedKit.itemid
      const cheeseid = selectedCheese.itemid
      const toppings = selectedToppings


      const body = {subid, subname, breadid, meatid, cheeseid, doublemeat, doublecheese, whole, toppings }
      const response = await fetch('http://localhost:5000/api/update/sub',
      {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
 })
      console.log(response)
      toast.success("Item edited")
        nav('/favs')
    } catch (error) {
      console.error(error)
    }
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
                <Form.Check type="switch"label="Whole?" defaultChecked={whole} onChange={() => {
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
                <Form.Check type='switch' label='Double Cheese' defaultChecked={doublecheese} onChange={() => {
                  setdoublecheese(!doublecheese)
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
            <Form.Check type='switch' label='Double Meat' defaultChecked={doublemeat} onChange={() => {
              setdoublemeat(!doublemeat)
            }} />
         </Col>
        </Row>  
      
        <h2>Select your toppings</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {
            toppings.map(top => <Form.Check key={top.itemid} label={top.name} onChange={() => {addToppings(top.itemid)}} />)
          }
          </div>

        </Form>
     </Col>

     <Col md={6} className='justify-content-md-center' style={{textAlign: 'center'}}>
      <h2>Nutrition</h2>
      <p>{totalCals} cals</p>
      <p>{totalCarbs}g of Carbs</p>
      <p>{totalFat}g of Fat</p>
      <p>{totalProtein}g of Protein</p>
      <p>{totalNa}mg of Sodium</p>
      <p>{totalCholes}mg of Cholesterol</p>
      {auth.user && (
        <>
          <Form className='d-flex justify-content-md-center mt-2'>
            <Col md={3} className='justify-content-md-center'>
              <Form.Label className='h4'>Name this sub</Form.Label>
              <Form.Control type='text'
                value={subname}
                onChange={(e) => setSubName(e.target.value)}>
              </Form.Control>
            </Col>
          </Form>
          <Button className='btn-success mt-3' onClick={() => {updateFav()}}>Update</Button>
        </>
      )
      }
     </Col>

    </Row>
  </div>
)
}


export default EditFav
import React, {useState, useEffect} from 'react'
import { useAuth } from '../../Components/Auth'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddItem = () => {
    const auth = useAuth()
    const nav = useNavigate()
    const [name, setName] = useState('')
    const [cals, setCals] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [na, setSodium] = useState(0)
    const [cholesterol, setCholes] = useState(0)
    const [itemtype, setType] = useState(1)
    const [bh, setBH] = useState(false)

    useEffect(() => {
        if(auth.user === null || auth.user.admin == false){
            nav('/')
        }
    },[])

    const postData = async() => {
        try {
            const id = (await (await fetch('http://localhost:5000/nextid')).json()).nextid
            const body = {name, cals, carbs, fat, protein, na, cholesterol, itemtype, id, bh }
            const response = await fetch(`http://localhost:5000/api/item/`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
            return response
            
        } catch (error) {
            console.error(error)
            
        }
    }

    const submit = async(e) => {
        e.preventDefault()
       await postData()
       toast.success("Item added")
       nav('/admin/items') 
    }
  return (
    <div>
        <Row className='justify-content-md-center'>
            <Col md={6}>
                <h1>New Item</h1>
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type='text' placeholder="Enter new item's name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}>

                        </Form.Control>
                </Form.Group>

                 <Form.Group>
                        <Form.Label>Calories</Form.Label>
                        <Form.Control type='number' placeholder="Enter new item's calorie count"
                        value={cals}
                        onChange={(e) => {
                            setCals(e.target.value)
                        }}>

                        </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Carbs</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's carb count"
                    value={carbs}
                    onChange={(e) => {
                        setCarbs(e.target.value)
                        }}>

                    </Form.Control>
                </Form.Group>

                 <Form.Group>
                    <Form.Label>Fat</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's Fat count"
                    value={fat}
                    onChange={(e) => {
                        setFat(e.target.value)
                    }}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Protein</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's protein count"
                    value={protein}
                    onChange={(e) => {
                        setProtein(e.target.value)
                    }}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Sodium</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's sodium count"
                    value={na}
                    onChange={(e) => {
                        setSodium(e.target.value)
                    }}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cholesterol</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's cholesterol count"
                    value={cholesterol}
                    onChange={(e) => {
                        setCholes(e.target.value)
                    }}>
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Boar's Head</Form.Label>
                    <Form.Check onChange={() => {setBH(!bh)}}>

                    </Form.Check>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Item type</Form.Label>
                    <Form.Select onChange={(e) => {setType(e.target.value)}}>
                        <option value={1}>Sub Kit</option>
                        <option value={2}>Cheese</option>
                        <option value={3}>Topping</option>
                        <option value={4}>Bread</option>
                    </Form.Select>
                </Form.Group>
                <Button className='btn-success' type='submit'>Add Item</Button>
                </Form>
            </Col>
        </Row>
      
    </div>
  )
}

export default AddItem

import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

const AddItem = () => {

    const submit = () => {

    }
  return (
    <div>
        <Row className='justify-content-md-center'>
            <Col md={6}>
                <h1>New Item</h1>
                <Form onSubmit={submit}>
                    <Form.Group>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type='text' placeholder="Enter new item's name">

                        </Form.Control>
                </Form.Group>

                 <Form.Group>
                        <Form.Label>Calories</Form.Label>
                        <Form.Control type='number' placeholder="Enter new item's calorie count">

                        </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Carbs</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's carb count">

                    </Form.Control>
                </Form.Group>

                 <Form.Group>
                    <Form.Label>Fat</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's Fat count">
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Protein</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's protein count">
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Sodium</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's sodium count">
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cholesterol</Form.Label>
                    <Form.Control type='number' placeholder="Enter new item's cholesterol count">
                        
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Item type</Form.Label>
                    <Form.Select>
                        <option value={1}>Sub Kit</option>
                        <option value={2}>Cheese</option>
                        <option value={3}>Topping</option>
                        <option value={4}>Bread</option>
                    </Form.Select>
                </Form.Group>



                </Form>
            </Col>
        </Row>
      
    </div>
  )
}

export default AddItem

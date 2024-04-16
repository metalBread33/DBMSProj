import React, {useState, useEffect} from 'react'
import { Row, Col, Form, InputGroup, Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/Auth'
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa'


const AdminItems = () => {

  const auth = useAuth()
  const nav = useNavigate()
  //fetch items from database
    const getItems = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/individual')
          const data = await response.json()

          setItems(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const [items, setItems] = useState([])
    const [search, setSearch] = useState("")
    const [bhOnly, setBhOnly] = useState(false)
    const [whole, setWhole] = useState(false)
    const [order, setOrder] = useState(0)
    const [type, setType] = useState(0)

    useEffect(() => {
      if(auth.user === null || auth.user.admin == false)
        nav('/')
      getItems()
    }, [items])

    const sortData = (e) => {
      const selected = e.target.value  //so i don't have to write e... over and over
      if(selected == 0)
        items.sort((a,b) => a.itemid - b.itemid)
      if(selected == 1)
        items.sort((a,b) => a.cals - b.cals)
      if(selected == 2)
        items.sort((a,b) => b.cals - a.cals)
      if(selected == 3)
        items.sort((a,b) => a.carbs - b.carbs)
      if(selected == 4)
        items.sort((a,b) => b.carbs - a.carbs)
      if(selected == 5)
        items.sort((a,b) => a.fat - b.fat)
      if(selected == 6)
        items.sort((a,b) => b.fat - a.fat)
      if(selected == 7)
        items.sort((a,b) => a.protein - b.protein)
      if(selected == 8)
        items.sort((a,b) => b.protein - a.protein)
 
      setOrder(selected) //refreshes state at the ends
    }

    const itemType = (e) => {
      setType(e.target.value)
    }

    const deleteItem = async (id) => {
      if(window.confirm("Are you sure you want to delete this item?")){
        try {
          console.log(`Delete item number ${id}`);
          const response = await fetch(`http://localhost:5000/api/item/${id}`,
          {
            method: "DELETE"
          })
          
          return response
        } catch (error) {
         console.error(error) 
        }
      }
    }

  return (
<>
    <Row>
      {/*Filters*/}
      <Col lg={2}>
        <Form>
          <InputGroup>
            <Form.Control placeholder="Search items"
              onChange={(e) => setSearch(e.target.value)}/>
          </InputGroup>
          <hr></hr>
          <Form.Check label="Show Boar's Head Only"
            onChange={() => setBhOnly(!bhOnly)}/>
          <Form.Check label="Show Whole Nutrition"
            onChange={() => setWhole(!whole) }
            />
          <hr/> 
          <p>Sort by</p>
          <Form.Select defaultValue="Sort by"
            onChange={sortData}>
            <option value={0}>Default</option>
            <option value={1}>Lowest Calorie First</option>
            <option value={2}>Highest Calorie First</option>
            <option value={3}>Lowest Carbs First</option>
            <option value={4}>Highest Carbs First</option>
            <option value={5}>Lowest Fat First</option>
            <option value={6}>Highest Fat First</option>
            <option value={7}>Lowest Protein First</option>
            <option value={8}>Highest Protein First</option>
          </Form.Select>
          <hr/>
          <p>Select item type</p>
          <Form.Select onChange={itemType}>
            <option value={0}>All</option>
            <option value={1}>Sub Kits</option>
            <option value={2}>Cheeses</option>
            <option value={3}>Toppings</option>
            <option value={4}>Breads</option>

          </Form.Select>
        </Form>
      </Col>

      {/*Table */}
      <Col md={10}>
        <Button style={{color: 'black'}} variant='link'
          onClick={(e) => {
            nav('/admin/items/add')
          }}>
          <FaPlus/> Add Item
        </Button>
        <Row>
          <Table striped hover responsive className='table-lg'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit Item</th>
                <th>Delete Item</th>
              </tr>
            </thead>
            <tbody>
              {items.filter((item) => {
                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
              }).filter((item) => {
                return ! bhOnly? item : item.bh
              }
              ).filter((item) => {return type == 0 ? item : item.itemtype == type }
                )
                .map((item) => (
                <tr key={item.itemid}>
                  <td><Link style={{color: 'black'}} to={`/item/${item.itemid}`}>{item.name}</Link></td>
                  <td>
                    <Button style={{color: 'black'}} variant='link'
                      onClick={() => {nav(`/admin/item/edit/${item.itemid}`)}}>
                      <FaEdit/>
                    </Button>
                  </td>
                  <td> 
                    <Button style={{color: 'black'}} variant='link'
                      onClick={() => {deleteItem(item.itemid)}}>
                      <FaTrash/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

    </Col>
  </Row>
</>
  )
}


export default AdminItems

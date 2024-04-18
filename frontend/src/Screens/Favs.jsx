import React, {useState, useEffect} from 'react'
import { Row, Col, Form, InputGroup, Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/Auth'
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa'

const Favs = () => {
  const auth = useAuth()
  const nav = useNavigate()
  const [favs, setFavs] = useState([])

  const getFavs = async () => {
    const email = auth.user.email
    const body = {email}
    const response = await fetch(`http://localhost:5000/get/fav/${email}`)
    const data = await response.json()
    setFavs(data)
  }

  useEffect(() => {
    if(!auth.user)
      nav('/')
    getFavs()
  }, [])
  return (
    <div>
      Users can see favorite sub orders
    </div>
  )
}

export default Favs

import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import { useAuth } from '../Components/Auth'

const ViewFav = () => {
    const {subid: subid} = useParams()
    const [subData, setSubData] = useState([])
    const auth = useAuth()
    const nav = useNavigate()

    const getSub = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/get/sub/${subid}`)
            const data = await response.json()
            setSubData(data[0])
            console.log(subData);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect( () => {
        if(!auth.user){
            nav('/')
        }
        getSub()
    }, [])
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{subData.subname}</h1>
      <br/>
      <Row>
        <Col>
            <h3>{subData.totalcals} Calories</h3>
            <h3>{subData.totalcarbs}g of Carbs</h3>
            <h3>{subData.totalfat}g of Fat</h3>
            <h3>{subData.totalprotein}g of Protein</h3>
            <h3>{subData.totalna}mg of Sodium</h3>
            <h3>{subData.totalcholes}mg of Cholesterol</h3>
        </Col>
      </Row>
    </div>
  )
}

export default ViewFav

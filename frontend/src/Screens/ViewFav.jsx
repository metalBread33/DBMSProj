import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import { useAuth } from '../Components/Auth'

const ViewFav = () => {
    const {subid: subid} = useParams()
    const [subData, setSubData] = useState([])
    const auth = useAuth()
    const nav = useNavigate()
    const [cals, setCals] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [na, setNa] = useState(0)
    const [cholesterol, setCholes] = useState(0)
    const [subname, setSubName] = useState("")

    const getSub = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/get/sub/${subid}`)
            const data = await response.json()
            let subData = data[0]
            console.log(subData);
            setSubName(subData.subname)

            let tCals = subData.totalcals
            let tCarbs = subData.totalcarbs
            let tFat = subData.totalfat
            let tProtein = subData.totalprotein
            let tNa = subData.totalna
            let tCholes = subData.totalcholes
        
            if(subData.doublemeat) {
              const meatData = await fetch(`http://localhost:5000/api/individual/${subData.meatid}`)
              console.log(meatData);
            }
            
            if(!subData.whole) {
              setCals(tCals/2)
              setCarbs(tCarbs/2)
              setFat(tFat/2)
              setProtein(tProtein/2)
              setProtein(tNa/2)
              setProtein(tCholes/2)
            } 
            else {
              setCals(tCals)
              setCarbs(tCarbs)
              setFat(tFat)
              setProtein(tProtein)
              setProtein(tNa)
              setProtein(tCholes)
            }

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
      <h1 style={{textAlign: 'center'}}>{subname}</h1>
      <br/>
      <Row>
        <Col>
            <h3>{cals} Calories</h3>
            <h3>{carbs}g of Carbs</h3>
            <h3>{fat}g of Fat</h3>
            <h3>{protein}g of Protein</h3>
            <h3>{na}mg of Sodium</h3>
            <h3>{cholesterol}mg of Cholesterol</h3>
        </Col>
      </Row>
    </div>
  )
}

export default ViewFav

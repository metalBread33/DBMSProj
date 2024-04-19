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
    const [doubleCheese, setDoubCheese] = useState()
    const [doublemeat, setDoubMeat] = useState()


    const getSub = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/get/sub/${subid}`)
            const data = await response.json()
            const subData = data[0]
            setSubName(subData.subname)
            setDoubCheese(subData.doublecheese)
            setDoubMeat(subData.doublemeat)

            let tCals = subData.totalcals
            let tCarbs = subData.totalcarbs
            let tFat = subData.totalfat
            let tProtein = subData.totalprotein
            let tNa = subData.totalna
            let tCholes = subData.totalcholes
        
            if(doublemeat) {
              const meatData = (await (await fetch(`http://localhost:5000/api/individual/${subData.meatid}`)).json())[0]
              tCals += meatData.cals
              tCarbs += meatData.carbs
              tFat += meatData.fat
              tProtein += meatData.protein
              tNa += meatData.na
              tCholes += meatData.cholesterol
            }

            if(doubleCheese) {
              const res = (await (await fetch(`http://localhost:5000/api/individual/${subData.cheeseid}`)).json())
              const cheeseData = res[0]
              tCals+= cheeseData.cals
              tCarbs += cheeseData.carbs
              tFat += cheeseData.fat 
              tProtein += cheeseData.protein
              tNa += cheeseData.na
              tCholes += cheeseData.cholesterol
            }
            
            if(!subData.whole) {
              setCals(tCals/2)
              setCarbs(tCarbs/2)
              setFat(tFat/2)
              setProtein(tProtein/2)
              setNa(tNa/2)
              setCholes(tCholes/2)
            } 
            else {
              setCals(tCals)
              setCarbs(tCarbs)
              setFat(tFat)
              setProtein(tProtein)
              setNa(tNa)
              setCholes(tCholes)
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

                
    }, [cholesterol])
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

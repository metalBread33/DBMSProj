import express from 'express'
import pool from './database/data.js'
import cors from 'cors'
import {
    allFoodItems,
    oneItem,
    allBreads,
    allToppings,
    allCheese,
    allKits,
    itemByName,
    addItem,
    updateItem,
    deleteItem,
    nextItemId
} from './queries/ItemQueries.js'

import {
    deleteUser,
    getAllUsers,
    getUser,
    registerUser
} from './queries/UserQueries.js'

import {
    addFav,
    addSub,
    addToppingsToSub,
    clearToppings,
    deleteFav,
    editFav,
    editToppings,
    getFavToEdit,
    getSubNut,
    getUserFavs
} from './queries/FavQueries.js'

const port = 5000;

const app = express()
app.use(express.json())

app.use(cors())
//used to make sure api is up
app.get('/', (req,res) => {
    res.send('API is running ...')
})

//item api calls
//get all items
app.get('/api/individual', async (req, res) => {
    try {
        const query =  await pool.query(`${allFoodItems}`)
        res.json(query.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get singluar item
app.get('/api/individual/:id', async (req, res) => {
     try {
        const {id} = req.params
        const query = await pool.query(oneItem, [id])
        res.json(query.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get breads
app.get('/api/breads', async (req, res) => {
    try {
        const query = await pool.query(allBreads)
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get toppings
app.get('/api/toppings', async (req, res) => {
    try {
        const query = await pool.query(allToppings)
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get cheese
app.get('/api/cheese', async (req, res) => {
    try {
        const query = await pool.query(allCheese)
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get kits
app.get('/api/kits', async (req, res) => {
    try {
        const query = await pool.query(allKits)
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get item by name
app.get('/api/:name', async (req, res) => {
    try {
        const {name} = req.params
        const query = await pool.query(itemByName, [name])
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//add item to db
app.post('/api/item', async(req, res) => {
    try {
        const {
            name,
            cals, 
            carbs, 
            fat, 
            protein, 
            na, 
            cholesterol, 
            itemtype, 
            id, 
            bh
        } = req.body

        const newItem = await pool.query(addItem, [
            name, 
            cals, 
            carbs, 
            fat, 
            protein, 
            na, 
            cholesterol, 
            itemtype, 
            id, 
            bh
        ])

        res.send(newItem.rows)
    } catch (error) {
        res.send(error)
    }
})

//update an item
app.put('/api/item', async (req, res) => {
   try {
    const {
        name,
        cals, 
        carbs, 
        fat, 
        protein, 
        na, 
        cholesterol, 
        itemtype, 
        id, 
        bh
    } = req.body

    const update = await pool.query(updateItem, [
        name, 
        cals, 
        carbs, 
        fat, 
        protein, 
        na, 
        cholesterol, 
        itemtype, 
        id, 
        bh
    ])

    res.send(update.rows)
   } catch (error) {
    console.log(error);
    res.send(error)
   } 
})

//delete an item
app.delete('/api/item/:id', async (req, res) => {
    try {
        const {id} = req.params
        const query = pool.query(deleteItem, [id])
        res.send(`Item number ${id} has been deleted`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//get next avaliable itemid
app.get('/nextid', async (req, res) => {
    try {
        const result = await pool.query(nextItemId)
        const maxid = result.rows[0].max
        const nextid = maxid ? maxid+1 : 1
        res.send({nextid})
    } catch (error) {
        res.send(error)
    }
})


//user api calls
//get user info from email  
app.get('/api/user/:email', async (req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query(getUser, [email])
        res.send(query.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//register user
app.post('/api/user', async (req, res) => {
    try {
        const {email, username, password} = req.body
        const newUser = await pool.query(registerUser, [
            email, 
            username, 
            password]
        )

        res.send(newUser.rows)
    } catch (error) {
        console.error(error.message)
        res.send(error.message)
    }
})


//get all user info
app.get('/users', async (req, res) => {
    try {
        const query = await pool.query(getAllUsers)
        res.send(query.rows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//delete a user 
app.delete('/users/:email', async (req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query(deleteUser, [email])
        res.send(`User with email ${email} has been deleted`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//api calls for favorites and subs
app.post('/api/fav', async (req, res) => {
    try {
        const {
            email, 
            subname, 
            breadid, 
            meatid, 
            cheeseid, 
            doublemeat, 
            doublecheese, 
            whole, 
            toppings
        } = req.body

        const query = await pool.query(addSub, [
            subname, 
            breadid, 
            meatid, 
            cheeseid, 
            doublemeat, 
            doublecheese, 
            whole
        ])
        
        const subid = query.rows[0].subid
        
        //iterate through toppings array, add each and subid to subtoppings table
        toppings.forEach(async (topping) => {
                await pool.query(addToppingsToSub, [subid, topping.itemid])
        });

        const favQuery = await pool.query(addFav,
            [subid, email])
        res.send(favQuery)
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/get/fav/:email', async (req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query(getUserFavs, [email])
        res.send(query.rows)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})

//get sub nutrition
app.get('/api/get/sub/:subid', async(req, res) => {
    try {
        const {subid} = req.params
        const query = await pool.query( getSubNut, [subid] 
        )
        res.send(query.rows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.delete('/api/delete/sub/:id', async(req, res) => {
    try {
        const {id} = req.params
        const query = await pool.query(deleteFav, [id])
        res.send("sub has been deleted")
    } catch (error) {
        console.error(error)   
        res.send(error)
    }
})

app.get('/api/get/update/sub/:subid', async (req, res) => {
    try {
        const {subid} = req.params
        const query = await pool.query(getFavToEdit, [subid])
        res.send(query.rows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.put('/api/update/sub', async (req, res) => {
    try {
        const {
            subid, 
            subname, 
            breadid, 
            meatid, 
            cheeseid, 
            doublemeat, 
            doublecheese, 
            whole, 
            toppings
        } = req.body

        const query = await pool.query(editFav, [
            subname,
            breadid,
            meatid,
            cheeseid,
            whole,
            doublemeat,
            doublecheese,
            subid
        ])

        await pool.query(clearToppings, [subid])

        toppings.forEach(async (topping) => {
            await pool.query(editToppings, [topping.itemid, subid])
        })

        res.send(query)
        
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))
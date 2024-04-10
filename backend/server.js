import express from 'express'
import pool from './database/data.js'
import cors from 'cors'


const port = 5000;

const app = express()

app.use(cors())
//used to make sure api is up
app.get('/', (req,res) => {
    res.send('API is running ...')
})

//get all items
app.get('/api/individual', async (req, res) => {
    try {
        const query =  await pool.query("SELECT * FROM items")
        res.json(query.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get singluar item
app.get('/api/individual/:id', async (req, res) => {
     try {
        const {id} = req.params
        const query = await pool.query("SELECT * FROM items WHERE itemid = $1", [id])
        res.json(query.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get breads
app.get('/api/breads', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM items WHERE itemtype = 4")
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get toppings
app.get('/api/toppings', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM items WHERE itemtype = 3 ")
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get cheese
app.get('/api/cheese', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM items WHERE itemtype = 2")
        res.json(query.rows)
        //res.send("Nothing here yet, here are some cats: ᓚᘏᗢ ᓚᘏᗢ")
    } catch (err) {
        console.log(err.message)
    }
})

//get kits
app.get('/api/kits', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM items WHERE itemtype = 1")
        res.json(query.rows)
        //res.send("Nothing here yet, here are some cats: ᓚᘏᗢ ᓚᘏᗢ")
    } catch (err) {
        console.log(err.message)
    }
})

//get item by name
app.get('/api/:name', async (req, res) => {
    try {
        const {name} = req.params
        const query = await pool.query("SELECT * FROM items WHERE name = $1", [name])
        res.json(query.rows)
    } catch (err) {
        console.log(err.message)
    }
})


app.listen(port, () => console.log(`Server running on port ${port}`))
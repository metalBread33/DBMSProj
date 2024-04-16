import express from 'express'
import pool from './database/data.js'
import cors from 'cors'


const port = 5000;

const app = express()
app.use(express.json())

app.use(cors())
//used to make sure api is up
app.get('/', (req,res) => {
    res.send('API is running ...')
})

//get all items
app.get('/api/individual', async (req, res) => {
    try {
        const query =  await pool.query("SELECT * FROM items ORDER BY itemid")
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
        const query = await pool.query("SELECT * FROM items WHERE itemtype = 3 ORDER BY itemid")
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

//get user info from email  
app.get('/api/user/:email', async (req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        res.send(query.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//register user
app.post('/api/user', async (req, res) => {
    try {
        const {email, username, password} = req.body
        const newUser = await pool.query("INSERT INTO users (email, username, password, admin) VALUES($1, $2, $3, FALSE) RETURNING *", [email, username, password]
        )
        res.send(newUser.rows)
    } catch (error) {
        console.error(error.message)
        res.send(error.message)
    }
})

app.post('/api/item', async(req, res) => {
    try {
        const {name, cals, carbs, fat, protein, na, cholesterol, itemtype, id, bh} = req.body
        const newItem = await pool.query("INSERT INTO items (name, cals, carbs, fat, protein, na, cholesterol, itemtype, itemid, bh) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [name, cals, carbs, fat, protein, na, cholesterol, itemtype, id, bh])
        res.send(newItem.rows)
    } catch (error) {
        res.send(error)
    }
})

app.put('/api/item', async (req, res) => {
   try {
    const {name, cals, carbs, fat, protein, na, cholesterol, itemtype, id, bh} = req.body
    const update = await pool.query("UPDATE items SET name = $1, cals = $2, carbs = $3, fat = $4, protein = $5, na = $6, cholesterol = $7, itemtype = $8, bh = $10 WHERE itemid=$9 RETURNING *",
        [name, cals, carbs, fat, protein, na, cholesterol, itemtype, id, bh])
    res.send(update.rows)
   } catch (error) {
    console.log(error);
    res.send(error)
   } 
})

app.delete('/api/item/:id', async (req, res) => {
    try {
        const {id} = req.params
        const query = pool.query("DELETE FROM items WHERE itemid = $1", [id])
        res.send(`Item number ${id} has been deleted`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/users', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM users")
        res.send(query.rows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.delete('/users/:email', async (req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query("DELETE FROM users WHERE email = $1", [email])
        res.send(`User with email ${email} has been deleted`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//get next avaliable id
app.get('/nextid', async (req, res) => {
    try {
        const result = await pool.query("SELECT MAX(itemid) FROM items;")
        const maxid = result.rows[0].max
        const nextid = maxid ? maxid+1 : 1
        res.send({nextid})
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))
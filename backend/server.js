import express from 'express'
import pool from './database/data.js'

const Pool = pool
const port = 5000;

const app = express()

app.get('/', (req,res) => {
    res.send('API is running ...')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
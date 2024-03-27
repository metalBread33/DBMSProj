import express from 'express'
import pool from './database/data.js'
import subkits from './database/temp.js';

const Pool = pool
const port = 5000;

const app = express()

app.get('/', (req,res) => {
    res.send('API is running ...')
})

app.get('/api/individual', (req, res) => {
    res.json(subkits)
})

app.get('/api/individual/:id', (req, res) => {
    const item = subkits.find((p) => p.id == req.params.id);
    if(!item)
         res.status(404).json({error: "item not found"})
    else
        res.json(item)
})

app.listen(port, () => console.log(`Server running on port ${port}`))
import dotenv from 'dotenv'
import pg from 'pg'
const {Pool} = pg
dotenv.config()

const pool = new Pool({
    user: process.env.PSQLNAME, 
    password: process.env.PSQLPWD,
    host: process.env.PSQLHOST,
    port: process.env.PSQLPORT,
    database: "dbmsproj"
})

export default pool
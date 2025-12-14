const pg = require('pg');
const createTablePlayers = require('./players');
const createNewsTable = require('./news');
const createMatchTable = require('./match');
const highlights = require('./highlight')
const createCoachTable = require('./coach')
const createLoginDb = require('./login')

const isProduction = process.env.NODE_ENV === "production"
const db = 
isProduction ?

new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
})
:
new pg.Client({
     user: process.env.DB_USER,
     host: process.env.DB_HOST,
     database: process.env.DATABASE,
     password: process.env.DB_PASSWORD,
     port: Number(process.env.DB_PORT)
})

db.connect()
.then(result=>{
    console.log("✅ connnected to db")
    createTablePlayers()
    createNewsTable()
    createMatchTable()
    highlights()
    createCoachTable()
    createLoginDb()
})
.catch(err=>{
    console.log(err)
})

module.exports = db;
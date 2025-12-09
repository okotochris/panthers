const express = require('express')
require('dotenv').config()
const db = require('./database/db')
const router = require('./routes/route')
const cors = require('cors')


app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=>{
    console.log(`App listening on ${PORT}`)
})
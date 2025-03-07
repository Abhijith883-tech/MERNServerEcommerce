require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require("./routes/router")
require('./database/dbConnection')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json()) 
pfServer.use(router)


const PORT = 3000 || process.env.PORT

pfServer.listen(PORT, () => {
    console.log(`Myyyy pfServer is running in port: ${PORT} and waiting for client request!!!`)
})

pfServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style="color:indigo;">Mmmmmmmmmmmmmmmmyy pfSerover iiiiiiiiiiiiiis running in port:${PORT} and waiting for client request!!!</h1>`)
})

pfServer.post('/',(req,res)=>{
    res.status(200).send("POST REQUESTTTTT")
})
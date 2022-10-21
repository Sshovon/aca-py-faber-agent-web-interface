const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const endpoint=process.env.ENDPOINT

app.use(express.json()); 
const connectionRoutes=require('./src/routes/connection')

app.use('/connection',connectionRoutes)

app.listen(port,()=>{
    console.log(`faber api is started on port ${port}`);
})
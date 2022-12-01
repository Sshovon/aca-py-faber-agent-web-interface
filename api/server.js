const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3001
const endpoint=process.env.ENDPOINT

app.use(express.json()); 
app.use(cors())
const connectionRoutes=require('./src/routes/connection')
const credentialRoutes = require('./src/routes/credentials')
const presentationRoutes = require('./src/routes/presentation')


app.use('/connection',connectionRoutes)
app.use('/credential',credentialRoutes)
app.use('/presentation',presentationRoutes);

app.listen(port,()=>{
    console.log(`faber api is started on port ${port}`);
})
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
const schemaRoutes = require('./src/routes/schema')

app.use('/connection',connectionRoutes)
app.use('/credential',credentialRoutes)
app.use('/presentation',presentationRoutes);
app.use('/schema',schemaRoutes)

app.post("/topic/*", async function (req, res, next) {
    try {
      // console.log(req.body);
      const offerRelatedState = [
        "offer_sent",
        "request_received",
        "credential_issued",
        "credential_acked",
      ];
      const proofRequestRelatedState = [
        "request_sent",
        "presentation_received",
        "verified",
      ];
      const conID = req.body["connection_id"];
      const conStatus = req.body["rfc23_state"];
      const requestState = req.body["state"] || "";
  
      if (conID) {
        if (conStatus === "completed") {
          console.log("Invitation Completed with conID:" + conID);
        }
        if (offerRelatedState.includes(requestState)) {
          console.log(requestState);
        }
        if (req.body["verified"] === "true") {
          console.log("Credential verified after proof request..:");
        }
      }  
      res.send({ result: "Good" });
    } catch (error) {
      console.log(error);
  
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

app.listen(port,()=>{
    console.log(`faber api is started on port ${port}`);
})
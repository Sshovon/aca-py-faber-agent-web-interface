const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3001;
const endpoint = process.env.ENDPOINT;
const { v1: uuidv1 } = require('uuid');

app.use(express.json());
app.use(cors());
const connectionRoutes = require("./src/routes/connection");
const credentialRoutes = require("./src/routes/credentials");
const presentationRoutes = require("./src/routes/presentation");
const schemaRoutes = require("./src/routes/schema");
const revocationRoutes=require('./src/routes/revocation')

app.use("/connection", connectionRoutes);
app.use("/credential", credentialRoutes);
app.use("/presentation", presentationRoutes);
app.use("/schema", schemaRoutes);
app.use('/revocation',revocationRoutes)



app.post("/topic/*", async function (req, res, next) {
  try {
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
    console.log(req.originalUrl)
    console.log(conID)
    if(req.originalUrl=='/topic/issuer_cred_rev/'){
      console.log(req.body)
    }

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
   
    res.send({result:"good"})
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.headers);
    console.log(JSON.stringify(req.body));
    res.set('content-type','application/didcomm-plain+json')
    const created_time=Date.now()
    const expires_time=24*60*60*1000+created_time
    res.send({
      "id": uuidv1(),
      "type": "https://didcomm.org/basicmessage/2.0/message",
      "lang": "en",
      "created_time": created_time,
      "body": {
          "content": "Your hovercraft is full of eels."
      }
  });
    // res.send({});
  } catch (e) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`faber api is started on port ${port}`);
});

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send-offer", async (req, res) => {
  try {
    const {name,bd:birthdate_dateint,subject:degree,cred_def_id,connection_id} = req.body
    const date=new Date().toLocaleDateString()
    const timestamp=Date.now().toString()

    const credBody={
      
        "auto_issue": true,
        "auto_remove": false,
        "comment": "Offer on cred def id Q5TdsnLGd1w8gNauPenLny:3:CL:154741:faber.agent.degree_schema",
        "connection_id": connection_id,
        "cred_def_id": cred_def_id,
        "credential_preview": {
          "@type": "https://didcomm.org/issue-credential/2.0/credential-preview",
          "attributes": [
            {
              "name": "name",
              "value": name
            },
            {
              "name": "date",
              "value": date
            },
            {
              "name": "degree",
              "value": degree
            },
            {
              "name": "birthdate_dateint",
              "value": birthdate_dateint
            },
            {
              "name": "timestamp",
              "value": timestamp
            }
          ]
        },
        "trace": true
      
    }
    console.log(credBody)
    console.log(credBody.credential_preview.attributes)
    const { data: response } = await axios.post(
      "http://127.0.0.0:8021/issue-credential/send-offer",
      credBody
    );
    res.status(200).send({response});
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});

router.get("/definations", async (req, res) => {
  try {
    const { data: response } = await axios.get(
      "http://127.0.0.0:8021/credential-definitions/created",
    );
    res.status(200).send(response);
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});
module.exports = router;

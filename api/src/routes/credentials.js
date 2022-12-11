const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send-offer", async (req, res) => {
  try {
    let {name,bd:birthdate_dateint,subject:degree,cred_def_id,connection_id} = req.body
    const date=new Date().toLocaleDateString()
    const timestamp=Date.now().toString()

    cred_def_id= "KgFTEMoLR8tdwrH1VtaHKv:3:CL:186498:bank_credential_definition"
    name = "Shovon"
    let account_number='2017331099'
    let national_id='2017331099'

    const credBody={
      
        "auto_issue": true,
        "auto_remove": false,
        "comment": "Offer on cred def id CBZ9A2QLLgr2E1RfwECwUf:3:CL:186482:bank_credential_definition",
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
              "name": "account_number",
              "value": account_number
            },
            {
              "name": "national_id",
              "value": national_id
            },
            // {
            //   "name": "date",
            //   "value": date
            // },
            // {
            //   "name": "degree",
            //   "value": degree
            // },
            // {
            //   "name": "birthdate_dateint",
            //   "value": birthdate_dateint
            // },
            // {
            //   "name": "timestamp",
            //   "value": timestamp
            // }
          ]
        },
        "trace": true
      
    }
    // console.log(credBody)
    // console.log(credBody.credential_preview.attributes)
    const { data: response } = await axios.post(
      "http://127.0.0.0:8021/issue-credential/send-offer",
      credBody
    );
    
    console.log(response)
    res.status(200).send({...response});
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(500 || statusCode).send({ message: error });
  }
});


// definitions list
router.get("/definations", async (req, res) => {
  try {
    const { data: response } = await axios.get(
      "http://127.0.0.0:8021/credential-definitions/created",
    );
    res.status(200).send(response);
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(500 || statusCode).send({ message: error });
  }
});
module.exports = router;

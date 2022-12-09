const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send-request", async (req, res) => {
  try {
    const { connection_id } = req.body;
    console.log(connection_id)
    // const cred_def = {
    //   proof_request: {
    //     name: "Proof of Education",
    //     version: "1.0",
    //     requested_attributes: {
    //       "0_name_uuid": {
    //         name: "name",
    //         restrictions: [
    //           {
    //             schema_name: "degree schema",
    //           },
    //         ],
    //       },
    //       "0_date_uuid": {
    //         name: "date",
    //         restrictions: [
    //           {
    //             schema_name: "degree schema",
    //           },
    //         ],
    //       },
    //       "0_degree_uuid": {
    //         name: "degree",
    //         restrictions: [
    //           {
    //             schema_name: "degree schema",
    //           },
    //         ],
    //       },
    //     },
    //     requested_predicates: {
    //       "0_birthdate_dateint_GE_uuid": {
    //         name: "birthdate_dateint",
    //         p_type: "<=",
    //         p_value: 20041022,
    //         restrictions: [
    //           {
    //             schema_name: "degree schema",
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   trace: false,
    //   connection_id,
    // };
    const bank_cred_def = {
      proof_request: {
        name: "Proof of BANK Credential",
        version: "1.0",
        requested_attributes: {
          "0_name_uuid": {
            name: "account_number",
            restrictions: [
              {
                schema_name: "bank_cred",
              },
            ],
          },
        },
        
      },
      trace: false,
      connection_id,
    };


    const { data: response } = await axios.post(
      "http://127.0.0.0:8021/present-proof/send-request",
      bank_cred_def
    );
    res.status(200).send(response);
  } catch (e) {
    const error = e.messsage;
    res.status(500).send({ message: error });
  }
});

module.exports = router;

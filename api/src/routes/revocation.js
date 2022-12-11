const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/credential-record", async (req, res) => {
  try {
    const { rev_reg_id, cred_rev_id, connection_id } = req.body;
    // const definations = { rev_reg_id, cred_rev_id };
    const { data: response } = await axios.get(
      `http://localhost:8021/revocation/credential-record?cred_rev_id=${cred_rev_id}&rev_reg_id=${rev_reg_id}`,
    );

    res.status(200).send({ ...response });
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(500 || statusCode).send({ message: error });
  }
});

// {
//     "comment": "comment",
//     "connection_id": "4c70c501-d23b-4fef-91ad-8aa49165c7dc",
//     "cred_rev_id": "1",
//     "publish": "Y",
//     "rev_reg_id": "CBZ9A2QLLgr2E1RfwECwUf:4:CBZ9A2QLLgr2E1RfwECwUf:3:CL:186482:bank_credential_definition:CL_ACCUM:e2836318-def2-491c-b80d-2237a65b579f"
//   }

router.post("/revoke", async (req, res) => {
  try {
    const { rev_reg_id, cred_rev_id, connection_id } = req.body;
    const definations = {
      rev_reg_id,
      cred_rev_id,
      connection_id,
      comment: "Reason of revocation",
      publish: "Y",
    };

    const { data: response } = await axios.post(
      `http://localhost:8021/revocation/revoke`,
      definations
    );

    res.status(200).send({ ...response });
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(500 || statusCode).send({ message: error });
  }
});

module.exports = router;

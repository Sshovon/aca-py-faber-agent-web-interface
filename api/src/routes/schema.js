const express = require("express");
const router = express.Router();
const axios = require("axios");

// credential schema will be stored on the Indy DLT ledger
router.get("/definition", async (req, res) => {
  try {
    const definition = {
      attributes: ["name", "account_number", "national_id"],
      schema_name: "bank_cred",
      schema_version: "1.0",
    };
    const { data: response } = await axios.post(
      `http://localhost:8021/schemas`,
      definition
    );
    const { schema_id } = response;

    const cred_def_body = {
      revocation_registry_size: 1000,
      schema_id,
      support_revocation: true,
      tag: "bank_credential_definition",
    };
    const { data: response_cred } = await axios.post(
      `http://localhost:8021/credential-definitions`,
      cred_def_body
    );
    const { credential_definition_id } = response_cred;

    res.status(200).send({ credential_definition_id, ...response, ...response_cred });
  } catch (e) {
    const error = e.messsage;
    // const statusCode = e.statusCode;
    res.status(500).send({ message: error });
  }
});

module.exports = router;

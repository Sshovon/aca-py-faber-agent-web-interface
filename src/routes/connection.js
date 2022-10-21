const express = require("express");
const router = express.Router();
const axios = require("axios");
const QRCode = require("qrcode");

router.post("/invitation", async (req, res) => {
  try {
    const { data: response } = await axios.post(
      "http://127.0.0.0:8021/connections/create-invitation",
      {}
    );
    const invitationUrl = response.invitation_url;
    QRCode.toDataURL(invitationUrl, function (err, url) {
      res.status(200).send({
        connection_id: response.connection_id,
        invitation_url: invitationUrl,
        qr: url,
      });
    });
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});


router.get("/list", async (req, res) => {
  try {
    const { data: response } = await axios.get(
      "http://127.0.0.0:8021/connections"
    );
    const {results:list} = response
    res.status(200).send(list);

  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});

module.exports = router;

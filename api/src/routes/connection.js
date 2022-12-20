const express = require("express");
const router = express.Router();
const axios = require("axios");
const QRCode = require("qrcode");

router.get("/invitation", async (req, res) => {
  try {
    const { data: response } = await axios.post(
      "http://127.0.0.0:8021/connections/create-invitation",
      {
       "my_label": "Bank"
      }
    );
    const invitationUrl = response.invitation_url;
    QRCode.toDataURL(invitationUrl, function (err, url) {
      res.status(200).send({
        ...response,
        qr: url,
      });
    });
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const id=req.params.id
    const { data: response } = await axios.get(
      `http://127.0.0.0:8021/connections/${id}`
    );
    // const { results: list } = response;
    res.status(200).send(response);
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
    const { results: list } = response;
    // console.log(response)
    res.status(200).send(list);
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(500||statusCode).send({ message: error });
  }
});

router.post("/:conn_id/send-message", async (req, res) => {
  try {
    const { content } = req.body;
    const { data: response } = await axios.post(
      `http://127.0.0.0:8021/connections/${req.params.conn_id}/send-message`,
      {
        content,
      }
    );
    res.status(200).send(response);
  } catch (e) {
    const error = e.messsage;
    const statusCode = e.statusCode;
    res.status(statusCode).send({ message: error });
  }
});

module.exports = router;

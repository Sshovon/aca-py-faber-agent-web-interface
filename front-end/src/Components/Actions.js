import React, { useState } from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import IssueCredential from "./IssueCredential";
import axios from "axios";
import { toast } from "react-hot-toast";
import Message from "./Message";

function Actions({ connection_id }) {
  const [showIssueCred, setShowIssueCred] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const issueCred = async (name, bd, subject) => {
    const loadingToast = toast.loading("Issuing credential, stay with us...");
    const { data } = await axios.get(
      "http://localhost:3001/credential/definations"
    );
    const cred_def_id = data.credential_definition_ids[0];
    const info = { name, bd, subject, cred_def_id, connection_id };
    await axios.post("http://localhost:3001/credential/send-offer", info);
    toast.dismiss(loadingToast);
    toast.success("Credential Issued Succesfully.");
    setShowIssueCred(!showIssueCred);
  };

  const sendProofReq = async (connection_id) => {
    setShowIssueCred(false);
    const loadingToast = toast.loading("Sending proof request...");
    await axios.post("http://localhost:3001/presentation/send-request", {
      connection_id,
    });
    toast.dismiss(loadingToast);
    toast.success("Proof request sent.");
  };

  const sendMessage = async (msg) => {
    setShowMsg(!showMsg);
    const loadingToast = toast.loading("Sending message...");
    await axios.post(`http://localhost:3001/connection/${connection_id}/send-message`, {
      content: msg,
    });
    toast.dismiss(loadingToast);
    toast.success("Message sent successfully.");
  };
  return (
    <div>
      <Button
        onClick={() => {
          setShowIssueCred(!showIssueCred);
        }}
      >
        <CreditScoreIcon color="success" /> Issue Credential
      </Button>

      <Button
        onClick={() => {
          setShowIssueCred(false);
          sendProofReq(connection_id);
        }}
      >
        <AssignmentIcon color="success" /> Send Proof Request
      </Button>
      <Button
        onClick={() => {
          setShowIssueCred(false);
          setShowMsg(!showMsg);
        }}
      >
        <MessageIcon color="success" /> Send Message
      </Button>
      {showIssueCred && <IssueCredential issueCred={issueCred} />}
      {showMsg && (
        <Message sendMessage={sendMessage}/>
      )}
    </div>
  );
}

export default Actions;

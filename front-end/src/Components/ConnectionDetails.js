import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import { Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import Actions from "./Actions";

function ConnectionDetails({ d }) {
  const [showActions, setShowActions] = useState(false);
  const [connection_id,setConnectionID]=useState(d.connection_id);
  
  return (
    <>
      <Card>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center ",
          }}
        >
          <p style={{margin:"5px"}}>
            <b>Invitee Lable: </b> {d.their_label}
          </p>
          <p style={{margin:"5px"}}>
            <b>Invitee DID: </b> {d.their_did}
          </p>
          <p style={{margin:"5px"}}>
            <b>Invitation Status: </b> {d.rfc23_state}
          </p>
          <p style={{margin:"5px"}}>
            <b>Connection State: </b>
            {d.state}{" "}
            {d.state === "active" ? (
              <CheckCircleRoundedIcon fontSize="small" color="success" />
            ) : (
              <PendingRoundedIcon fontSize="small" color="primary" />
            )}
          </p>
        </CardContent>
        {showActions && <Actions connection_id={connection_id}/>}
        {d.state === "active"  && (
          <Button color="secondary" style={{ marginBottom: "10px" }} onClick={()=>{setShowActions(!showActions)}}>
            {showActions? "Hide Actions" : "Show Actions"}
          </Button>
        )}
      </Card>
    </>
  );
}

export default ConnectionDetails;

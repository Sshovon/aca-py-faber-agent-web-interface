import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import ReplayTwoToneIcon from "@mui/icons-material/ReplayTwoTone";
import { Button } from "@mui/material";
import ConnectionDetails from "./ConnectionDetails";

function Connection({ connectionList, fetchConnections }) {
  const [showActions, setShowActions] = useState(false);
  return (
    <>
      <Card>
        <Button onClick={fetchConnections}>
          <ReplayTwoToneIcon fontSize={"medium"} color={"action"} />
        </Button>
        <CardContent>
          {connectionList.map((d) => (
            <ConnectionDetails d={d}/>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default Connection;

import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import StyledTitle from "./StyledComponents/title";
import StyledContainer from "./StyledComponents/container";
import axios from "axios";
import QrImage from "./QrImage";
import toast, { Toaster } from "react-hot-toast";
import Connection from "./Connections";

function Faber() {
  const [qrImg, setQrImg] = useState("");
  const [invitationCode, setICode] = useState("");
  const [connectionList, setConnectionList] = useState([]);

  const getQr = async () => {
    const { data } = await axios.get(
      "http://localhost:3001/connection/invitation"
    );
    const { qr } = data;
    const { invitation_url } = data;
    setQrImg(qr);
    setICode(invitation_url);
  };
  const fetchQrInfo = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Fetching information from Faber...");
    await getQr();
    toast.dismiss(loadingToast);
    toast.success("Information fetched successfully");
  };
  const fetchConnections = async () => {
    const { data } = await axios.get("http://localhost:3001/connection/list");
    setConnectionList(data);
  };
  useEffect(() => {
    fetchConnections();
  }, [qrImg]);
  return (
    <div>
      <StyledContainer>
        <StyledTitle>Faber Agent</StyledTitle>
        <Card>
          <CardContent>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button variant="contained" onClick={fetchQrInfo}>
                Generate New Invitation QR Code
              </Button>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              {qrImg ? (
                <>
                  <QrImage qrImg={qrImg} invitationCode={invitationCode} />
                </>
              ) : null}
            </Grid>
          </CardContent>
        </Card>

        <h3>Connections</h3>
        
        <Connection connectionList={connectionList} fetchConnections={fetchConnections}/>
      </StyledContainer>
    </div>
  );
}

export default Faber;

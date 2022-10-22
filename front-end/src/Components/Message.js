import { Button, TextField } from "@mui/material";
import React from "react";

function Message({ sendMessage }) {
  const [msg, setMsg] = React.useState("");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        id="standard-basic"
        label="Enter Your Message"
        variant="standard"
        required
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <Button color={"success"} onClick={()=>{
            sendMessage(msg)
            setMsg("")
        }}>Send</Button>
    </div>
  );
}

export default Message;

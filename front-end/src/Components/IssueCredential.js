import { Button, TextField } from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function IssueCredential({issueCred}) {
  const [name, setName] = React.useState("");
  const [bd, setBd] = React.useState("");
  const [subject,setSubject]=React.useState("math")

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl>
        <TextField
          id="standard-basic"
          label="Enter Name"
          variant="standard"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Birthday eg.19990923"
          variant="standard"
          required
          value={bd}
          onChange={(e) => {
            setBd(e.target.value);
          }}
        />
        <FormLabel
          id="demo-row-radio-buttons-group-label"
          style={{ marginTop: "25px" }}
        >
          Select Degree
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={subject}
          onChange={(e)=>{
            setSubject(e.target.value)
          }}
        >
          <FormControlLabel
            value="physics"
            control={<Radio />}
            label="Physics"
          />
          <FormControlLabel value="math" control={<Radio />} label="Math" />
          <FormControlLabel
            value="chemisty"
            control={<Radio />}
            label="Chemistry"
          />
        </RadioGroup>
        <Button color={"success"} onClick={()=>{
            issueCred(name,bd,subject)
            setName("")
            setBd("")
        }}>Submit</Button>
      </FormControl>
    </div>
  );
}

export default IssueCredential;

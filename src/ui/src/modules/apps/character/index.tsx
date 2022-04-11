import { useState } from "react";
import "./index.scss";

import Button from "@Components/Button";
import { useAppEvent, useApplication } from "@services/useEvent";
import Rebirth from "@assets/rebirth.png";
import mugshot from "@assets/mugshot.jpg";
import { connect } from "react-redux";

import { currencyFormatter } from "@/lib/utils";

import Box from "@mui/system/Box";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DatePicker from "@mui/lab/DatePicker";

import axios from "axios";

const Character = ({ visible, characters, setVisible, setCharacters }) => {
  const [state, setState] = useState("character");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  function getCharacterNet(character: { accounts: any[] }) {
    let net = 0;
    character.accounts.forEach((account: any) => {
      net += account.Balance;
    });
    return net;
  }

  const handleClose = async (status: boolean) => {
    setOpen(false);
    if (status) {
      const arr = [];
      characters.map((character: any) => {
        if (character.ssn !== selectedChar.ssn) arr.push(character);
      });
      setCharacters(arr);
      axios
        .post("https://Rebirth/character/delete", {
          ssn: selectedChar.ssn,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  function createCharacter() {
    axios
      .post("https://Rebirth/character/create", {
        fn: newCharData.fn,
        ln: newCharData.ln,
        dob: newCharData.dob,
        gender: newCharData.gender,
      })
      .then((res) => {
        console.log(JSON.stringify(res));
      });
  }

  const [selectedChar, setSelectedChar] = useState(null);

  const handleOpen = (character: any) => {
    setSelectedChar(character);
    setOpen(true);
  };

  function selectCharacter(character: any) {
    axios.post("https://Rebirth/character/select", {
      ssn: character.ssn,
    });
    // setState("spawn");
  }

  const [newCharData, setNewCharData] = useState({
    fn: "",
    ln: "",
    dob: new Date(),
    gender: "1",
  });
  const [errors, setErrors] = useState({});

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setNewCharData({
      ...newCharData,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleGender = (event: SelectChangeEvent) => {
    setNewCharData({
      ...newCharData,
      ["gender"]: event.target.value as string,
    });
  };

  const validate: any = (fieldValues = newCharData) => {
    let temp: any = { ...errors };

    if ("fn" in fieldValues)
      temp.fn = fieldValues.fn ? "" : "This field is required.";
    if ("ln" in fieldValues)
      temp.ln = fieldValues.ln ? "" : "This field is required.";
    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender ? "" : "This field is required.";
    if ("dob" in fieldValues)
      temp.dob = fieldValues.dob ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
  };

  const formIsValid = (fieldValues = newCharData) => {
    const isValid =
      fieldValues.fn &&
      fieldValues.ln &&
      fieldValues.gender &&
      fieldValues.dob &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  useApplication("character", (status: boolean, data: any) => {
    setVisible(status);
  });
  useAppEvent("character", "setCharacters", (characters: any) => {
    setCharacters(characters);
  });
  useAppEvent("character", "ERROR", () => {
    setErrors({
      ...errors,
      ln: "Last name is Taken",
    });
  });
  useAppEvent("character", "SUCCESS", (character: any) => {
    setCharacters([...characters, character]);
    setOpen2(false);
  });

  return (
    visible && (
      <Box
        sx={{ width: "100vw", height: "100vh" }}
        className="UI_CHARACTER_CONTAINER"
      >
        <img className="UI_CHARACTER_IMG" src={Rebirth} loading="lazy" alt="" />
        <Slide in={state === "start"} direction="right">
          <Box sx={{ width: "100%", height: "100%" }}>
            A
            <div className="UI_CHARACTER_TITLE">
              Rebirth <div className="BLOCK">Networks</div>
            </div>
          </Box>
        </Slide>
        <Slide in={state === "start"} direction="left">
          <Box className="UI_CHARACTER_BUTTON">
            <Button
              onClick={() => setState("character")}
              sx={{ fontSize: "26px", padding: "16px 32px" }}
            >
              Play
            </Button>
          </Box>
        </Slide>
        <Slide in={state === "character"} direction="up">
          <Box className="UI_CHARACTER_CHARACTERS">
            {characters.map((character: any, index: any) => (
              <div key={index} className="CHARACTER">
                <img
                  src={character.mugshot || mugshot}
                  alt=""
                  className="CHARACTER_MUGSHOT"
                />
                <div className="CHARACTER_NAME">{`${character.fn} ${character.ln}`}</div>
                <table className="CHARACTER_INFO">
                  <tbody>
                    <tr>
                      <td>SSN: {character.ssn}</td>
                    </tr>
                    <tr>
                      <td>DOB: {character.dob}</td>
                    </tr>
                    <tr>
                      <td>Gender: {character.gender}</td>
                    </tr>
                    <tr>
                      <td>Phone Number: {character.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Email: {character.email}</td>
                    </tr>
                    <tr>
                      <td>
                        Net Worth:{" "}
                        {currencyFormatter(getCharacterNet(character))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="CHARACTER_BUTTONS">
                  <Button
                    onClick={() => handleOpen(character)}
                    sx={{ fontSize: "16px", padding: "0px 24px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => selectCharacter(character)}
                    sx={{ fontSize: "16px", padding: "0px 24px" }}
                  >
                    Play
                  </Button>
                </div>
              </div>
            ))}
          </Box>
        </Slide>
        <Slide in={state === "character"} direction="left">
          <div className="UI_CHARACTER_BUTTONS">
            <Button onClick={() => setState("start")}>Back</Button>
            <Button onClick={() => setOpen2(true)}>New Character</Button>
          </div>
        </Slide>
        {/* <Slide in={state === "spawn"} direction="up">
                        <img className="UI_CHARACTER_SPAWN" src="http://assets.sbnation.com/assets/2711231/grand-theft-auto-V-map.jpg" alt="" />
                </Slide> */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you wish to delete {selectedChar?.fn.toUpperCase()}{" "}
              {selectedChar?.ln.toUpperCase()}? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose(false)}
              sx={{
                fontSize: "16px",
                padding: "12px 26px",
                transform: "skew(0deg)",
              }}
            >
              Cancel
            </Button>
            <Button
              autoFocus
              onClick={() => handleClose(true)}
              sx={{
                fontSize: "16px",
                padding: "12px 26px",
                transform: "skew(0deg)",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open2}
          onClose={() => setOpen2(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">New Character</DialogTitle>
          <DialogContent>
            <form>
              <div style={{ display: "flex", columnGap: "15px" }}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="fn"
                  label="First Name"
                  type="text"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  autoComplete="none"
                  {...(errors["fn"] && {
                    error: true,
                    helperText: errors["fn"],
                  })}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="ln"
                  label="Last Name"
                  type="text"
                  onBlur={handleInputValue}
                  onChange={handleInputValue}
                  autoComplete="none"
                  {...(errors["ln"] && {
                    error: true,
                    helperText: errors["ln"],
                  })}
                  fullWidth
                  variant="standard"
                />
              </div>
              <InputLabel id="CHARACTER_GENDER_LABEL">Gender</InputLabel>
              <Select
                sx={{ marginBottom: "25px" }}
                labelId="CHARACTER_GENDER_LABEL"
                margin="dense"
                id="demo-simple-select"
                value={newCharData.gender}
                label="Age"
                {...(errors["dob"] && {
                  error: true,
                  helperText: errors["dob"],
                })}
                variant="standard"
                fullWidth
                onChange={handleGender}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
              <DatePicker
                views={["year", "month", "day"]}
                label="Date of Birth"
                value={newCharData.dob}
                onChange={(value) => {
                  setNewCharData({ ...newCharData, dob: value });
                }}
                {...(errors["dob"] && {
                  error: true,
                  helperText: errors["dob"],
                })}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen2(false)}
              sx={{
                fontSize: "16px",
                padding: "12px 26px",
                transform: "skew(0deg)",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createCharacter()}
              disabled={!formIsValid()}
              sx={{
                fontSize: "16px",
                padding: "12px 26px",
                transform: "skew(0deg)",
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  );
};

const mapStateToProps = (state: any) => ({
  visible: state.character.visible,
  characters: state.character.characters,
});

const mapDispatchToProps = (dispatch: any) => ({
  setVisible: (visible: boolean) =>
    dispatch({ type: "SET_CHARACTER_STORE_VISIBILITY", visible }),
  setCharacters: (characters: boolean) =>
    dispatch({ type: "SET_CHARACTER_STORE_CHARACTERS", characters }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);

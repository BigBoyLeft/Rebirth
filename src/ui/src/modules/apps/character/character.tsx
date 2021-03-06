// [ [ Styles ] ]

import Styles from "./character.module.scss";
import Components from "@modules/Components/Components.module.scss";

// [ [ Other[s] ] Imports ]

import { useState } from "react";

// [ [ UI ] Stores ]

import { setPlayerData } from "@/modules/root.store";
import { useAppSelector, useAppDispatch } from "@hooks/store";

// [ [ Rebirth ] Tools ]

import {
  useAction,
  useApplication,
  debugEvent,
  makeRequest,
  debugRequest,
} from "@/services/nuiUtils";
import Button from "@modules/Components/Button";
import { isDate } from "@/lib/utils";


// [ [ Rebirth ] Assets ]

import mugshot from "@assets/mugshot.png";
import Logo from "@assets/rebirth.png";

// [ [ Mui ] Components ]

import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "@mui/lab/DatePicker";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Slide from "@mui/material/Slide";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

// [ [ Mui ] Icons ]

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Fade } from "@mui/material";

// debugEvent(100, "application", "character", {
//   visible: true,
//   characters: [
//     {
//       ssn: "103988718",
//       fn: "John",
//       ln: "Doe",
//       dob: new Date(),
//       gender: "male",
//       phoneNumber: "7072075995",
//       email: "johndoe@rebirth.city",
//       mugshot:
//         "https://forum.cfx.re/uploads/default/original/3X/8/3/8305f70437ebd0981c943a872b657dce21fa318a.jpeg",
//     },
//     {
//       ssn: "039871823",
//       fn: "Carter",
//       ln: "Zamgato",
//       dob: new Date(),
//       gender: "male",
//       phoneNumber: "7072075995",
//       email: "johndoe@rebirth.city",
//     },
//     {
//       ssn: "019394851",
//       fn: "John",
//       ln: "Doe",
//       dob: new Date(),
//       gender: "male",
//       phoneNumber: "7072075995",
//       email: "johndoe@rebirth.city",
//     },
//   ],
// });

debugRequest("https://Rebirth/api/character/login", (data: any) => {
  return { success: true };
});
debugRequest("https://Rebirth/api/character/delete", (data: any) => {
  return { error: false };
});
debugRequest("https://Rebirth/api/character/create", (data: any) => {
  var ssn = (Math.floor(Math.random() * 900000000) + 100000000).toString();
  return {
    ssn: ssn,
    fn: data.fn,
    ln: data.ln,
    dob: data.dob,
    gender: data.gender,
    phoneNumber: ssn + Math.floor(Math.random() * 9) + 1,
    email: data.fn + data.ln + "@rebirth.city",
  };
});

function CharacterSelector() {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [state, setState] = useState("entry");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [newCharacter, setNewCharacter] = useState({
    fn: "",
    ln: "",
    dob: new Date(),
    gender: "1",
  });

  const [newCharacterDialog, setNewCharacterDialog] = useState(false);
  const [deleteCharacterDialog, setDeleteCharacterDialog] = useState(false);

  useApplication("character", (data: any) => {
    setVisible(data.visible);
    if (data.characters) setCharacters(data.characters);
  });

  function attemptLogin(index: number) {
    let character = characters[index];
    if (!character) return;

    makeRequest("https://Rebirth/api/character/login", {
      ssn: character.ssn,
    }).then((data: any) => {
      if (data.data.error) {
        // notify with [ data.data.message ]
      }
      dispatch(setPlayerData(character))
      makeRequest("https://Rebirth/api/ui/focus", { focus: false });
      setState("entry");
      setSelectedCharacter(null);
    });
  }

  const [waiting, setWaiting] = useState(false);
  function attemptCreateCharacter() {
    if (errors && errors.length > 0) return;
    if (newCharacter.fn.length < 1) return;
    if (newCharacter.ln.length < 1) return;

    setWaiting(true);
    makeRequest("https://Rebirth/api/character/create", {
      fn: newCharacter.fn,
      ln: newCharacter.ln,
      dob: newCharacter.dob,
      gender: newCharacter.gender,
    }).then((data: any) => {
      if (data.data?.error) {
        // notify with [ data.data.message ]
      }
      setCharacters([...characters, data.data]);
      setNewCharacterDialog(false);
      setWaiting(false);
    });
  }

  function attemptDeleteCharacter(index: number) {
    let character = characters[index];
    if (!character) return;

    makeRequest("https://Rebirth/api/character/delete", {
      ssn: character.ssn,
    }).then((data: any) => {
      if (data.data.error) {
        // notify with [ data.data.message ]
      }
      setSelectedCharacter(null);
      setCharacters(characters.filter((c) => c.ssn !== character.ssn));
    });
  }

  const [errors, setErrors]: any = useState({});
  function validate(value: string) {
    let temp: any = { ...errors };

    if (value === "fn" && "fn" in newCharacter)
      temp.fn = newCharacter.fn ? "" : "First name is required";
    if (value === "ln" && "ln" in newCharacter)
      temp.ln = newCharacter.ln ? "" : "Last name is required";
    if (value === "dob" && "dob" in newCharacter) {
      temp.dob = isDate(newCharacter.dob) ? "" : "Date of birth is required";
    }
    if (value === "gender" && "gender" in newCharacter)
      temp.gender = newCharacter.gender ? "" : "Gender is required";

    setErrors({
      ...temp,
    });
  }

  const handleNewCharacterInput = (event: any) => {
    const { name, value } = event.target;

    setNewCharacter({
      ...newCharacter,
      [name]: value,
    });
    validate(name);
  };

  const formIsValid = () => {
    const isValid =
      newCharacter.fn &&
      newCharacter.ln &&
      newCharacter.gender &&
      newCharacter.dob &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return (
    <Fade in={visible} unmountOnExit mountOnEnter>
      <div className={Styles.UI_Character}>
        <Slide
          direction="down"
          in={state === "entry"}
          unmountOnExit
          mountOnEnter
        >
          <div className={Styles.UI_Character_Logo}>
            <img src={Logo} alt="Rebirth" />
          </div>
        </Slide>
        <Grow in={state === "entry"}>
          <div className={Styles.UI_Character_Title_Container}>
            <div className={Styles.UI_Character_Title}>
              Rebirth <div>RP</div>
            </div>
          </div>
        </Grow>
        <Grow in={state === "entry"} unmountOnExit mountOnEnter>
          <div className={Styles.UI_Character_Button}>
            <Button
              onClick={() =>
                setState(state === "entry" ? "characters" : "entry")
              }
              sx={{ fontSize: "25px" }}
            >
              Start
              <ArrowForwardIcon />
            </Button>
          </div>
        </Grow>
        <Slide
          direction="up"
          in={state === "characters"}
          unmountOnExit
          mountOnEnter
        >
          <div className={Styles.UI_Character_Select}>
            <Grow in={state === "characters"}>
              <div className={Styles.UI_Character_Select_Wrapper}>
                {characters.map((character: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCharacter(index)}
                    className={`${Styles.Item} ${
                      selectedCharacter === index ? Styles.active : ""
                    }`}
                  >
                    <img
                      className={Styles.mugshot}
                      src={
                        character.mugshot || character.profilePicture || mugshot
                      }
                      alt="mugshot"
                    />
                    <TextField
                      sx={{ marginTop: "15px" }}
                      label="Name"
                      InputProps={{ readOnly: true }}
                      value={character.fn + " " + character.ln}
                      fullWidth
                    />
                    <TextField
                      sx={{ marginTop: "15px" }}
                      label="Social Security Number (SSN)"
                      InputProps={{ readOnly: true }}
                      value={character.ssn}
                      fullWidth
                    />
                    <TextField
                      sx={{ marginTop: "15px" }}
                      label="Name"
                      InputProps={{ readOnly: true }}
                      value={new Date(character.dob).toLocaleDateString()}
                      fullWidth
                    />
                    <TextField
                      sx={{ marginTop: "15px" }}
                      label="Name"
                      InputProps={{ readOnly: true }}
                      value={character.gender}
                      fullWidth
                    />
                    <TextField
                      sx={{ marginTop: "15px" }}
                      label="Name"
                      InputProps={{ readOnly: true }}
                      value={character.phoneNumber}
                      fullWidth
                    />
                    <TextField
                      sx={{ marginTop: "15px", width: "100%" }}
                      label="Name"
                      InputProps={{ readOnly: true }}
                      value={character.email}
                      fullWidth
                    />
                  </div>
                ))}
              </div>
            </Grow>
            <div className={Styles.UI_Character_Select_Buttons}>
              <Button
                onClick={() => {
                  setState(state === "entry" ? "characters" : "entry");
                  setSelectedCharacter(null);
                }}
                className={Styles.UI_Character_Select_Button}
                sx={{ fontSize: "20px" }}
              >
                <ArrowBackIcon />
                Back
              </Button>
              <Button
                onClick={() => setNewCharacterDialog(true)}
                className={Styles.UI_Character_Select_Button}
                sx={{ fontSize: "20px" }}
                disabled={characters.length >= 5}
              >
                Create
                <PersonAddAlt1Icon />
              </Button>
              <Button
                onClick={() => attemptDeleteCharacter(selectedCharacter)}
                className={Styles.UI_Character_Select_Button}
                sx={{ fontSize: "20px" }}
                disabled={selectedCharacter === null}
              >
                <PersonRemoveIcon />
                Delete
              </Button>
              <Button
                onClick={() => attemptLogin(selectedCharacter)}
                className={Styles.UI_Character_Select_Button}
                sx={{ fontSize: "20px" }}
                disabled={selectedCharacter === null}
              >
                Play
                <ArrowForwardIcon />
              </Button>
            </div>
          </div>
        </Slide>
        <Dialog
          open={newCharacterDialog}
          onClose={() => {
            setNewCharacterDialog(false);
            setNewCharacter({
              fn: "",
              ln: "",
              dob: new Date(),
              gender: "1",
            });
          }}
          PaperProps={{
            style: {
              background: "#0d0c0c",
            },
          }}
        >
          <DialogTitle>New Character</DialogTitle>
          <DialogContent>
            <form>
              <div
                style={{
                  display: "flex",
                  columnGap: "15px",
                  marginBottom: "15px",
                  overflow: "visible !important",
                }}
              >
                <TextField
                  autoFocus
                  name="fn"
                  label="First Name"
                  type="text"
                  autoComplete="none"
                  fullWidth
                  variant="outlined"
                  onChange={handleNewCharacterInput}
                  onBlur={handleNewCharacterInput}
                  {...(errors["fn"] && {
                    error: true,
                    helperText: errors["fn"],
                  })}
                />
                <TextField
                  name="ln"
                  label="Last Name"
                  type="text"
                  autoComplete="none"
                  fullWidth
                  variant="outlined"
                  onChange={handleNewCharacterInput}
                  onBlur={handleNewCharacterInput}
                  {...(errors["ln"] && {
                    error: true,
                    helperText: errors["ln"],
                  })}
                />
              </div>
              <FormControl style={{ marginBottom: "15px" }} fullWidth>
                <InputLabel variant="outlined" id="CHARACTER_GENDER">
                  Gender
                </InputLabel>
                <Select
                  labelId="CHARACTER_GENDER"
                  id="demo-simple-select"
                  value={newCharacter.gender}
                  label="Gender"
                  variant="outlined"
                  onChange={(event: any) => {
                    setNewCharacter({
                      ...newCharacter,
                      gender: event.target.value,
                    });
                    validate("gender");
                  }}
                  {...(errors["gender"] && {
                    error: true,
                    helperText: errors["gender"],
                  })}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              </FormControl>
              <div style={{ display: "flex", columnGap: "15px" }}>
                <DatePicker
                  views={["year", "month", "day"]}
                  label="Date of Birth"
                  value={newCharacter.dob || null}
                  onChange={(date: any) => {
                    setNewCharacter({ ...newCharacter, dob: date });
                    validate("dob");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <LoadingButton
                  sx={{
                    width: "50%",
                    fontSize: "20px",
                  }}
                  disabled={!formIsValid()}
                  onClick={attemptCreateCharacter}
                  loading={waiting}
                  loadingIndicator={<CircularProgress size={30} />}
                  variant="contained"
                >
                  Create
                </LoadingButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Fade>
  );
}

export default CharacterSelector;

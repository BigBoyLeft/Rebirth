import { useState } from "react";

// [ [ Phone ] Styles ]

import Styles from "./phone.module.scss";

// [ [ Phone ] Stores ]

import {
  useAction,
  useApplication,
  debugEvent,
  makeRequest,
} from "@/services/nuiUtils";

import {
  type,
  setType,
  background,
  setBackground,
  time,
  setTime,
  battery,
  setBattery,
  signal,
  setSignal,
} from "./phone.store";

// [ [ Phone ] Components ]

import Apps from "./components/phone.apps";

/// [ [ @mui ] Components ]

import { Slide, Fade } from "@mui/material";

// debugEvent(100, "application", "Phone", {
//   visible: true,
// });

const Phone = () => {
  const [visible, setVisible] = useState(false);

  useApplication("Phone", (data) => {
    setVisible(data.visible);
  });

  return (
    <Slide in={visible} unmountOnExit mountOnEnter direction="up">
      <div className={Styles.Phone_Container}>
        <div className={Styles.sleep} />
        <div className={Styles.volume} />
        <div className={Styles.notch}>
          <div className={Styles.camera} />
          <div className={Styles.speaker} />
        </div>
        <div className={Styles.screen}>
          <Apps />
        </div>
      </div>
    </Slide>
  );
};

export default Phone;

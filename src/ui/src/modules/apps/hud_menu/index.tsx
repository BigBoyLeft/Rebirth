import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import {
  debugEvent,
  useAction,
  useApplication,
  makeRequest,
} from "@/services/nuiUtils";
import Circle from "../hud/Components/circle";
import Square from "../hud/Components/square";

import Icon from "@mui/material/Icon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import ProgressBar from "progressbar.js";
import RadioGroup from "@mui/material/RadioGroup";

import { useExitListener } from "@/hooks/useExitListener";

const HudMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(
    localStorage.getItem("hud-style") || "circle"
  );

  function setStyle(style: string) {
    setSelected(style);
    localStorage.setItem("hud-style", style);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({
          type: "action",
          app: "hud",
          data: {},
          action: "refreshTheme",
        }),
      })
    );
  }

  useExitListener(() => {
    setVisible(false);
    makeRequest("https://Rebirth/api/hud_menu/hide", {});
  });

  useEffect(() => {
    if (visible) {
      new ProgressBar.Path("#hud-element1", {
        easing: "easeInOut",
        duration: 1400,
      }).animate(0.5);
      new ProgressBar.Path("#hud-element2", {
        easing: "easeInOut",
        duration: 1400,
      }).animate(0.525);
    }
  }, [visible]);

  useApplication("hud_menu", (data: any) => {
    setVisible(data.visible);
  });

  useAction("hud_menu", "setStyle", (data: any) => {
    console.log("tews");
    if (!data.style || data.style !== "circle" || data.style !== "square")
      data.style === "circle";

    setStyle(data.style);
  });

  return (
    <Fade in={visible} unmountOnExit mountOnEnter>
      <div className={Styles.Menu_Container}>
        <div className={Styles.Title}>Hud Settings</div>
        <div className={Styles.Menu_Wrapper}>
          <div className={Styles.Menu_Item}>
            <div className={Styles.Menu_Title}>Circle</div>
            <div
              style={{ borderRadius: "50%" }}
              className={Styles.Menu_Element}
            >
              <div
                className="UI_Hud_ProgressBar"
                style={{ width: "120px", borderRadius: "50%" }}
              >
                <Icon sx={{ color: "#d32f2f" }}>favorite</Icon>
                <Circle color="#d32f2f" index="element1" />
              </div>
            </div>
            <Radio
              onClick={() => setStyle("circle")}
              checked={selected === "circle"}
            />
          </div>
          <div className={Styles.Menu_Item}>
            <div className={Styles.Menu_Title}>Square</div>
            <div className={Styles.Menu_Element}>
              <div className="UI_Hud_ProgressBar" style={{ width: "120px" }}>
                <Icon sx={{ color: "#d32f2f" }}>favorite</Icon>
                <Square color="#d32f2f" index="element2" />
              </div>
            </div>
            <Radio
              onClick={() => setStyle("square")}
              checked={selected === "square"}
            />
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default HudMenu;

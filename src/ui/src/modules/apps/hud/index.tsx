import React, { useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";

import { useAction, useApplication } from "@/services/nuiUtils";

import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Fade from "@mui/material/Fade";

import ProgressBar from "progressbar.js";
let progressBars = {};

const Hud = ({ vehicle, data, setVehicle, setData }) => {
  const [visible, setVisible] = useState(true);
  const [idk, setIdk] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [fuel, setFuel] = useState(25);

  useApplication("hud", (data: any) => {
    setVisible(data.visible);
  });
  useAction("hud", "setVehicle", (data: any) => {
    setVehicle(data.status);
  });
  useAction("hud", "setValue", (Edata: { key: string; value: number }) => {
    setData({
      ...data,
      [Edata.key]: {
        ...data[Edata.key],
        value: Edata.value,
      },
    });
    setIdk(!idk);
  });

  useEffect(() => {
    for (let i in data) {
      progressBars[i] = new ProgressBar.Path(`#hud-${i}`, {
        easing: "easeInOut",
        duration: 1400,
      });
      progressBars[i].animate(data[i].value / 100);
    }
  }, []);

  function updateProgressBars(key, value) {
    progressBars[key].animate(value / 100);
  }

  useEffect(() => {
    console.log(progressBars);
    for (let i in data) {
      updateProgressBars(i, data[i].value);
    }
  }, [data]);

  return (
    <Fade in={visible} unmountOnExit mountOnEnter>
      <Box className="test" sx={{ width: "100%", height: "100%" }}>
        <Box className={`UI_HUD ${vehicle ? "UI_Hud__vehicle" : ""}`}>
          {Object.keys(data)
            .slice(0, 5)
            .map((key: string) => (
              <div key={key} className="UI_Hud_ProgressBar">
                <Icon sx={{ color: data[key].iconColor }}>
                  {data[key].icon}
                </Icon>
                <svg viewBox="0 0 100 100">
                  <path
                    d="M 0,2 L 98,2 L 98,98 L 2,98 L 2,4"
                    stroke={`${data[key].iconColor}60`}
                    strokeWidth="14"
                    fillOpacity="0"
                  ></path>
                  <path
                    id={`hud-${key}`}
                    d="M 0,2 L 98,2 L 98,98 L 2,98 L 2,4"
                    stroke={data[key].iconColor}
                    strokeWidth="14"
                    fillOpacity="0"
                  ></path>
                </svg>
              </div>
            ))}
        </Box>
        {/* {vehicle && (
          <Box className="UI_SPEEDOMETER">
            <ReactSpeedometer
              maxValue={300}
              value={data["speed"].value}
              needleHeightRatio={0.75}
              ringWidth={10}
              width={175}
              height={120}
              textColor="white"
              valueTextFontSize="16px"
              needleColor="red"
              startColor="green"
              segments={6}
              endColor="red"
            />
            <div className="UI_Hud_ProgressBar">
              <Icon sx={{ color: "#ffb300" }}>oil_barrel</Icon>
              <LinearProgress
                className="progressbar"
                variant="determinate"
                color={"primary"}
                value={data["fuel"].value}
              />
            </div>
          </Box>
        )} */}
      </Box>
    </Fade>
  );
};

const mapStateToProps = (state: any) => ({
  vehicle: state.hud.vehicle,
  data: state.hud.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  setVehicle: (vehicle: boolean) =>
    dispatch({ type: "SET_HUD_STORE_VEHICLE", vehicle }),
  setData: (data: boolean) => dispatch({ type: "SET_HUD_STORE_DATA", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hud);

import React, { useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";

import { useAppEvent } from "@services/useEvent";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Icon from "@mui/material/Icon";

import ReactSpeedometer from "react-d3-speedometer";

const Hud = ({ visible, vehicle, data, setVisible, setVehicle, setData }) => {
    const [idk, setIdk] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [fuel, setFuel] = useState(25);

    useAppEvent("hud", "show", (status: boolean) => setVisible(status));
    useAppEvent("hud", "setVehicle", (vehicle: boolean) => {
        setVehicle(vehicle);
    });
    useAppEvent("hud", "setValue", (Edata: { key: string; value: number }) => {
        setData({
            ...data,
            [Edata.key]: {
                ...data[Edata.key],
                value: Edata.value,
            },
        });
        setIdk(!idk);
    });

    useAppEvent("hud", "speedoMeter", (data: any) => {
        setSpeed(data.speed)
        setFuel(data.fuel)
    });

    return (
        visible && (
            <div>
                <Box sx={{ width: "100%", height: "100%" }}>
                    <Box
                        className={`UI_HUD ${vehicle ? "UI_Hud__vehicle" : ""}`}
                        sx={{
                            width: "200px",
                            height: "170px",
                            position: "absolute",
                            bottom: "3.5%",
                            transform: "translateX(30%)",
                            // background: 'black',
                        }}>
                        {Object.keys(data).map((key: string) => (
                            <div key={key} className="UI_Hud_ProgressBar">
                                <Icon sx={{ color: data[key].iconColor }}>{data[key].icon}</Icon>
                                <LinearProgress className="progressbar" variant="determinate" color={data[key].color} value={data[key].value} />
                            </div>
                        ))}
                    </Box>
                    {vehicle && (
                        <Box className="UI_SPEEDOMETER">
                            <ReactSpeedometer
                                maxValue={300}
                                value={speed}
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
                                <Icon sx={{ color: '#ffb300' }}>oil_barrel</Icon>
                                <LinearProgress className="progressbar" variant="determinate" color={'primary'} value={fuel} />
                            </div>
                        </Box>
                    )}
                </Box>
            </div>
        )
    );
};

const mapStateToProps = (state: any) => ({
    visible: state.hud.visible,
    vehicle: state.hud.vehicle,
    data: state.hud.data,
});

const mapDispatchToProps = (dispatch: any) => ({
    setVisible: (visible: boolean) => dispatch({ type: "SET_HUD_STORE_VISIBILITY", visible }),
    setVehicle: (vehicle: boolean) => dispatch({ type: "SET_HUD_STORE_VEHICLE", vehicle }),
    setData: (data: boolean) => dispatch({ type: "SET_HUD_STORE_DATA", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hud);

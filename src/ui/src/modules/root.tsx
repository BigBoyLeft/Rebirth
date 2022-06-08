import React from "react";
import "./root.scss";
import { Chat, Hud, HudMenu, Inventory, Phone, Character, Banking } from "./apps";
import { useApplication } from "@/services/nuiUtils";

const Root = () => {
  return (
    <div className="UI_Root">
      <Chat />
      <Hud />
      <HudMenu />
      <Character />
      <Inventory />
      <Phone />
      <Banking />
    </div>
  );
};

export default Root;

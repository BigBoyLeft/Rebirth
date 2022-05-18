import React from "react";
import "./root.scss";
import { Chat, Hud, Inventory, Phone, Character, Banking } from "./apps";
import { useApplication } from "@/services/nuiUtils";

const Root = () => {
  return (
    <div className="UI_Root">
      <Chat />
      <Hud />
      <Character />
      <Inventory />
      <Phone />
      <Banking />
    </div>
  );
};

export default Root;

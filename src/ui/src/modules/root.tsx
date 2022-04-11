import React from "react";
import "./root.scss";
import { Chat, Hud, Inventory, Phone, Character } from "./apps";
import { useApplication } from "@services/useEvent";

const Root = () => {
  return (
    <div className="UI_Root">
      <Chat />
      <Hud />
      <Character />
      <Inventory />
      <Phone />
    </div>
  );
};

export default Root;

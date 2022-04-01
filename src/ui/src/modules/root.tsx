import React from 'react'
import './root.scss'
import {
  Hud,
  Inventory,
  Phone,
} from './apps'
import {
  useApplication
} from "@services/useEvent";

const Root = () => {
  return (
    <div className="UI_Root">
        <Hud />
        <Inventory />
        <Phone />
    </div>
  )
}

export default Root
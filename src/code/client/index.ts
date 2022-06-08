import "@citizenfx/client"

import "./events/connection"
import "./controllers/ui.controller"
import "./systems/hud.system"
import "./systems/chat.system"

function test() {
    let player = LocalPlayer.state.account

    console.log("player object: ", player)
}

onNet("Rebirth:player:client:characterSelect", test)
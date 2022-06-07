import "@citizenfx/client"

import "./events/connection"
import "./systems/ui.system"
import "./systems/hud.system"

function test() {
    let player = LocalPlayer.state.account

    console.log("player object: ", player)
}

onNet("Rebirth:player:client:characterSelect", test)
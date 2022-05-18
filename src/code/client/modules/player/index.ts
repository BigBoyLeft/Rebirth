import { Player } from "@client/modules/player/player";
import API from "@client/modules/ui/api";

class playerService {
  Player: any = "";
  constructor() {
    onNet(
      "Rebirth:client:Player:Connected",
      (player: { _doc: Player }, characters: any[]) => {
        this.Player = player._doc;
        this.initPlayer();
        global.exports["Rebirth"].setFocus(true);
        global.exports["Rebirth"].application("character", {
          visible: true,
          characters,
        });
      }
    );
  }

  async initPlayer() {
    // FreezeEntityPosition(PlayerPedId(), false);
    // SetEntityCoords(PlayerPedId(), -479.39, 5323.26, 80.0, true, true, true, true);
    // SetEntityHeading(PlayerPedId(), -85.0);
    require("@client/modules/player/hud");
    emit("Rebirth:Hud:Client:status", true);
    require("@client/modules/player/characterSelect");

    exports["Rebirth"].newCommand(
      "car",
      "Spawns your desired car",
      async (source: any, args: any[]) => {
        let vehicleName = args[0] ? args[0] : "adder";
        if (!IsModelInCdimage(vehicleName) || !IsModelAVehicle(vehicleName))
          return;

        RequestModel(vehicleName);
        let i = setInterval(() => {
          if (IsPedInAnyVehicle(PlayerPedId(), true)) {
            DeleteEntity(GetVehiclePedIsIn(PlayerPedId(), false));
          }
          if (HasModelLoaded(vehicleName)) {
            let playerPed = PlayerPedId();
            let pos = GetEntityCoords(playerPed);
            let vehicle = CreateVehicle(
              vehicleName,
              pos[0],
              pos[1],
              pos[2],
              GetEntityHeading(playerPed),
              true,
              false
            );
            SetPedIntoVehicle(playerPed, vehicle, -1);
            exports["Rebirth"].chat_message(
              "Info",
              `Spawned ${vehicleName}`,
              "campaign",
              "blue"
            );
            SetEntityAsNoLongerNeeded(vehicle);
            SetModelAsNoLongerNeeded(vehicleName);
            clearInterval(i);
          }
        }, 500);
      }
    );
  }
}

export default new playerService();

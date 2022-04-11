import { Player } from "@client/modules/player/player";
import API from "@client/modules/ui/api"

// import { tick } from "@client";

class playerService {
    Player: any = "";
    constructor() {
        onNet("Rebirth:client:Player:Connected", (player: { _doc: Player }) => {
            this.Player = player._doc;
            this.initPlayer();
            emit("Rebirth:Client:Init")
        });
    }

    async initPlayer() {
        // FreezeEntityPosition(PlayerPedId(), false);
        // SetEntityCoords(PlayerPedId(), -479.39, 5323.26, 80.0, true, true, true, true);
        // SetEntityHeading(PlayerPedId(), -85.0);
        require("@client/modules/player/hud");
        require("@client/modules/player/characterSelect");

        exports['Rebirth'].newCommand("car", 'Spawns your desired car', async (source: any, args: any[]) => {
            let vehicleName = args[0] ? args[0] : "adder";
            if (!IsModelInCdimage(vehicleName) || !IsModelAVehicle(vehicleName)) return;

            RequestModel(vehicleName);
            let i = setInterval(() => {
                if (IsPedInAnyVehicle(PlayerPedId(), true)) {
                    DeleteEntity(GetVehiclePedIsIn(PlayerPedId(), false));
                }
                if (HasModelLoaded(vehicleName)) {
                    let playerPed = PlayerPedId();
                    let pos = GetEntityCoords(playerPed);
                    let vehicle = CreateVehicle(vehicleName, pos[0], pos[1], pos[2], GetEntityHeading(playerPed), true, false);
                    SetPedIntoVehicle(playerPed, vehicle, -1);
                    exports['Rebirth'].chat_message("Info", `Spawned ${vehicleName}`, "campaign", "blue");
                    SetEntityAsNoLongerNeeded(vehicle);
                    SetModelAsNoLongerNeeded(vehicleName);
                    clearInterval(i);
                }
            }, 500);
        });

        exports["Rebirth"].newCommand("tp", "Teleports player to desired coords", async (source: any, args: any[]) => {
            exports['Rebirth'].chat_message("Teleportation", "You successfuly teleported to coordinates", "flight_takeoff", "green");
        });
        exports["Rebirth"].newCommand("kill", "Kills Yourself", async (source: any, args: any[]) => {
            exports['Rebirth'].chat_message("Killed Yourself", "You popped some perkies and killed yourself", "medication", "blue");
        });
        exports["Rebirth"].newCommand("911", "Sends a 911 call to Emergency Services", async (source: any, args: any[]) => {
            exports['Rebirth'].chat_message("911", args[0], "local_police", "red");
        });
        exports["Rebirth"].newCommand("311", "Sends a 311 call to Emergency Services", async (source: any, args: any[]) => {
            exports['Rebirth'].chat_message("311", args[0], "local_pharmacy", "orange");
        });
    }
}

export default new playerService();

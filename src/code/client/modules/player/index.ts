import { Player } from "@client/modules/player/player";
import API from '@client/modules/ui/api'

// import { tick } from "@client";

class playerService {
    Player: any = "";
    constructor() {
        onNet("Rebirth:client:Player:Connected", (player: { _doc: Player }) => {
            this.Player = player._doc;
            this.initPlayer();
        });
    }

    async initPlayer() {
        // FreezeEntityPosition(PlayerPedId(), false);
        // SetEntityCoords(PlayerPedId(), -479.39, 5323.26, 80.0, true, true, true, true);
        // SetEntityHeading(PlayerPedId(), -85.0);
        require("@client/modules/player/hud");

        RegisterCommand("car", async (source: any, args: any[]) => {
            let vehicleName = args[0] ? args[0] : "adder";
            if (!IsModelInCdimage(vehicleName) || !IsModelAVehicle(vehicleName)) {
                emitNet("js:chat", "spawn a " + vehicleName + ". Who even wants their spawning to actually ^*succeed?", [0, 0, 0]);
                return;
            }

            RequestModel(vehicleName);
            let i = setInterval(() => {
                emitNet("js:chat", "model loading", [0, 0, 0]);
                if (IsPedInAnyVehicle(PlayerPedId(), true)) {
                    DeleteEntity(GetVehiclePedIsIn(PlayerPedId(), false));
                }
                if (HasModelLoaded(vehicleName)) {
                    let playerPed = PlayerPedId();
                    let pos = GetEntityCoords(playerPed);
                    let vehicle = CreateVehicle(vehicleName, pos[0], pos[1], pos[2], GetEntityHeading(playerPed), true, false);
                    SetPedIntoVehicle(playerPed, vehicle, -1);

                    SetEntityAsNoLongerNeeded(vehicle);
                    SetModelAsNoLongerNeeded(vehicleName);

                    emitNet("js:chat", "model loaded", [0, 255, 0]);
                    clearInterval(i);
                }
            }, 500);
        }, false);

        API.registerAPI('character');
        API.registerUICallback('character', 'delete', async (data: any, cb: any) => {
            TriggerServerEvent('Rebirth:server:Character:Delete', data);
            cb(true)
        })
        API.registerUICallback('character', 'create', async (data: any, cb: any) => {
            console.log(data)
            TriggerServerEvent('Rebirth:server:Character:Create', data);
            cb(true)
        })

        onNet('Rebirth:server:Character:Init', (characters: any[]) => {
            exports['Rebirth'].application('character', {}, true);
            exports['Rebirth'].appEvent('character', "setCharacters", characters)
        })

        onNet('Rebirth:server:Character:Create:Error', (status: string) => {
            console.log(status)
            if (status === 'EXIST') {
                exports['Rebirth'].appEvent('character', "ERROR", {})
            }
        })

        onNet('Rebirth:server:Character:Create:Success', (character: any) => {
            console.log("idk ")
            exports['Rebirth'].appEvent('character', "SUCCESS", character)
        })

        setInterval(() => {
            console.log("update");
        }, 300000);
    }
}

export default new playerService();

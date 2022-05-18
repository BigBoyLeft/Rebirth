import "@citizenfx/client";
import API from "@client/modules/ui/api";
import CB from "@client/modules/cb";

class characterSelect {
  constructor() {
    this.nui();
    this.events();
  }

  events() {
    // onNet("Rebirth:server:Character:Create:Error", (status: string) => {
    //   if (status === "EXIST") {
    //     global.exports["Rebirth"].appAction("character", {}, "ERROR");
    //   }
    // });

    // onNet("Rebirth:server:Character:Create:Success", (character: any) => {
    //   global.exports["Rebirth"].appAction("character", character, "SUCCESS");
    // });

    // onNet("Rebirth:server:Character:Select", () => {
    //   global.exports["Rebirth"].setFocus(false);
    //   global.exports["Rebirth"].application("character", { visible: false });
    //   const ped = PlayerPedId();
    //   DisableAllControlActions(0);
    //   SetEntityVisible(ped, true, false);
    //   FreezeEntityPosition(ped, false);
    //   ClearPedTasksImmediately(ped);
    //   RemoveAllPedWeapons(ped, false);
    //   ClearPlayerWantedLevel(PlayerId());
    //   EnableAllControlActions(0);
    // });
  }

  nui() {
    API.registerAPI("character");
    API.registerUICallback(
      "character",
      "delete",
      async (data: any, cb: any) => {
        // TriggerServerEvent("Rebirth:server:Character:Delete", data);
        let response = await CB.execute("Character:Delete", data);
        cb(response);
      }
    );
    API.registerUICallback(
      "character",
      "create",
      async (data: any, cb: any) => {
        // TriggerServerEvent("Rebirth:server:Character:Create", data);
        let response = await CB.execute("Character:Create", data);
        cb(response);
      }
    );
    API.registerUICallback(
      "character",
      "login",
      async (data: any, cb: any) => {
        // TriggerServerEvent("Rebirth:server:Character:Select", data);
        let response = await CB.execute("Character:Login", data);
        cb(response);

        global.exports["Rebirth"].application("character", {
          visible: false,
        });
        emit("Rebirth:Hud:Client:status", true)
      }
    );
  }
}

export default new characterSelect();

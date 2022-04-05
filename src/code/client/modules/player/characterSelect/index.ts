import "@citizenfx/client";
import API from "@client/modules/ui/api";

API.registerAPI("character");
API.registerUICallback("character", "delete", async (data: any, cb: any) => {
    TriggerServerEvent("Rebirth:server:Character:Delete", data);
    cb(true);
});
API.registerUICallback("character", "create", async (data: any, cb: any) => {
    TriggerServerEvent("Rebirth:server:Character:Create", data);
    cb(true);
});
API.registerUICallback("character", "select", async (data: any, cb: any) => {
    TriggerServerEvent("Rebirth:server:Character:Select", data);
    cb(true);
});

onNet("Rebirth:server:Character:Init", (characters: any[]) => {
    global.exports["Rebirth"].application("character", {}, true);
    global.exports["Rebirth"].appEvent("character", "setCharacters", characters);
});

onNet("Rebirth:server:Character:Create:Error", (status: string) => {
    if (status === "EXIST") {
        global.exports["Rebirth"].appEvent("character", "ERROR", {});
    }
});

onNet("Rebirth:server:Character:Create:Success", (character: any) => {
    global.exports["Rebirth"].appEvent("character", "SUCCESS", character);
});

onNet("Rebirth:server:Character:Select", () => {
    global.exports["Rebirth"].application("character", {}, false);
});

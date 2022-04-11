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
  // global.exports["Rebirth"].application("character", {}, true);
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
  const ped = PlayerPedId();
  DisableAllControlActions(0);
  SetEntityVisible(ped, true, false);
  FreezeEntityPosition(ped, false);
  ClearPedTasksImmediately(ped);
  RemoveAllPedWeapons(ped, false);
  ClearPlayerWantedLevel(PlayerId());
  EnableAllControlActions(0);
});

let cam: any = null;
let cam2: any = null;

function setCam(coords: Vector3) {
  cam2 = CreateCamWithParams(
    "DEFAULT_SCRIPTED_CAMERA",
    coords.x,
    coords.y,
    coords.z + 1500,
    300.0,
    0.0,
    0.0,
    110.0,
    false,
    0
  );
  PointCamAtCoord(cam2, coords.x, coords.y, coords.z + 75);
  SetCamActiveWithInterp(cam2, cam, 500, 0, 0);
  if (DoesCamExist(cam)) {
    DestroyCam(cam, true);
  }
  sleep(500);
  cam = CreateCamWithParams(
    "DEFAULT_SCRIPTED_CAMERA",
    coords.x,
    coords.y,
    coords.z + 50,
    300.0,
    0.0,
    0.0,
    110.0,
    false,
    0
  );
  PointCamAtCoord(cam, coords.x, coords.y, coords.z);
  SetCamActiveWithInterp(cam, cam2, 1000, 0, 0);
  SetEntityCoords(
    PlayerPedId(),
    coords.x,
    coords.y,
    coords.z,
    true,
    false,
    false,
    true
  );
}

function test() {}

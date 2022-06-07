import Events from "@shared/enums/connection";

setImmediate(async () => {
  DestroyAllCams(true);
  RenderScriptCams(false, false, 0, false, false);
  DoScreenFadeOut(0);
  await sleep(100);
  DoScreenFadeIn(500);
  FreezeEntityPosition(PlayerPedId(), true);
  FreezeEntityPosition(PlayerPedId(), false);

  TriggerServerEvent(Events.START_LOGIN);

  StartAudioScene(`CHARACTER_CHANGE_IN_SKY_SCENE`);
  StartAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE"); // Used to stop police sound in town
  CancelCurrentPoliceReport(); // Used to stop default police radio around/In police vehicle
  ClearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", false); // Turn off prison sound
  ClearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", false); // Turn off prison sound
  ClearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", false); // Turn off prison sound
  SetAmbientZoneState("", false, false);
  ClearAmbientZoneState("AZ_DISTANT_SASQUATCH", false);
  SetAudioFlag("LoadMPData", true);
  SetAudioFlag("DisableFlightMusic", true);
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
import Utils from "@client/utils/utils";
import IHud from "@client/interfaces/IHud";
import HudEvents from "@shared/enums/hud";
import PlayerEvents from "@shared/enums/player";
import Chat from "@client/systems/chat.system";
import UI from "@client/controllers/ui.controller";

let Player = PlayerPedId();

let HudValues: any = {
  health: 0,
  armour: 0,
  hunger: 0,
  thirst: 0,
  stress: 0,
};

let lastValues: any = {};

let tick;

export default class Hud {
  static Vehicle: boolean = false;
  static init() {
    onNet(PlayerEvents.CHARACTER_SELECT, Hud.startTick);
    Hud.setHudVisible(true);
  }

  static setHudVisible(visible: boolean) {
    UI.application("hud", { visible });
  }

  static startTick() {
    setImmediate(async () => {
      let minimap = RequestScaleformMovie("minimap");

      UI.registerUICallback("hud_menu", "hide", (data: any, cb: any) => {
        UI.setFocus(false);
        cb(true);
      })

      Chat.registerCommand("hudmenu", "Opens the hud Style Menu", () => {
        UI.setFocus(true);
        UI.application("hud_menu", { visible: true });
      })

      DisableIdleCamera(true);
      SetRadarBigmapEnabled(true, false);
      await Utils.sleep(0);
      SetRadarBigmapEnabled(false, false);

      Hud.vehicle(false);
      if (IsPedInAnyVehicle(PlayerPedId(), false)) {
        Hud.vehicle(true);
      }

      HudValues["health"] = GetEntityHealth(Player) / 2;
      HudValues["armour"] = GetPedArmour(Player) / 2;
      HudValues["hunger"] = 100;
      HudValues["thirst"] = 100;
      HudValues["stress"] = 39;

      for (let i = 0; i < 25; i++) {
        EnableDispatchService(i, false);
      }
      SetMaxWantedLevel(0);
      SetPoliceIgnorePlayer(Player, true);
      SetDispatchCopsForPlayer(Player, false);
      SetAudioFlag("PoliceScannerDisabled", true);

      for (let i = 0; i < 255; i++) {
        if (NetworkIsPlayerActive(i)) {
          if (GetPlayerPed(i) !== null) {
            SetCanAttackFriendly(GetPlayerPed(i), true, true);
          }
        }
      }
      NetworkSetFriendlyFireOption(true);
      DisablePlayerVehicleRewards(Player);

      tick = setTick(async () => {
        let Player = PlayerPedId();

        if (IsPedInAnyVehicle(Player, false)) {
          let vehicle = GetVehiclePedIsIn(Player, false);
          //   HudValues["speed"] = Math.ceil(GetEntitySpeed(vehicle) * 2.236936);
          //   HudValues["fuel"] = GetVehicleFuelLevel(vehicle);
        }

        HudValues["health"] = GetEntityHealth(Player) / 2;
        HudValues["armour"] = GetPedArmour(Player) / 2;

        // sort through HudValues and check if each value is different from LastValues

        Object.keys(HudValues).forEach((key) => {
          if (HudValues[key] !== lastValues[key]) {
            global.exports["Rebirth"].appAction(
              "hud",
              {
                key,
                value: HudValues[key],
              },
              "setValue"
            );
            lastValues[key] = HudValues[key];
          }
        });
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
        ScaleformMovieMethodAddParamInt(3);
        EndScaleformMovieMethod();
      });
    });
  }

  static vehicle(status: boolean) {
    global.exports["Rebirth"].appAction("hud", { status }, "setVehicle");
    if (status) {
      //   emitNet(HudEvents.HUD_VEHICLE, true);
      this.Vehicle = true;
      DisplayRadar(true);
      SetRadarZoom(1100);
    } else {
      emitNet(HudEvents.HUD_VEHICLE, false);
      this.Vehicle = false;
      DisplayRadar(false);
    }
  }

  static updateMinimapLocation() {
    setImmediate(async () => {
      let ratio = GetScreenAspectRatio(true);
      let posX = -0.0045;
      let posY = 0.002;

      if (Number(`${ratio}.2f`) >= 2.3) {
        posX = -0.185;
        posY = 0.002;
      } else {
        posX = -0.0045;
        posY = 0.002;
      }

      SetMinimapComponentPosition(
        "minimap",
        "L",
        "B",
        posX,
        posY,
        0.15,
        0.188888
      );
      SetMinimapComponentPosition(
        "minimap_mask",
        "L",
        "B",
        posX + 0.0155,
        posY + 0.03,
        0.111,
        0.159
      );
      SetMinimapComponentPosition(
        "minimap_blur",
        "L",
        "B",
        posX - 0.0255,
        posY + 0.02,
        0.266,
        0.237
      );
      DisplayRadar(false);
      SetRadarBigmapEnabled(true, false);
      await Utils.sleep(100);
      SetRadarBigmapEnabled(false, false);
      DisplayRadar(true);
    });
  }
}

onNet("baseevents:enteredVehicle", () => Hud.vehicle(true));
onNet("baseevents:leftVehicle", () => Hud.vehicle(false));

Hud.init();

setTimeout(() => {
  emit(PlayerEvents.CHARACTER_SELECT);
}, 1000);

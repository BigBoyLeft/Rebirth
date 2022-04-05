var exps = global.exports;

on("Rebirth:Hud:Client:vehicle", function (status: boolean) {
    globalThis.exports["Rebirth"].appEvent("hud", "setVehicle", status);
});

function updateHudValue(key: string, value: number) {
    globalThis.exports["Rebirth"].appEvent("hud", "setValue", {
        key,
        value,
    });
}
exps("updateHudValue", updateHudValue);
RegisterCommand(
    "value",
    (source: number, args: any[]) => {
        hud.values[args[0]] = args[1];
    },
    false
);

function hudStatus(status: boolean) {
    hud.status = status;
    Wait(5000)
    globalThis.exports["Rebirth"].appEvent("hud", "setHud", status);
}
exps("hudStatus", hudStatus);

// on('gameEventTriggered', (eventName: string, args: any) => {
//     if (eventName === 'CEventNetworkEntityDamage') {
//         if (args[0] === args[1]) {
//             updateHudValue('health', GetEntityHealth(PlayerPedId()) / 2)
//         }
//     }
// })

let hud: any = {
    status: true,
    values: {
        health: 0,
        armour: 0,
        hunger: 0,
        thirst: 0,
        stress: 0,
    },
    lastValues: {},
};

RegisterCommand(
    "test",
    (source: any, args: any[]) => {
        hud.values.thirst = args[0];
    },
    false
);

let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let changed = false;
hud.values["health"] = GetEntityHealth(PlayerPedId()) / 2;
hud.values["armour"] = GetPedArmour(PlayerPedId()) / 2;
hud.values["hunger"] = 11;
hud.values["thirst"] = 61;
hud.values["stress"] = 39;

const tick = setInterval(() => {
    hud.values["health"] = GetEntityHealth(PlayerPedId()) / 2;
    hud.values["armour"] = GetPedArmour(PlayerPedId()) / 2;
    if (hud.values["health"] < 0) hud.values["health"] = 0;
    if (hud.values["armour"] < 0) hud.values["armour"] = 0;

    if (IsPedInAnyVehicle(PlayerPedId(), false)) {
        globalThis.exports["Rebirth"].appEvent("hud", "speedoMeter", {
            speed: Math.round(GetEntitySpeed(GetVehiclePedIsIn(PlayerPedId(), false)) * 2.236936),
            fuel: Math.round(GetVehicleFuelLevel(GetVehiclePedIsIn(PlayerPedId(), false))),
        });
        // Doesnt work
        // globalThis.exports["Rebirth"].appEvent("hud", "speedoMeterFuel", Math.round());
    }

    Object.keys(hud.values).forEach((key) => {
        if (hud.lastValues[key] == null || hud.lastValues[key] !== hud.values[key]) {
            changed = true;
            hud.lastValues[key] = hud.values[key];
            updateHudValue(key, hud.values[key]);
            updateHudValue(key, hud.values[key]);
        }
    });
}, 100);

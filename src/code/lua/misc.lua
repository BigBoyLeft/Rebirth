DisplayRadar(false);
RegisterNetEvent('Rebirth:client:Player:Connected', function()
    print('idk just here')
    local vehicle = false;
    local player = PlayerId()

    local hud = {
        health = 0,
        armour = 0,
        hunger = 0,
        thirst = 0,
        stress = 0,
        speed = 0,
        fuel = 0
    }
    local lastValues = {};

    RegisterNetEvent("baseevents:enteredVehicle", function()
        if IsPedInAnyVehicle(PlayerPedId(), false) then
            TriggerEvent("Rebirth:Hud:Client:vehicle", true);
            DisplayRadar(true);
            SetRadarZoom(1100);
        end
    end)

    RegisterNetEvent("baseevents:leftVehicle", function()
        if not IsPedInAnyVehicle(PlayerPedId(), false) then
            TriggerEvent("Rebirth:Hud:Client:vehicle", false);
            DisplayRadar(false);
        end
    end)

    Citizen.CreateThread(function()
        DisableIdleCamera(true);
        local minimap = RequestScaleformMovie("minimap")
        SetRadarBigmapEnabled(true, false)
        Wait(0)
        SetRadarBigmapEnabled(false, false)
        if IsPedInAnyVehicle(PlayerPedId(), false) then
            TriggerEvent("Rebirth:Hud:Client:vehicle", true)
            vehicle = true
            DisplayRadar(true)
            SetRadarZoom(1100)
        end

        hud["health"] = GetEntityHealth(PlayerPedId()) / 2;
        hud["armour"] = GetPedArmour(PlayerPedId()) / 2;
        hud["hunger"] = 11;
        hud["thirst"] = 61;
        hud["stress"] = 39;
        hud["speed"] = 0;
        hud["fuel"] = 0;

        for i = 1, 25 do
            EnableDispatchService(i, false)
        end
        SetMaxWantedLevel(0)
        SetPoliceIgnorePlayer(player, true)
        SetDispatchCopsForPlayer(player, false)
        SetAudioFlag("PoliceScannerDisabled", true)
        for i = 0, 255 do
            Citizen.Wait(10)
            if NetworkIsPlayerConnected(i) then
                if NetworkIsPlayerConnected(i) and GetPlayerPed(i) ~= nil then
                    SetCanAttackFriendly(GetPlayerPed(i), true, true)
                end
            end
        end
        NetworkSetFriendlyFireOption(true)
        DisablePlayerVehicleRewards(PlayerId())

        if IsPedInAnyVehicle(PlayerPedId(), false) then
            TriggerEvent("Rebirth:Hud:Client:vehicle", true);
            DisplayRadar(true);
            SetRadarZoom(1100);
        else
            TriggerEvent("Rebirth:Hud:Client:vehicle", false);
            DisplayRadar(false);
        end

        local counter = 0;
        while true do
            Citizen.Wait(100)
            local playerPed = PlayerPedId();

            if IsPedInAnyVehicle(playerPed, false) then
                local vehicle = GetVehiclePedIsIn(playerPed, false);
                hud["speed"] = math.ceil(GetEntitySpeed(vehicle) * 2);
                hud["fuel"] = GetVehicleFuelLevel(vehicle);
            end

            if counter == 0 then
                hud["health"] = GetEntityHealth(playerPed) / 2;
                hud["armour"] = GetPedArmour(playerPed) / 2;

                for k, v in pairs(hud) do
                    if lastValues[k] ~= hud[k] then
                        exports["Rebirth"]:updateHudValue(k, hud[k]);
                        lastValues[k] = hud[k]
                    end
                end
                count = 100
            end
            count = count - 1
            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
        end
    end)

    function UpdateMinimapLocation()
        Citizen.CreateThread(function()
            -- Get screen aspect ratio
            local ratio = GetScreenAspectRatio()

            -- Default values for 16:9 monitors
            local posX = -0.0045
            local posY = 0.002

            if tonumber(string.format("%.2f", ratio)) >= 2.3 then
                -- Ultra wide 3440 x 1440 (2.39)
                -- Ultra wide 5120 x 2160 (2.37)
                posX = -0.185
                posY = 0.002
                print("Detected ultra-wide monitor, adjusted minimap")
            else
                posX = -0.0045
                posY = 0.002
            end

            SetMinimapComponentPosition("minimap", "L", "B", posX, posY, 0.150, 0.188888)
            SetMinimapComponentPosition("minimap_mask", "L", "B", posX + 0.0155, posY + 0.03, 0.111, 0.159)
            SetMinimapComponentPosition("minimap_blur", "L", "B", posX - 0.0255, posY + 0.02, 0.266, 0.237)

            DisplayRadar(false)
            SetRadarBigmapEnabled(true, false)
            Wait(0)
            SetRadarBigmapEnabled(false, false)
            DisplayRadar(true)
        end)
    end

    RegisterCommand("reload-map", function(src, args)
        UpdateMinimapLocation()
    end, false)

    UpdateMinimapLocation()
end)

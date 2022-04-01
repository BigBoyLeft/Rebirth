local vehicle = false;

Citizen.CreateThread(function()
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
    while true do
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
        if not IsPedInAnyVehicle(PlayerPedId()) then
            if vehicle then
                TriggerEvent('Rebirth:Hud:Client:vehicle', false)
                vehicle = false
            end
            DisplayRadar(false)
        elseif IsPedInAnyVehicle(PlayerPedId()) then
            if not vehicle then
                TriggerEvent('Rebirth:Hud:Client:vehicle', true)
                vehicle = true
            end
            DisplayRadar(true)
            SetRadarZoom(1100)
        end
        Wait(500)
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
            print('Detected ultra-wide monitor, adjusted minimap')
        else
            posX = -0.0045
            posY = 0.002
        end

        SetMinimapComponentPosition('minimap', 'L', 'B', posX, posY, 0.150, 0.188888)
        SetMinimapComponentPosition('minimap_mask', 'L', 'B', posX + 0.0155, posY + 0.03, 0.111, 0.159)
        SetMinimapComponentPosition('minimap_blur', 'L', 'B', posX - 0.0255, posY + 0.02, 0.266, 0.237)

        DisplayRadar(false)
        SetRadarBigmapEnabled(true, false)
        Wait(0)
        SetRadarBigmapEnabled(false, false)
        DisplayRadar(true)
    end)
end

RegisterCommand('reload-map', function(src, args)
    UpdateMinimapLocation()
end, false)

UpdateMinimapLocation()

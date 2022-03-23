MySQL.Async.fetchAll('SELECT * FROM player_vehicles WHERE citizenid = ? AND state = ?', {pData.PlayerData.citizenid, garage, 1}, function(result)
    if result[1] then
        cb(result)
    else
        cb(nil)
    end
end)
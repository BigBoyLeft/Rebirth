fx_version "cerulean"
game {"gta5"}

author "left#2118"
description "Rebirths Core"
version "1.0.0"
lua54 "yes"

loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

files {
    "build/ui/**/*", 
    "build/ui/index.html",
}

ui_page "build/ui/index.html"
client_scripts {
    "build/client/**/*.js", 
    "src/code/lua/*.lua",
    'build/packages/**/client/**/*.js'
}
server_scripts {
    "build/server/**/*.js",
    'build/packages/**/server/**/*.js'
}
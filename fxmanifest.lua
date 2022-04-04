fx_version 'cerulean'
game {'gta5'}

author 'left#2118'
description 'Rebirths Core'
version '1.0.0'

files {
    -- 'build/ui/**/*', 
    'build/ui/index.html'
}
ui_page 'build/ui/index.html'
client_scripts {'build/client/**/*.js', 'src/code/lua/*.lua'}
server_scripts {'build/server/**/*.js'}

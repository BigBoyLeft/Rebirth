fx_version "cerulean"
game {'gta5'}

author 'left#2118'
description 'Rebirths Core'
version '1.0.0'

ui_page "build/ui/index.html"

files "build/ui/**/*"
client_script {
    'build/client/**/*.js',
    'build/plugins/**/client/**/*.js'
}
server_script {
    'build/server/**/*.js',
    'build/plugins/**/server/**/*.js'
}
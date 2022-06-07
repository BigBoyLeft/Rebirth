"use strict";
const esbuild = require("esbuild");
const path = require("path");
const glob = require("glob");
const fs = require("fs");

const isProduction =
  process.argv.findIndex((Item) => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex((Item) => Item === "--watch") >= 0;

let pluginDirectory = "../[Plugins]";

function run() {
  let plugins = [];
  const pluginList = glob.sync("./src/code/plugins/**/plugin.js", {
    absolute: true,
  });

  if (pluginList.length > 0) {
    for (const pluginPath of pluginList) {
      const config = require(pluginPath);

      if (config.active) {
        const pluginData = {
          name: "rebirth_" + config.name,
          path: path.dirname(pluginPath),
        };

        if (config.server) {
          pluginData.server = path.join(pluginData.path, config.server);
        }

        if (config.client) {
          pluginData.client = path.join(pluginData.path, config.client);
        }

        if (config.author) {
          pluginData.author = config.author;
        }

        if (config.description) {
          pluginData.description = config.description;
        }

        if (config.version) {
          pluginData.version = config.version;
        }

        plugins.push(pluginData);
      }
    }
  }

  if (!fs.existsSync(pluginDirectory)) fs.mkdirSync(pluginDirectory);

  for (const plugin in plugins) {
    const pluginData = plugins[plugin];

    try {
      console.log(`Build Plugin into Resource Folder: ${pluginData.name}`);
      if (!fs.existsSync(`${pluginDirectory}/${pluginData.name}`)) {
        fs.mkdirSync(`${pluginDirectory}/${pluginData.name}`);
      }

      fs.writeFileSync(
        `${pluginDirectory}/${pluginData.name}/fxmanifest.lua`,
        `fx_version "cerulean"
game {"gta5"}

author "${pluginData.author || "Unknown"}"
description "${pluginData.description || "No Description"}"
version "${pluginData.version || "1.0.0"}"
lua54 "yes"

client_script "./client/index.js"
server_script "./serrver/index.js"`);

      if (pluginData.client) {
        if (!fs.existsSync(`${pluginDirectory}/${pluginData.name}/client`)) {
          fs.mkdirSync(`${pluginDirectory}/${pluginData.name}/client`);
        }

        console.log(`Build Plugin Client: ${pluginData.name}`);
        esbuild.build({
          entryPoints: [pluginData.client],
          outdir: `${pluginDirectory}/${pluginData.name}/client`,
          target: ["chrome93"],
          format: "iife",
          minify: isProduction,
          bundle: true,
          sourcemap: false,
          watch: isWatch
            ? {
                onRebuild: (err, res) => {
                  if (err) {
                    return console.error(
                      `[${pluginData.name}] rebuild error: ${err}`
                    );
                  }

                  console.log(`Rebuilt ${pluginData.name} Client Successfully`);
                },
              }
            : false,
        });
      }

      if (pluginData.server) {
        if (!fs.existsSync(`${pluginDirectory}/${pluginData.name}/server`)) {
          fs.mkdirSync(`${pluginDirectory}/${pluginData.name}/server`);
        }

        console.log(`Build Plugin Server: ${pluginData.name}`);
        esbuild.build({
          entryPoints: [pluginData.server],
          outdir: `${pluginDirectory}/${pluginData.name}/server`,
          target: ["chrome93"],
          format: "iife",
          minify: isProduction,
          bundle: true,
          sourcemap: false,
          watch: isWatch
            ? {
                onRebuild: (err, res) => {
                  if (err) {
                    return console.error(
                      `[${pluginData.name}] rebuild error: ${err}`
                    );
                  }

                  console.log(`Rebuilt ${pluginData.name} Server Successfully`);
                },
              }
            : false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

run();

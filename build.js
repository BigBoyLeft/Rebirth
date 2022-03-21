"use strict";
const esbuild = require("esbuild");
const glob = require("tiny-glob");
const path = require("path");
const fs = require("fs");

const isProduction = process.argv.findIndex(Item => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex(Item => Item === "--watch") >= 0;

(async () => {
    let clplugins = [];
    let svplugins = [];
    const pluginList = await glob("./plugins/**/manifest.js", {
        absolute: true,
    });
    for (const plugin of pluginList) {
        const pluginManifest = require(plugin);
        if (pluginManifest.active) {
            const pluginPath = path.dirname(plugin)
            if (pluginManifest.server) {
                svplugins.push(pluginPath + '\\' + pluginManifest.server.modules[0])
            }
            if (pluginManifest.client) {
                clplugins.push(pluginPath + '\\' + pluginManifest.client.modules[0])

            }
        }
    }

    console.log(clplugins)
    console.log(svplugins)

    const contexts = [
        {
            label: "client",
            platform: "browser",
            inject: clplugins,
            entryPoints: ['./src/client/index.ts'],
            target: ["chrome93"],
            format: "iife",
        },
        {
            label: "server",
            platform: "node",
            inject: svplugins,
            entryPoints: ['./src/server/index.ts'],
            target: ["node16"],
            format: "cjs",
            define: {
                require: "requireTo"
            },
            plugins: [
                {
                    name: "ts-paths",
                    setup: (build) => {
                        build.onResolve({ filter: /@citizenfx/ }, (args) => {
                            return { namespace: "ignore", paths: "." }
                        });

                        build.onResolve({ filter: /.*/ }, (args) => {
                            if (!args.path.match(/^@(server|client|shared)/) && args.kind === "import-statement") {
                                let modulePath;

                                // @/ means the root of the project
                                if (args.path.startsWith("@/")) {
                                    modulePath = path.join(...process.cwd().split(path.sep), args.path.replace(/^@\//, ""));
                                } else {
                                    modulePath = require.resolve(args.path);

                                    // require.resolve return the index.js file, while i'm here
                                    // just trying to add the root path to the node_modules path

                                    // [require.resolve] => D:\Servers\NatunaIndonesia\txData\CFX\resources\[local]\natuna\node_modules\mysql2\index.js
                                    // [code below] => D:\Servers\NatunaIndonesia\txData\CFX\resources\[local]\natuna\node_modules\mysql2
                                    if (path.isAbsolute(modulePath)) {
                                        modulePath = path.join(...process.cwd().split(path.sep), "node_modules", args.path);
                                    }
                                }

                                return {
                                    path: modulePath,
                                    external: true,
                                };
                            }
                        });

                        build.onLoad({ filter: /.*/, namespace: "ignore" }, (args) => {
                            return {
                                contents: "",
                            }
                        })
                    }
                }
            ]
        }
    ]

    for (const context of contexts) {
        const label = context.label;
        delete context.label;

        try {
            const result = await esbuild.build({
                bundle: true,
                assetNames: `[name].[ext]`,
                outdir: `build/${label}`,
                minify: isProduction,
                sourcemap: false,
                metafile: true,
                watch: isWatch
                    ? {
                        onRebuild: (err, res) => {
                            if (err) {
                                return console.error(`[${label}] rebuild error: ${err}`);
                            }
                            console.log(`[${label}] rebuild success with ${res.warnings.length} warnings | ${res.warnings}`);
                        },
                    } : false,
                ...context,
            })

            const analize = await esbuild.analyzeMetafileSync(result.metafile, {
                color: true,
                verbose: true,
            });

            console.log(analize);
        } catch (error) {
            console.error(`[${label}] Build Failed: ${error}`);
        }
    }
})();
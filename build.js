"use strict";
const esbuild = require("esbuild");
const glob = require("tiny-glob");
const path = require("path");
const fs = require("fs");

const isProduction = process.argv.findIndex(Item => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex(Item => Item === "--watch") >= 0;

(async () => {
    let plugins = [];
    const pluginList = await glob("./src/plugins/**/manifest.js", {
        absolute: true,
    });
    for (const plugin of pluginList) {
        const pluginManifest = require(plugin);
        if (pluginManifest.active) {
            const pluginData = {
                name: pluginManifest.name,
                path: path.dirname(plugin)
            }
            if (pluginManifest.server) {
                pluginData.server = pluginData.path + '\\' + pluginManifest.server
            }
            if (pluginManifest.client) {
                pluginData.client = pluginData.path + '\\' + pluginManifest.client
            }
            plugins.push(pluginData);
        }
    }

    const contexts = [
        {
            label: "client",
            platform: "browser",
            entryPoints: ['./src/code/client/index.ts'],
            outdir: `build/client`,
            target: ["chrome93"],
            format: "iife",
        },
        {
            label: "server",
            platform: "node",
            entryPoints: ['./src/code/server/index.ts'],
            outdir: `build/server`,
            target: ["node16"],
            format: "iife",
            plugins: [
                {
                    name: "ts-paths",
                    setup: (build) => {
                        build.onResolve({ filter: /@citizenfx/ }, (args) => {
                            return { namespace: "ignore", path: "." };
                        });

                        build.onResolve({ filter: /.*/ }, (args) => {
                            if (!args.path.match(/^@(database|schemas|server|client|shared)/) && args.kind === "import-statement") {
                                let modulePath;

                                if (args.path.startsWith("@/")) {
                                    modulePath = path.join(...process.cwd().split(path.sep), args.path.replace(/^@\//, ""));
                                } else {
                                    modulePath = require.resolve(args.path);

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
                            };
                        });
                    },
                },
            ],
        }
    ]

    // for (const index in plugins) {
    //     const plugin = plugins[index]

    //     if (plugin.client) {
    //         contexts.push({
    //             label: plugin.name,
    //             platform: "browser",
    //             entryPoints: [plugin.client],
    //             outdir: `build/plugins/${plugin.name}/client`,
    //             target: ["chrome93"],
    //             format: "iife",
    //         })
    //     }
    //     if (plugin.server) {
    //         contexts.push({
    //             label: plugin.name,
    //             platform: "node",
    //             entryPoints: [plugin.server],
    //             outdir: `build/plugins/${plugin.name}/server`,
    //             target: ["node16"],
    //             format: "iife",
    //             plugins: [
    //                 {
    //                     name: "ts-paths",
    //                     setup: (build) => {
    //                         build.onResolve({ filter: /@citizenfx/ }, (args) => {
    //                             return { namespace: "ignore", path: "." };
    //                         });

    //                         build.onResolve({ filter: /.*/ }, (args) => {
    //                             if (!args.path.match(/^@(database|server|client|shared)/) && args.kind === "import-statement") {
    //                                 let modulePath;

    //                                 if (args.path.startsWith("@/")) {
    //                                     modulePath = path.join(...process.cwd().split(path.sep), args.path.replace(/^@\//, ""));
    //                                 } else {
    //                                     modulePath = require.resolve(args.path);

    //                                     if (path.isAbsolute(modulePath)) {
    //                                         modulePath = path.join(...process.cwd().split(path.sep), "node_modules", args.path);
    //                                     }
    //                                 }

    //                                 return {
    //                                     path: modulePath,
    //                                     external: true,
    //                                 };
    //                             }
    //                         });

    //                         build.onLoad({ filter: /.*/, namespace: "ignore" }, (args) => {
    //                             return {
    //                                 contents: "",
    //                             };
    //                         });
    //                     },
    //                 },
    //             ],
    //         })
    //     }
    // }

    for (const context of contexts) {
        const label = context.label;
        delete context.label;

        try {
            const result = await esbuild.build({
                bundle: true,
                assetNames: `[name].[ext]`,
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

            const analize = esbuild.analyzeMetafileSync(result.metafile, {
                color: true,
                verbose: true,
            });

            console.log(analize);
        } catch (error) {
            console.error(`[${label}] Build Failed: ${error}`);
        }
    }
})();
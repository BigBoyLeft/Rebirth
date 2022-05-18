"use strict";
const esbuild = require("esbuild");
const path = require("path");
const Logger = require("@ptkdev/logger");
const glob = require("glob");

const logger = new Logger({
  language: "en",
  colors: true,
  debug: true,
  info: true,
  warning: true,
  error: true,
  sponsor: true,
  write: true,
  type: "json",
  rotate: {
    size: "10M",
    encoding: "utf8",
  },
  path: {
    debug_log: "./build/.logs/debug.log",
    error_log: "./build/.logs/error.log",
  },
});

const isProduction =
  process.argv.findIndex((Item) => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex((Item) => Item === "--watch") >= 0;

(async () => {
  const contexts = [
    {
      label: "client",
      platform: "browser",
      entryPoints: ["./src/code/client/index.ts"],
      outdir: `build/client`,
      target: ["chrome93"],
      format: "iife",
    },
    {
      label: "server",
      platform: "node",
      entryPoints: ["./src/code/server/index.ts"],
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
              if (
                !args.path.match(
                  /^@(database|schemas|server|client|shared|Utils|Types)/
                ) &&
                args.kind === "import-statement"
              ) {
                let modulePath;

                if (args.path.startsWith("@/")) {
                  modulePath = path.join(
                    ...process.cwd().split(path.sep),
                    args.path.replace(/^@\//, "")
                  );
                } else {
                  modulePath = require.resolve(args.path);

                  if (path.isAbsolute(modulePath)) {
                    modulePath = path.join(
                      ...process.cwd().split(path.sep),
                      "node_modules",
                      args.path
                    );
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
    },
  ];

  let packages = [];
  const packageList = glob.sync("packages//**/manifest.js", {
    absolute: true,
  });
  if (packageList.length > 0) {
    for (const packagePath of packageList) {
      const packageManafest = require(packagePath);

      if (packageManafest.active) {
        const packageData = {
          name: packageManafest.name,
          path: path.dirname(packagePath),
        };
        if (packageManafest.server) {
          packageData.server = packageData.server || [];
          for (const module of packageManafest.server.modules) {
            packageData.server.push(path.join(packageData.path, module));
          }
        }
        if (packageManafest.client) {
          packageData.client = packageData.client || [];
          for (const module of packageManafest.client.modules) {
            packageData.client.push(path.join(packageData.path, module));
          }
        }
        packages.push(packageData);
      }
    }
  }

  for (const index in packages) {
    const packageConfig = packages[index];

    if (packageConfig.client.length > 0) {
      console.log("test");
      contexts.push({
        label: packageConfig.name,
        platform: "browser",
        entryPoints: packageConfig.client,
        outdir: `build/packages/${packageConfig.name}/client`,
        target: ["chrome93"],
        format: "iife",
      });
    }
    if (packageConfig.server.length > 0) {
      contexts.push({
        label: packageConfig.name,
        platform: "node",
        entryPoints: packageConfig.server,
        outdir: `build/packages/${packageConfig.name}/server`,
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
                if (
                  !args.path.match(/^@(database|server|client|shared)/) &&
                  args.kind === "import-statement"
                ) {
                  let modulePath;

                  if (args.path.startsWith("@/")) {
                    modulePath = path.join(
                      ...process.cwd().split(path.sep),
                      args.path.replace(/^@\//, "")
                    );
                  } else {
                    modulePath = require.resolve(args.path);

                    if (path.isAbsolute(modulePath)) {
                      modulePath = path.join(
                        ...process.cwd().split(path.sep),
                        "node_modules",
                        args.path
                      );
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
      });
    }
  }

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
                  return logger.error(`[${label}] rebuild error: ${err}`);
                }
                logger.debug(
                  `Rebuilt Module [${label}] Successfully with ${res.warnings.length} warnings ${res.warnings}`
                );
              },
            }
          : false,
        ...context,
      });

      const analize = esbuild.analyzeMetafileSync(result.metafile, {
        color: true,
        verbose: true,
      });

      logger.debug(analize);
    } catch (error) {
      logger.error(`[${label}] Build Failed: ${error}`);
    }
  }
})();

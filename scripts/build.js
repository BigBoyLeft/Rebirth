"use strict";
const esbuild = require("esbuild");
const path = require("path");
const Logger = require("@ptkdev/logger");

const isProduction =
  process.argv.findIndex((Item) => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex((Item) => Item === "--watch") >= 0;

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
    debug_log: ".logs/debug.log",
    error_log: ".logs/error.log",
  },
});

(async () => {
  const contexts = [
    {
      label: "client",
      platform: "browser",
      entryPoints: ["./src/code/client/index.ts"],
      outdir: `build/code/client`,
      target: ["chrome93"],
      format: "iife",
    },
    {
      label: "server",
      platform: "node",
      entryPoints: ["./src/code/server/index.ts"],
      outdir: `build/code/server`,
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
                !args.path.match(/^@(server|client|shared)/) &&
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
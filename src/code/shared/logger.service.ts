import Logger from "@ptkdev/logger";
const path = require("path");
const Config = require("@Config");

export const logger: any = new Logger({
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
        debug_log: path.posix.join(GetResourcePath(GetCurrentResourceName()), ".logs", "debug.log"),
        error_log: path.posix.join(GetResourcePath(GetCurrentResourceName()), ".logs", "errors.log"),
    },
});

export const debug = (message: any, tag?: string): void => {
    if (!Config.DeveloperMode) return
    logger.debug(message, tag);
}

export default logger;
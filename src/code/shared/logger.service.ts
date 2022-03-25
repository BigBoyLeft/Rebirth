import Logger from "@ptkdev/logger";
const path = require('path');

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
export default logger;
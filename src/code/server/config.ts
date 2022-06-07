import fs from 'fs';
import IConfig from "@server/interfaces/IConfig";
import Logger from "@server/modules/logger";

let cache: IConfig

/**
 * Framework Configuration
 * @exports
 * @returns {IConfig}
 * @class Config
 */

export default {
    get: (): IConfig | any => {
        if (cache) {
            return cache
        }
        let config: IConfig;

        try {
            config = JSON.parse(LoadResourceFile(GetCurrentResourceName(), "Config.json"));
        } catch (error) {
            Logger.warning("Unable to process Config.json file. Framework Shutting Down...");
            return {error: true}
            // process.exit(1);
        }

        cache = config;

        return config;
    }
}
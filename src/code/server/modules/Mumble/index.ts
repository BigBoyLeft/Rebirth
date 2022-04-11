import logger from "@shared/logger.service";

class Mumble {
    constructor() {
        this.init();
    }

    async init() {
        logger.info("[Rebirth] Loaded Mumble Module.");
    }
}

export default new Mumble();

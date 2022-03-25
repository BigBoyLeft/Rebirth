/**
 * NOTE: This is a work in progress and currently doesnt fully work
 * 
 * It loads the Plugin but i need to implement a container system 
 * which we can use to start/stop/restart the plugin modules
 */

interface IPlugins {
    [key: string]: any;
}

let plugins = new Map<string, Plugin>();;

export class Plugin {
    constructor(name: string, modules: { start: () => void, stop: () => void }) {
        this.name = name;
        this.modules = modules;
        this.start();
        plugins.set(name, this);
    }

    public name: string;
    public modules: { start: Function, stop: () => void };

    public start() {
        this.modules.start();
    }

    public stop() {
        this.modules.stop();
    }

    public restart() {
        console.log('[Rebirth] Restarting plugin: ' + this.name);
        // this.modules.stop();
        // this.modules.start();
    }
}

global.exports("restartPlugin", (plugin: string) => {
    plugins.get(plugin).restart();
})
global.exports("start", (plugin: string) => {
    plugins.get(plugin).start();
})
global.exports("stop", (plugin: string) => {
    plugins.get(plugin).stop();
})
import logger from "@shared/logger.service";

class Chat {
  public SVCommands: Map<number, any> | any;
  constructor() {
    logger.info("[Rebirth] Loaded Chat Module.");
    this.SVCommands = new Map<number, any>();
    global.exports("chatMessage", (source: any, type: string, message: string, icon: string, color: string) => this.newMessage(source, type, message, icon, color));
    global.exports("command", (command: string, description: string, callback?: any) => this.newCommand(command, description, callback));
    global.exports("refeshCommands", (src: any) => this.refreshCommands(src));
    global.exports("refreshCommandsGlobal", () => this.refreshCommandsGlobal());
  }
  
  newMessage(source: any, type: string, message: string, icon: string, color: string) {
    if (!source || !message || !type) return;
    emitNet("Rebirth:Chat:Message", source, type, message, icon, color);
    return true
  }

  newCommand(command: string, description: string, callback?: any) {
    this.SVCommands.set(command, {
      command,
      description,
      callback
    });
    if (callback) RegisterCommand(command, callback, false);
  }

  refreshCommands(src: any) {
    emitNet("Rebirth:Chat:Commands", src, Array.from(this.SVCommands));
  }

  refreshCommandsGlobal() {
    emitNet("Rebirth:Chat:Commands", -1, Array.from(this.SVCommands));
  }
}

export default new Chat();
import logger from "@shared/logger.service";

onNet('Rebirth:Chat:Message', (author: string, color: string, message: string) => {
    console.log("NEW MESSAGE");
})

class Chat {
  constructor() {
    // onNet("Rebirth:Chat:Message", this.messageEntered);
    // onNet("onServerResourceStart", this.refreshCommands);
    // onNet("__cfx_internal:commandFallback", this.fallBack);
    logger.info("[Rebirth] Loaded Chat Module.");
  }

  fallBack() {
    CancelEvent();
  }

  messageEntered(author: string, type: string, message: string) {
    if (!message || !author) return;
    if (!WasEventCanceled()) {
        emitNet('Rebirth:Chat:Message', -1, author, type, message)
    }
  }

  refreshCommands(player: any) {
    for (player in getPlayers()) {
      let Fcommands = GetRegisteredCommands();
      if (Fcommands.length > 0) {
        let commands = [];
        for (let i = 0; i < Fcommands.length; i++) {
          let command: any = commands[i];
          if (IsPlayerAceAllowed(player, `command.${command.name}`)) {
            commands.push({
              name: `/${command.name}`,
            });
          }
        }

        emitNet("Rebirth:Chat:Commands", player, commands);
      }
    }
  }
}

export default new Chat();
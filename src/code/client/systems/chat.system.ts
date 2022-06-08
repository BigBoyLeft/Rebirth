import UI from "@client/controllers/ui.controller";
import PlayerEvents from "@shared/enums/player";
import Utils from "@client/utils/utils";

interface ICommand {
  command: string;
  description: string;
}

interface IMessage {
  type: string;
  message: string;
  icon: string;
  color: string;
}

let commands = new Map<string, ICommand>();

export default class Chat {
  static init() {
    RegisterCommand(
      "+RebirthChatOpen",
      () => {
        UI.setFocus(true);
        UI.appAction("chat", {}, "focus");
      },
      false
    );
    RegisterCommand("-RebirthChatOpen", () => {}, false);
    RegisterKeyMapping("+RebirthChatOpen", "Open  Chat", "keyboard", "t");
  }

  static newMessage(message: IMessage) {
    if (!message) return;

    UI.appAction("chat", message, "newMessage");

    return true;
  }

  static async runCommand(data: any, cb: any) {
    UI.setFocus(false);
    ExecuteCommand(data.command);
    cb(true);
  }

  static hideChat(data: any, cb: any) {
    UI.setFocus(false);
    cb(true);
  }

  static updateCommand(command: string, description: string) {
    if (!command || !description) return;

    UI.appAction("chat", {command, description}, "command");
  }

  static refreshCommands() {
      UI.appAction("chat", {commands: Array.from(commands)}, "commands");
  }

  static registerCommand(command: string, description: string, callback?: Function) {
    Chat.updateCommand(command, description);
    if (callback) {
      RegisterCommand(command, callback, false);
    }
    commands.set(command, {command, description});
  }
}

global.exports("registerCommand", Chat.registerCommand);
global.exports("refreshCommands", Chat.refreshCommands);
global.exports("newMessage", Chat.newMessage);
global.exports("hideChat", Chat.hideChat);

UI.registerUICallback("chat", "command", Chat.runCommand);
UI.registerUICallback("chat", "hide", Chat.hideChat);

onNet(PlayerEvents.CHAT_COMMANDS, async (commands: any) => {
    for (const command of commands) {
        Chat.registerCommand(command.command, command.description);
        await Utils.sleep(50);
    }
})

Chat.init();
import API from "@client/modules/ui/api";

interface ICommand {
  command: string;
  description: string;
}


let commands = new Map<string, ICommand>();
class Chat {
  isFocused = false;
  constructor() {
    this.isFocused = false;
    this.init();
    this.NUICallbacks();
    SetTextChatEnabled(false);
    onNet("Rebirth:Chat:Message", this.newMessage);
  }

  init() {
    RegisterCommand(
      "+Rebirthchatidk",
      () => {
        this.isFocused = true;
        SetNuiFocus(true, true);
        exports["Rebirth"].appAction("chat", {}, "focus");
      },
      false
    );
    RegisterCommand("-Rebirthchatidk", () => {}, false);
    RegisterKeyMapping("+Rebirthchatidk", "Open Chat", "keyboard", "t");
    global.exports("chat_message", this.newMessage);
  }

  newMessage(type: string, message: string, icon: string, color: string) {
    if (!message || !type) return;
    exports["Rebirth"].appAction("chat", {
      message,
      type,
      icon,
      color,
    }, "message");
    return true
  }

  NUICallbacks() {
    API.registerAPI("chat");
    API.registerUICallback("chat", "command", async (data: any, cb: any) => {
      this.isFocused = false;
      SetNuiFocus(false, false);
      ExecuteCommand(data.command);
      cb(true);
    });
    API.registerUICallback("chat", "hide", async (data: any, cb: any) => {
      this.isFocused = false;
      SetNuiFocus(false, false);
      cb(true);
    });
  }

  setCommand(command: string, description: string) {
    exports["Rebirth"].appAction("chat", { command, description }, "command");
  }

  refreshCommands() {
    exports["Rebirth"].appAction("chat", { commands: Array.from(commands) }, "commands");
  }
}
let chat = new Chat()

function newCommand(command: string, description: string, callback?: any) {
  chat.setCommand(command, description);
  if (callback) {
    RegisterCommand(command, callback, false);
  };
  commands.set(command, { command, description });
}
global.exports("newCommand", newCommand);
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
onNet("Rebirth:Chat:Commands", async (commands: any) => {
  for (var i = 0; i < commands.length; i++) {
    let command = commands[i][1];
    newCommand(command.command, command.description);
    await sleep(50);
  }
})

export default chat;

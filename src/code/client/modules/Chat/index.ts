import API from "@client/modules/ui/api";

let exps = global.exports;

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
        exports["Rebirth"].appEvent("chat", "focus", {});
      },
      false
    );
    RegisterCommand("-Rebirthchatidk", () => {}, false);
    RegisterKeyMapping("+Rebirthchatidk", "Open Chat", "keyboard", "t");
    exps("chat_message", this.newMessage);
  }

  newMessage(type: string, message: string, icon: string, color: string) {
    if (!message || !type) return;
    exports["Rebirth"].appEvent("chat", "message", {
      message,
      type,
      icon,
      color,
    });
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
    exports["Rebirth"].appEvent("chat", "command", { command, description });
  }
}
let chat = new Chat()

function newCommand(command: string, description: string, callback: any) {
  chat.setCommand(command, description);
  RegisterCommand(command, (source: any, args: any) => {
    callback(source, args)
  }, false);
  commands.set(command, { command, description });
}
exps("newCommand", newCommand);

export default chat;

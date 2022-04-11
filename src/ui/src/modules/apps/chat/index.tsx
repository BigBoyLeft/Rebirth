import "./index.scss";
import { useRef, useState } from "react";
import { useAppEvent } from "@services/useEvent";

import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Fade from "@mui/material/Fade";

import axios from "axios";
import { useExitListener } from "@/hooks/useExitListener";
import { Slide } from "@mui/material";

var index = -1
const Chat = () => {
  const [canShowHistory, setCanShowHistory] = useState(false);
  const [canShowInput, setCanShowInput] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [Fcommands, setFcommands] = useState([]);
  const [commands, setCommands] = useState([]);
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  let input = useRef(null);

  const HandleChange = (event: any) => {
    event.preventDefault();
  };
  const handleInputDown = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (commandHistory.length > 0) {
        if (event.key === "ArrowUp") {
          if (index + 1 < commandHistory.length) {
            index++;
          }
        } else if (event.key === "ArrowDown") {
          if (index - 1 > -1) {
            index--
          } else {
            index = -1
          }
        }
        if (index > -1) {
          setChatInput(commandHistory[index]);
        } else setChatInput("");
      }
    } else {
      setChatInput(event.target.value);
    }
  };

  function handleChange(event: any) {
    setChatInput(event.target.value);
    let fcommands: any = [];
    if (event.target.value.startsWith("/")) {
      commands.map((command: any, index: any) => {
        if (
          command.command.includes(
            event.target.value.toLowerCase().split("/")[1].split(" ")[0]
          )
        ) {
          fcommands.push({
            command: command.command,
            description: command.description,
            show: true,
          });
        } else {
          fcommands.push({
            command: command.command,
            description: command.description,
            show: false,
          });
        }
      });
      setFcommands(fcommands);
    }
  }
  useAppEvent("chat", "command", (data: any) => {
    setCommands([...commands, data]);
  });
  function sendMessage() {
    let msg = chatInput.toLowerCase();
    if (msg.startsWith("/")) {
      axios.post("https://Rebirth/chat/command", {
        command: msg.split("/")[1],
      });
      let cmds = [...commandHistory]
      cmds.unshift(msg);
      setCommandHistory(cmds);
      index = -1
      hideInput(false);
    } else {
      hideInput(true);
    }
  }

  useAppEvent("chat", "message", (data: any) => {
    setHistory([
      ...history,
      {
        id: history.length + 1,
        type: data.type,
        message: data.message,
        icon: data.icon,
        color: data.color,
      },
    ]);
    setCanShowHistory(true);
    setTimeout(() => {
      setCanShowHistory(false);
    }, 2500)
  });

  function setInputCommand(command: string) {
    setChatInput(`/${command}`);
  }
  let idk = false;
  useExitListener(() => {
    setChatInput("");
    setCanShowInput(false);
    setCanShowHistory(false);
    axios.post("https://Rebirth/chat/hide");
  });

  useAppEvent("chat", "focus", (data: any) => {
    setChatInput("");
    setCanShowInput(true);
    setCanShowHistory(true);
    input.current.focus();
  });

  function hideInput(status: boolean = false) {
    if (status) {
      axios.post("https://Rebirth/chat/hide");
    }
    setChatInput("");
    setCanShowInput(false);
  }

  return (
    <div className="UI_CHAT">
      <Slide in={canShowHistory} unmountOnExit mountOnEnter direction="right">
        <ul className="UI_CHAT_WRAPPER" id="UI_CHAT_WRAPPER">
          {Array.from(history)
            .reverse()
            .map((item: any, index: any) => (
              <li key={item.type+"_"+index} className={`UI_CHAT_MESSAGE ${item.color}`}>
                <div className="UI_CHAT_MESSAGE_ICON green">
                  <Icon>{item?.icon}</Icon>
                </div>
                <div className="UI_CHAT_MESSAGE_TITLE">
                  {item?.type.toUpperCase()}
                </div>
                <div className="UI_CHAT_MESSAGE_MESSAGE">{item?.message}</div>
              </li>
            ))}
        </ul>
      </Slide>
      <Slide in={canShowInput} direction="right">
        <div className="UI_CHAT_INPUT">
          <input
            placeholder="/command"
            autoFocus
            spellCheck={false}
            value={chatInput}
            onKeyDown={handleInputDown}
            onBlur={HandleChange}
            onChange={(event: any) => handleChange(event)}
            type="text"
            ref={input}
          />
        </div>
      </Slide>
      <Slide in={chatInput !== ""} direction="right">
        <ul className="UI_CHAT_SUGGESTIONS">
          {Fcommands.map((item: any, index: any) => (
            <Slide mountOnEnter unmountOnExit in={item.show} direction="right">
              <li
                key={item.name+"_"+index}
                onClick={() => setInputCommand(item.command)}
                className="UI_CHAT_SUGGESTIONS_SUGGESTION"
              >
                <div className="UI_CHAT_SUGGESTIONS_ICON">
                  <Icon>keyboard_command_key</Icon>
                </div>
                <div className="UI_CHAT_SUGGESTIONS_NAME">{item.command}</div>
                <div className="UI_CHAT_SUGGESTIONS_DESCIRPTION">
                  {item.description}
                </div>
              </li>
            </Slide>
          ))}
        </ul>
      </Slide>
    </div>
  );
};

export default Chat;

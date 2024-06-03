import React from "react";
import config from "../../../../chatbot/config";
import ActionProvider from "../../../../chatbot/ActionProvider";
import MessageParser from "../../../../chatbot/MessageParser";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

function ChatBot() {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatBot;

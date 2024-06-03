import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    function sayHello(){
        const botMessage = createChatBotMessage('Hello. Nati.');

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));  
    }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {sayHello},
        });
      })}
    </div>
  );
};

export default ActionProvider;
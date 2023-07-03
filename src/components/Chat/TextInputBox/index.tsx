import React, { useContext, useState } from 'react';
import { WebSocketContext } from '../WebSocketProvider';

function TextInputBox() {
  const [message, setMessage] = useState('');
  const ws = useContext(WebSocketContext);

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    ws.current.send(
      JSON.stringify({
        chat: message,
      })
    );

    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleChangeText} />
      <button type="button" onClick={handleClickSubmit}>
        Send
      </button>
    </div>
  );
}

export default TextInputBox;

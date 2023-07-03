import React, { useRef } from 'react';
import * as SockJs from 'sockjs-client';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const webSocketUrl = `ws://localhost:6000/ws`;
  let ws = useRef<WebSocket | null>(null);

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log('connected to ' + webSocketUrl);
    };
    ws.current.onclose = (error) => {
      console.log('disconnect to ' + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = (error) => {
      console.log('connection error ' + webSocketUrl);
      console.log(error);
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

export default WebSocketProvider;

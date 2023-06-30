import { useState, useEffect, useRef } from 'react';

import { AxiosInstance } from 'axios';
import axiosInstance from '../../apis';
import io from 'socket.io-client';

import Messages from './Messages/Messages';

function Chat() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState(
    [] as { message: string; username: string }[]
  );
  const [message, setMessage] = useState('');

  const socketClient = useRef<SocketIOClient.Socket>();
  // const SOCKET_CLIENT = useRef();
  useEffect(() => {
    // 1. client 측에서 서버 연결(connection)
    socketClient.current = io.connect('http://localhost:5000');

    // 6. server로부터 receive-message를 받으면, 화살표 함수 실행하기
    socketClient.current.on(
      'receive-message',
      (message: { message: string; username: string }) => {
        setMessages((prev) => [...prev, message]);
      }
    );

    // 7. return문으로 disconnect() 실행
    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [username]);

  const SERVER_URL = 'http://localhost:6000';
  // Username 받아오기(setUsername)
  // const getUsername = async () => {
  //   const instance: AxiosInstance = axiosInstance();
  //   const sendMessage = await instance.get(
  //     `${SERVER_URL}/websocket/pub/message/${roomId}`
  //   );
  //   setUsername(sendMessage.userId);
  // };
  const userId = '임경락';
  setUsername(userId);
  // 메시지 발송 handler
  const handleSendMessage = () => {
    if (socketClient.current) {
      setMessages((prev) => [...prev, { message, username }]);
      socketClient.current.emit('message', { message, username });
      setMessage('');
    }
  };

  return (
    <Messages
      handleSendMessage={handleSendMessage}
      setMessage={setMessage}
      messages={messages}
      message={message}
      username={username}
    />
    // <div>chat</div>
  );
}

export default Chat;

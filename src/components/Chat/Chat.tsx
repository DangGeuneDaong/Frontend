// 230702 (4)
import * as S from './styles';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';
import { AxiosInstance } from 'axios';

import axiosInstance from '../../apis';
import Message from './Message/Message';
import Input from '../Form/Input';
import Button from '../Button';

interface OfferPageProps {
  roomId: number;
  userId: string;
}

function Chat({ roomId, userId }: OfferPageProps) {
  let stomp: any;

  const [messages, setMessages] = useState(
    [] as {
      message: string;
      userId: string;
      // sendAt: string;
      // messageType: string;
    }[]
  );
  const [message, setMessage] = useState('');

  let sockjsClient = useRef();
  const SERVER_URL = 'http://13.209.220.63';

  useEffect(() => {
    // ["websocket", "xhr-streaming", "xhr-polling"]
    const sock = new SockJS(`${SERVER_URL}`, null, {
      transports: ['websocket'],
    });
    stomp = webstomp.over(sock);
    // Chat 서버 연결
    sockjsClient = stomp.connect('/websocket');

    // subscribe로 메시지 받기
    stomp.subscribe(
      `/websocket/sub/${roomId}`,
      (messages: {
        message: string;
        userId: string;
        // sendAt: string;
        // messageType: string;
      }) => {
        setMessages((prev) => [...prev, messages]);
      }
    );
  }, []);

  // 메시지 발송 handler
  const handleSendMessage = () => {
    // 2. 메시지 발송하기
    if (sockjsClient.current) {
      setMessages((prev) => [
        ...prev,
        {
          message,
          userId,
          // sendAt,
          // messageType
        },
      ]);
      stomp.send(`/websocket/pub/message/${roomId}`, {
        message,
        userId,
        // sendAt,
        // messageType,
      });
      setMessage('');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  // setValue('message', message);

  return (
    <>
      <div className="messages">
        <ul id="messages">
          {messages.map((message, i) => (
            <Message
              key={i + message.userId}
              message={message}
              messageReceived={
                message.userId !== userId
                  ? 'message received'
                  : 'message sended'
              }
            />
          ))}
        </ul>

        <div>
          <S.Form onSubmit={handleSubmit(handleSendMessage)}>
            <Input
              placeholder={'메시지를 입력해주세요!'}
              errors={errors}
              containerType="content"
              {...register('message', { required: '메시지가 없습니다!' })}
            />
            <Button>보내기</Button>
          </S.Form>
        </div>
      </div>
    </>
  );
}

export default Chat;

// 230701 (3)
// import { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';

// function Chat() {
//   const [live, setLive] = useState<any>(false); // 채팅 토클 상태
//   const [message, setMessage] = useState<any>(''); // 메시지 유저 및 내용
//   const [serverUrl, setServerUrl] = useState<any>(''); // 서버 url
//   const [chat, setChat] = useState<any>([]); // 서버로부터 받아온 내용
//   const [sockjs, setSockjs] = useState<any>();
//   const [receivedData, setReceivedData] = useState<any>('');

//   useEffect(() => {
//     console.log(chat);
//   }, [chat]);

//   useEffect(() => {
//     if (receivedData === '') return;
//     setChat([...chat, { name: 'Server', message: receivedData }]);
//   }, [receivedData]);

//   const onClickConnectButton = () => {
//     const sock = new SockJS('http://localhost:6000');
//     sock.onmessage = function (e: any) {
//       setReceivedData(e.data);
//       console.log(e.data);
//     };
//     setSockjs(sock);
//     setChat([...chat, { name: 'testUser', message: '님이 입장하셨습니다.' }]);
//     setLive(true);
//   };
//   const onClickDisconnectButton = () => {
//     setLive(false);
//   };
//   const inputMessage = (e: any) => {
//     setMessage(e.target.value);
//   };
//   const onEnter = (e: any) => {
//     if (e.keyCode === 13) {
//       sendMessage();
//     }
//   };
//   const sendMessage = () => {
//     if (message === '') return;
//     setChat([...chat, { name: 'testUser', message: message }]);
//     console.log(message);
//     console.log(sockjs);
//     sockjs?.send(message);
//     setMessage('');
//   };
//   const setChatServerURL = (e: any) => {
//     setServerUrl(e.target.value);
//   };
//   const renderChat = () => {
//     console.log(chat);
//     return chat.map(({ name, message }: any, index: number) => (
//       <div key={index}>
//         <>
//           {name}: <>{message}</>
//         </>
//       </div>
//     ));
//   };

//   return (
//     <div className="chatting_container">
//       {!live && (
//         <>
//           <>Chrome Extension Chatting Application</>
//           <input
//             className="chatting_urlInput"
//             type="text"
//             placeholder="URL을 입력해주세요"
//             onChange={setChatServerURL}
//             value={serverUrl}
//           />
//           <button
//             className="chatting_connectButton"
//             onClick={onClickConnectButton}
//           >
//             연결
//           </button>
//         </>
//       )}
//       {live && (
//         <>
//           <div className="chattig_Room">{renderChat()}</div>
//           <input
//             className="chatting_messageInput"
//             type="text"
//             placeholder="메시지를 입력해주세요"
//             onChange={inputMessage}
//             onKeyDown={onEnter}
//             value={message}
//           />
//           <button className="chatting_sendMessage" onClick={sendMessage}>
//             전송
//           </button>
//           <br />
//           <button
//             className="chatting_disConnectButton"
//             onClick={onClickDisconnectButton}
//           >
//             연결 끊기
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Chat;

// 230701 (2)
// import React from 'react';
// import WebSocketProvider from './WebSocketProvider';
// import Chatting from './Chatting';
// import TextInputBox from './TextInputBox';

// function Chat() {
//   return (
//     <div>
//       <WebSocketProvider>
//         <Chatting />
//         <TextInputBox />
//       </WebSocketProvider>
//     </div>
//   );
// }

// export default Chat;

// 230701
// import * as S from './styles';

// import { useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// function Chat() {
//   let socket = io();
//   // let input = useRef();

//   // const [messageValue, setMessageValue] = useState;
//   let messages = document.getElementById('messages') as HTMLElement;
//   let form = document.getElementById('form') as HTMLFormElement;
//   let input = document.getElementById('input') as HTMLInputElement;

//   function submitValue(e: any) {
//     e.preventDefault();
//     if (input.value) {
//       socket.emit('chat message', input.value);
//       input.value = '';
//     }
//   }

//   useEffect(() => {
//     // form?.addEventListener('submit', function (e) {
//     //   e.preventDefault();
//     //   if (input.value) {
//     //     socket.emit('chat message', input.value);
//     //     input.value = '';
//     //   }
//     // });

//     socket.on('chat message', (message: any) => {
//       const item = document.createElement('li');
//       item.textContent = message;
//       messages?.appendChild(item);
//       window.scrollTo(0, document.body.scrollHeight);
//     });
//   }, []);

//   return (
//     <S.Container>
//       <S.UlContainer id="messages"></S.UlContainer>
//       <S.Form id="form" action="" onSubmit={submitValue}>
//         <S.Input id="input" autoComplete="off" />
//         <button type="submit">Send</button>
//       </S.Form>
//     </S.Container>
//   );
// }

// export default Chat;

// 230630;
// // import { useState, useEffect, useRef } from 'react';

// // import { AxiosInstance } from 'axios';
// // import axiosInstance from '../../apis';
// import io from 'socket.io-client';

// // import Messages from './Messages/Messages';
// import Input from '../Form/Input';
// import { useForm } from 'react-hook-form';
// import Button from '../Button';

// function Chat() {
//   const [username, setUsername] = useState('');
//   const [messages, setMessages] = useState(
//     [] as { message: string; username: string }[]
//   );
//   const [message, setMessage] = useState('');

//   const socketClient = useRef<SocketIOClient.Socket>();
//   // const SOCKET_CLIENT = useRef();
//   useEffect(() => {
//     // 1. client 측에서 서버 연결(connection)
//     socketClient.current = io.connect('http://localhost:6000');

//     // 6. server로부터 receive-message를 받으면, 화살표 함수 실행하기
//     socketClient.current.on(
//       'receive-message',
//       (message: { message: string; username: string }) => {
//         setMessages((prev) => [...prev, message]);
//       }
//     );

//     // 7. return문으로 disconnect() 실행
//     return () => {
//       socketClient.current?.disconnect();
//       socketClient.current = undefined;
//     };
//   }, []);

//   const SERVER_URL = 'http://localhost:6000';
//   // Username 받아오기(setUsername)
//   const getUsername = async () => {
//     const sendMessage = await instance.get(
//       `${SERVER_URL}/websocket/pub/message/${roomId}`
//     );
//     setUsername(sendMessage.userId);
//   };

//   // 메시지 발송 handler
//   const handleSendMessage = () => {
//     if (socketClient.current) {
//       setMessages((prev) => [...prev, { message, username }]);
//       socketClient.current.emit('message', { message, username });
//       setMessage('');
//     }
//   };

//   return (
//     <Messages
//       handleSendMessage={handleSendMessage}
//       setMessage={setMessage}
//       messages={messages}
//       message={message}
//       username={username}
//     />
//     // <div>chat</div>
//   );
// }

// export default Chat;

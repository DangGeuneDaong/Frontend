// // 230711 (5) Spring document 참고
// import React from 'react';
// import SockJS from 'sockjs-client';
// import webstomp from 'webstomp-client';
// import StompJs from '@stomp/stompjs';

// function Chat() {
//   const SERVER_URL = 'ws://13.209.220.63';
//   const stompClient = new StompJs.Client({
//     brokerURL: `${SERVER_URL}/websocket`, // WebSocketConfig.java 파일의 addEndpoints
//   });

//   stompClient.onConnect = (frame) => {
//     setConnected(true);
//     console.log('Connected: ', + frame);
//     stompClient.subscribe('/sub', (greeting) => {
//       // WebSocketConfig.java 파일의 enableSimpleBroker('/sub')
//       showGreeting(JSON.parse(greeting.body).content);
//     });
//   };

//   stompClient.onWebSocketError = (error) => {
//     console.error('Error with websocket: ', error);
//   };

//   stompClient.onStompError = (frame) => {
//     console.error('Broker reported error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
//   };

//   function setConnected(connected) {
//     $('#connect').prop('disabled', connected);
//     $('#disconnect').prop('disabled', !connected);
//     if (connected) {
//       $('#conversation').show();
//     } else {
//       $('#conversation').hide();
//     }
//     $('#greetings').html('');
//   }

//   function connect() {
//     stompClient.activate();
//   }
//   function disconnect() {
//     stompClient.deactivate();
//     setConnected(false);
//     console.log('Disconnected!!!!!!');
//   }
//   function sendName() {
//     stompClient.publish({
//       destination: `/pub/message`,
//       body: JSON.stringify({ name: $('#name').val() }),
//     });
//   }
//   function showGreeting(message) {
//     $('#greetings').append('<tr><td>' + message + '</td></tr>')
//   }
//   $(function () {
//     $('form').on('submit', (e) => e.preventDefault())
//     $('#connect').click(() => connect())
//     $('#disconnect').click(() => disconnect());
//     $('#send').click(() => sendName())
//   })

//   return <div>Chat</div>;
// }

// export default Chat;

// 230702 (4)
import * as S from './styles';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import SockJS from 'sockjs-client';
import StompJs from '@stomp/stompjs';
// import webstomp from 'webstomp-client';
// import stomp from 'stomp-client';
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
  // 1. client 객체 만들기
  const client = new StompJs.Client({
    // brokerURL: `ws://3.36.236.207/ws`,
    // const SERVER_URL = 'ws://13.209.220.63';
    brokerURL: `ws://13.209.220.63/websocket`,
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000, //자동 재연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  // 2. 연결하기
  client.onConnect = function (frame) {};
  // 에러처리하기
  client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  client.activate();
  // 3. 메시지 보내기
  function send(e: any) {
    e.preventDefault();
    const message = document.querySelector('.message') as HTMLInputElement;
    // console.log('stompClient on Send: ', stompClient);
    // stompClient.send(`/pub/message/29`, console.log('send Message'));

    client.publish({
      destination: '/websocket/pub/message/29',
      body: message.value,
      headers: { priority: '9' },
    });

    message.value = '';
    console.log('message on send!! Finished');
  }
  // 4. 메시지 받기
  // const subscription =
  client.subscribe('/websocket/sub/29', function () {
    console.log('callback function position!!!!!');
  });

  return (
    <>
      <div>
        <input type="text" className="message" />
        <button onClick={send} className="send-btn">
          보내기
        </button>
      </div>
      <div className="messages">
        <div id="messages"></div>
      </div>
    </>
  );
}

export default Chat;

// function Chat({ roomId, userId }: OfferPageProps) {
//   const SERVER_URL = 'http://13.209.220.63';

//   let stompClient: any;
//   // document.addEventListener('DOMContentLoaded', function () {
//   // ["websocket", "xhr-streaming", "xhr-polling"]
//   // 1. socket 객체 만들기
//   const socket = new SockJS(`${SERVER_URL}/websocket`);
//   // console.log('socket on new SockJS: ', socket);
//   stompClient = webstomp.over(socket);
//   // 2. 연결하기
//   stompClient.connect({}, function (frame: any) {
//     console.log('Connected!!');
//     // 4. 메시지 받기
//     stompClient.subscribe(
//       `/sub/${roomId}`,
//       // console.log('message on subscribe!!!!!!!!!!')
//         function (frame: any) {
//         const messages = document.querySelector('#messages') as HTMLDivElement;
//         const message = document.createElement('li');
//         message.innerText = frame.body;
//         messages.appendChild(message);
//       }
//     );
//   });
//   // });
//   // 3. 메시지 보내기
//   function send(e: any) {
//     e.preventDefault();
//     const message = document.querySelector('.message') as HTMLInputElement;
//     // console.log('stompClient on Send: ', stompClient);
//     stompClient.send(`/pub/message/29`, message.value);
//     message.value = '';
//   }

//   return (
//     <>
//       <div>
//         <input type="text" className="message" />
//         <button onClick={send} className="send-btn">
//           보내기
//         </button>
//       </div>
//       <div className="messages">
//         <div id="messages"></div>
//       </div>
//     </>
//   );
// }

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

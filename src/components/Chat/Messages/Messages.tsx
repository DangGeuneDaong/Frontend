import Message from '../Message/Message';

interface ChatProps {
  handleSendMessage: Function;
  setMessage: Function;
  messages: {
    message: string;
    username: string;
  }[];
  message: string;
  username: string;
}

function Messages({
  handleSendMessage,
  setMessage,
  messages,
  message,
  username,
}: ChatProps) {
  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <Message
            key={i + message.username}
            message={message}
            messageReceived={
              message.username !== username
                ? 'message received'
                : 'message sended'
            }
          />
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="type"
          placeholder="메시지를 입력해주세요!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messages;

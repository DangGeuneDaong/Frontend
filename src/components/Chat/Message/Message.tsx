import * as S from './styles';
import Moment from 'react-moment';

export interface MessageCSSProps {
  messageReceived?: 'message received' | 'message sended';
}

interface MessagesProps extends MessageCSSProps {
  message: {
    message: string;
    userId: string;
  };
}

function Message({ message }: MessagesProps) {
  return (
    <S.MessageListContainer>
      <li>
        <span>{message.userId}</span>
        <Moment format="MM/DD/YYYY h:mm:ss">{Date.now()}</Moment>
        <p>{message.message}</p>
      </li>
    </S.MessageListContainer>
  );
}

export default Message;

import React, { useState } from 'react';
import { AxiosInstance } from 'axios';

import axiosInstance from '../../apis';
// import Chat from '../Chat/Chat';

function ChatArea() {
  const [checkIds, setCheckIds] = useState<boolean>(false);
  const [showCreatedChatTakerlists, setShowCreatedChatTakerlists] = useState(
    []
  );
  const [showCreatedChatOfferlists, setShowCreatedChatOfferlists] = useState(
    []
  );

  const SERVER_URL = 'http://13.209.220.63';
  // const SERVER_URL = 'http://localhost:5000';

  const instance: AxiosInstance = axiosInstance();
  const result_data = instance.get(`${SERVER_URL}/chat/create`);
  setShowCreatedChatTakerlists(result_data.takerId);
  setShowCreatedChatOfferlists(result_data.offerId);

  if (showCreatedChatTakerlists && showCreatedChatOfferlists) {
    setCheckIds(true);
  }

  return (
    <>
      {checkIds && (
        <>
          {}
          {/* <Chat /> */}
        </>
      )}
    </>
  );
}

export default ChatArea;

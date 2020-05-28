import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import API_URL from '../utils/apiConn';

const socket = socketIOClient(API_URL);

const TestRoom = () => {
  const [chat, setChat] = useState([]);
  const [chatRoom, setChatRoom] = useState(window.location.href.split('/').pop().toString());
  const [message, setMessage] = useState('');


  const mockUser = {
    _id: 12345,
    firstName: 'Lockett',
    lastName: 'Pundt',
  };

  const getMessages = (data) => {
    setChat([...chat, data]);
  };

  useEffect(() => {
    const connectToRoom = () => {
      socket.on('connect', () => {
        socket.emit('join',
          {
            ...mockUser,
            chatRoom,
            timeJoined: new Date(),
          });
      });
    };
    connectToRoom();
  });

  useEffect(() => {
    socket.on('newMessage', (data) => {
      getMessages(data);
    });
    socket.on('greet', (data) => {
      console.log(data);
    });
  });


  const sendTest = (e) => {
    e.preventDefault();
    socket.emit('message',
      {
        ...mockUser,
        chatRoom,
        message,
        messageTime: new Date(),
      });
    setMessage('');
  };

  return (
    <div>
      {chat.map((item) => (
        <p key={item.messageTime}>
          {item.firstName}
          :
          {' '}
          {item.message}
          {' '}
          {item.messageTime}
        </p>
      ))}
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="button"
        onClick={(e) => sendTest(e)}
      >
        Send
      </button>
    </div>
  );
};


export default TestRoom;

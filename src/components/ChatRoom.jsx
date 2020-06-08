import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import API_URL from '../utils/apiConn';

const socket = socketIOClient(API_URL);

const ChatRoom = () => {
  const [chat, setChat] = useState([]);
  const [chatRoomName, setChatRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [typingMessage, setTypingMessage] = useState('');

  useEffect(() => {
    setChatRoomName(localStorage.getItem('chatRoomName'));
    setUserName(localStorage.getItem('userName'));
    console.log('hi');
    const connectToRoom = () => {
      socket.on('connect', () => {
        socket.emit('join',
          {
            userName,
            chatRoomName,
            timeJoined: new Date(),
          });
      });
    };
    connectToRoom();
  }, []);

  useEffect(() => {
    socket.on(`${chatRoomName}newMessage`, (data) => {
      console.log('incoming message', data); // shows incoming messages for now.
      setChat([...chat, data]);
    });
    return () => socket.off();
  });


  useEffect(() => {
    socket.on(`${chatRoomName}typing`, (data) => {
      if (userName !== data.userName) {
        setTypingMessage(`${data.userName} is typing...`);
        setTimeout(() => {
          setTypingMessage('');
        }, 3000);
      }
    });
    return () => socket.off();
  });


  const inputOnChange = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', {
      userName,
      chatRoomName,
    });
  };


  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message',
      {
        userName,
        chatRoomName,
        message,
        messageTime: new Date(),
      });
    setMessage('');
  };

  const logOut = () => {
    localStorage.removeItem('chatRoomName');
    localStorage.removeItem('userName');
  };

  return (
    <div>
      <p>
        You are in
        {' '}
        {chatRoomName}
      </p>
      <a href="/">Home</a>
      <a type="button" href="/" onClick={logOut}>Leave</a>
      {chat.map((item) => (
        <p key={item.messageTime}>
          {item.userName}
          :
          {' '}
          {item.message}
          {' '}
          {item.messageTime}
        </p>
      ))}
      <div>
        {typingMessage}
      </div>
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => inputOnChange(e)}
      />
      <button
        type="button"
        onClick={(e) => sendMessage(e)}
      >
        Send
      </button>
    </div>
  );
};


export default ChatRoom;

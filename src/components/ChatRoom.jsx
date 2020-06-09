import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
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
    const getChatHistory = async (room) => {
      // console.log('this is the room: ', room);
      const response = await axios.get(`${API_URL}api/chathistory/${room}`);
      // console.log('chat history data: ', response.data);
      return setChat([...response.data]);
    };
    getChatHistory(localStorage.getItem('chatRoomName'));
    const connectToRoom = () => {
      socket.on('connect', () => {
        socket.emit('join',
          {
            userName: localStorage.getItem('userName'),
            chatRoomName: localStorage.getItem('chatRoomName'),
            timeJoined: new Date(),
          });
      });
    };
    connectToRoom();
  }, []);

  useEffect(() => {
    socket.on(`${chatRoomName}newMessage`, (data) => {
      // console.log('incoming message', data); // shows incoming messages for now.
      setChat([...chat, data]);
    });
    return () => socket.off(`${chatRoomName}newMessage`);
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
    return () => socket.off(`${chatRoomName}typing`);
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
    const messageData = {
      userName,
      chatRoomName,
      message,
      messageTime: new Date(),
    };
    socket.emit('message', messageData);
    axios.post(`${API_URL}api/messages`, messageData);
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

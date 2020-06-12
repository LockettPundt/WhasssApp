import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
  Box, Text, FormField, Button, TextInput,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/apiConn';
import Message from './Message';

const socket = socketIOClient(API_URL);

const ChatRoom = () => {
  const [chat, setChat] = useState([]);
  const [chatRoomName, setChatRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [typingMessage, setTypingMessage] = useState('');

  function scrollDown() {
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

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
            lastAccess: new Date(),
          });
      });
    };
    connectToRoom();
    scrollDown();
  }, []);

  useEffect(() => {
    socket.on(`${chatRoomName}newMessage`, (data) => {
      // console.log('incoming message', data); // shows incoming messages for now.
      setChat([...chat, data]);
    });
    scrollDown();
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
    scrollDown();
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
    scrollDown();
  };

  const logOut = () => {
    localStorage.removeItem('chatRoomName');
    localStorage.removeItem('userName');
  };

  return (
    <Box
      margin={{
        top: 'small',
        horizontal: 'large',
      }}
    >
      <h3>
        {chatRoomName}
      </h3>
      <a href="/">Home</a>
      <a type="button" href="/" onClick={logOut}>Leave</a>
      <Box
        id="chatBox"
        height="60vh"
        overflow="scroll"
      >
        {chat.map((item) => (
          <Message
            key={item.messageTime}
            userName={userName}
            author={item.userName}
            message={item.message}
            messageTime={item.messageTime}
          />
        ))}

      </Box>

      <div>
        {typingMessage}
      </div>
      <Box
        margin={{
          top: 'medium',
        }}
        direction="row"
        align="center"
        gap="medium"
      >

        <TextInput
          placeholder="message"
          value={message}
          onChange={(e) => inputOnChange(e)}
        />
        <Button
          type="button"
          onClick={(e) => sendMessage(e)}
          margin="small"
          label="Send"
        />
      </Box>
    </Box>
  );
};


export default ChatRoom;

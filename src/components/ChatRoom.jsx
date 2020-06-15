import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import {
  Box, Text, Button, TextInput, Form,
} from 'grommet';
import { Send, Run } from 'grommet-icons';
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
  const history = useHistory();

  function scrollDown() {
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  useEffect(() => {
    setChatRoomName(localStorage.getItem('chatRoomName'));
    setUserName(localStorage.getItem('userName'));
    const getChatHistory = async (room) => {
      const response = await axios.get(`${API_URL}api/chathistory/${room}`);
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
      setChat([...chat, data]);
    });
    scrollDown();
    return () => socket.off(`${chatRoomName}newMessage`);
  });


  useEffect(() => {
    socket.on(`${chatRoomName}typing`, (data) => {
      if (userName !== data.userName) {
        if (!typingMessage.includes(data.userName)) {
          setTypingMessage(`${data.userName} is typing...`);
          setTimeout(() => {
            setTypingMessage('');
          }, 3000);
        }
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
    if (!message.length) return false;
    const messageData = {
      userName,
      chatRoomName,
      message,
      messageTime: new Date(),
    };
    socket.emit('message', messageData);
    axios.post(`${API_URL}api/messages`, messageData);
    scrollDown();
    return setMessage('');
  };

  const logOut = () => {
    localStorage.removeItem('chatRoomName');
    localStorage.removeItem('userName');
    history.push('/');
  };

  return (
    <Box
      margin={{
        top: 'medium',
        horizontal: 'large',
      }}
      height="95vh"
      background={{
        color: '#fefefa',
      }}
      pad="medium"
      elevation="small"
      round="xxsmall"
    >
      <Box
        responsive
        direction="row"
        alignContent="center"
        justify="between"
        margin={{
          vertical: 'small',
        }}
      >
        <Text
          weight="900"
          size="xlarge"
        >
          {chatRoomName}
        </Text>
        <Button
          alignSelf="end"
          type="button"
          onClick={logOut}
          icon={(
            <Run
              color="#FFC0CB"
              size="2.5rem"
            />
          )}
        />
      </Box>
      <Box
        elevation="small"
        id="chatBox"
        height="90%"
        overflow={{
          vertical: 'scroll',
        }}
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
      <Box
        height="10px"
      >
        <Text
          size="medium"
        >
          {typingMessage}
        </Text>
      </Box>
      <Form
        onSubmit={(e) => sendMessage(e)}
      >
        <Box
          margin={{
            top: 'medium',
          }}
          direction="row"
          align="center"
          gap="medium"
        >

          <TextInput
            focusIndicator="false"
            placeholder="message"
            value={message}
            onChange={(e) => inputOnChange(e)}
          />
          <Button
            primary
            type="button"
            onClick={(e) => sendMessage(e)}
            margin="small"
            icon={<Send />}
          />
        </Box>
      </Form>
    </Box>
  );
};


export default ChatRoom;

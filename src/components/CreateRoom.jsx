import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {
  Button, Text, Box, Form, FormField,
} from 'grommet';
import API_URL from '../utils/apiConn';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomNamePlaceholder, setRoomNamePlaceholder] = useState('Enter a Room Name');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const chatRoomInfo = {
      chatRoomName: roomName,
      password,
      dateCreated: new Date(),
      lastAccess: new Date(),
    };

    const response = await axios.post(`${API_URL}api/create`, { chatRoomInfo });
    // console.log(response);
    if (!response.data.error) {
      localStorage.setItem('userName', userName);
      localStorage.setItem('chatRoomName', roomName);
      console.log(`Connecting to room: ${roomName}`);
      history.push(`/room/${roomName}`);
    }
    if (response.data.error) {
      const { error } = response.data;
      if (error.includes('Room')) {
        setRoomName('');
        setRoomNamePlaceholder(error);
      }
    }
  };


  return (
    <Box
      direction="column"
      align="center"
      height="100vh"
      justify="center"
    >
      <Form

        onSubmit={(e) => handleSubmit(e)}
      >
        <FormField
          type="text"
          value={roomName}
          placeholder={roomNamePlaceholder}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <FormField
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormField
          type="text"
          value={userName}
          placeholder="Enter Your Name"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Box direction="row" gap="medium">
          <Button
            type="submit"
            label="Create"
            margin="small"
          />
          <Button
            type="button"
            label="Cancel"
            margin="small"
            onClick={() => history.push('/')}
          />
        </Box>
      </Form>
    </Box>
  );
};


export default CreateRoom;

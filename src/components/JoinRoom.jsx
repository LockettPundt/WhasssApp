import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, FormField, Form, Button, Text,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import API_URL from '../utils/apiConn';


const JoinRoom = () => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const [pwPlaaceholder, setPwPlaceholder] = useState('Enter Password');
  const [userName, setUserName] = useState('');
  const history = useHistory('');
  const [roomPlaceholder, setRoomPlaceholder] = useState('Join the room');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      password,
      chatRoomName: room,
      userName,
    };

    const response = await axios.post(`${API_URL}api/join`, { userInfo });
    if (response.data.success) {
      localStorage.setItem('chatRoomName', room);
      localStorage.setItem('userName', userName);
      history.push(`/room/${room}`);
    }
    if (response.data.error) {
      const { error } = response.data;
      if (error.includes('room')) {
        setRoom('');
        setRoomPlaceholder(error);
      }
      if (error.includes('password')) {
        setPassword('');
        setPwPlaceholder(error);
      }
    }
  };


  return (
    <Box
      background={{
        color: '#fefefa',
      }}
      direction="column"
      align="center"
      margin="auto"
      pad="medium"
      round="xxsmall"
      elevation="small"
      justify="center"
    >
      <Form
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormField
          type="text"
          placeholder={roomPlaceholder}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <FormField
          type="password"
          placeholder={pwPlaaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormField
          type="text"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <Box direction="row" gap="medium">
          <Button
            primary
            margin="small"
            type="submit"
            label="Join Room"
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


export default JoinRoom;

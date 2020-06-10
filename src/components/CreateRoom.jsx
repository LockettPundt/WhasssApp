import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={roomName}
          placeholder={roomNamePlaceholder}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          value={userName}
          placeholder="Enter Your Name"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <button
          type="submit"
          label="Submit"
        >
          Create
        </button>
      </form>
      <a href="/">Home</a>
    </div>
  );
};


export default CreateRoom;

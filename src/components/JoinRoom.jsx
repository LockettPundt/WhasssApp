import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
    console.log('submitting.');
    const userInfo = {
      password,
      chatRoomName: room,
      userName,
    };

    const response = await axios.post(`${API_URL}api/join`, { userInfo });
    console.log(response);
    if (response.data.success) {
      localStorage.setItem('chatRoomName', room);
      localStorage.setItem('userName', userName);
      console.log('redirecting to:', room);
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
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder={roomPlaceholder}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={pwPlaaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button
            type="submit"
          >
            Join
          </button>
        </form>
        <a href="/">Home</a>
      </div>

    </>
  );
};


export default JoinRoom;

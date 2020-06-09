import React, { useState } from 'react';
import styled from 'styled-components';
import API_URL from '../utils/apiConn';

const JoinRoom = () => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Join the room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

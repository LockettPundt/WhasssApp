import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const CreateRoom = () => {
  const [createName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    // db validate name. push if free.
    // update store of room name.
    // redirect to chatroom.
    localStorage.setItem('userName', userName);
    localStorage.setItem('chatRoomName', createName);
    console.log(`/room/${createName}`);
    history.push(`/room/${createName}`);
  };


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={createName}
          placeholder="Enter a Room Name"
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <input
          type="text"
          value={userName}
          placeholder="Enter a Name"
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

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const MainPage = () => {
  const [createName, setRoomName] = useState('');
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    // db validate name. push if free.
    // update store of room name.
    // redirect to chatroom.
    console.log(`/room/${createName}`);
    history.push(`/room/${createName}`);
  };


  return (
    <div>
      <a href="room/testroom">test room</a>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={createName}
          placeholder="Enter a Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          type="submit"
          label="Submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};


export default MainPage;

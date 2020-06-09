import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


const Main = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`${e.target.value}`);
  };
  return (
    <main>
      <p>
        Welcome to WhasssApp.
      </p>
      <button
        type="button"
        value="createroom"
        onClick={(e) => handleClick(e)}
      >
        Create a Room
      </button>
      <button
        type="button"
        value="joinroom"
        onClick={(e) => handleClick(e)}
      >
        Join a Room
      </button>
    </main>
  );
};


export default Main;

import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Box, Text, Image,
} from 'grommet';
import logo from '../WhasssApp.jpg';

const Main = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`${e.target.value}`);
  };
  return (
    <Box
      elevation="small"
      background={{
        color: 'white',
      }}
      round="xxsmall"
      margin="auto"
      direction="column"
      align="center"
      justify="center"
      pad="large"
      width="480px"
    >
      <Box
        width="small"
        height="small"
      >
        <Image
          fit="contain"
          src={logo}
        />

      </Box>

      <Text
        margin="small"
        weight="300"
        size="medium"
        textAlign="center"
      >
        Welcome. This is a simple chat App made with React, Electron and Socket.IO.
      </Text>
      <Button
        primary
        type="button"
        value="createroom"
        onClick={(e) => handleClick(e)}
        label="Create Room"
        margin="small"
      />
      <Button
        type="button"
        value="joinroom"
        onClick={(e) => handleClick(e)}
        label="Join Room"
        margin="small"
      />
    </Box>
  );
};


export default Main;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box, Text } from 'grommet';


const Main = () => {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`${e.target.value}`);
  };
  return (
    <Box
      direction="column"
      align="center"
      height="100vh"
      justify="center"
    >
      <Text
        margin="small"
        size="xxlarge"
      >
        Welcome to WhasssApp.
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

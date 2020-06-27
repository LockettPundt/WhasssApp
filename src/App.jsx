import React from 'react';
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import Main from './components/Main';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import ChatRoom from './components/ChatRoom';
import MainTheme from './themes/MainTheme';
import backgroundImage from './Zoom-background-1.jpg';

import './App.css';


const App = () => (
  <Grommet theme={MainTheme}>
    <Box
      background={{
        image: `url(${backgroundImage})`,
      }}
      height="100vh"
    >
      <HashRouter>
        <Route exact path="/" component={Main} />
        <Route path="/room/:roomname" component={ChatRoom} />
        <Route path="/joinroom" component={JoinRoom} />
        <Route path="/createroom" component={CreateRoom} />
      </HashRouter>
    </Box>
  </Grommet>
);

export default App;

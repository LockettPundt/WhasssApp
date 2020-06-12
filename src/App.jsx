import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import Main from './components/Main';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import ChatRoom from './components/ChatRoom';
import MainTheme from './themes/MainTheme';
import './App.css';


const App = () => (
  <Grommet theme={MainTheme}>
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/room/:roomname" component={ChatRoom} />
      <Route path="/joinroom" component={JoinRoom} />
      <Route path="/createroom" component={CreateRoom} />
    </Router>
  </Grommet>
);

export default App;

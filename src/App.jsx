import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Main from './components/Main';
import ChatRoom from './components/ChatRoom';
import './App.css';


const App = () => (
  <RecoilRoot>
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/room/:roomname" component={ChatRoom} />
    </Router>
  </RecoilRoot>
);

export default App;

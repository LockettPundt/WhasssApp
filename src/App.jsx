import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import MainPage from './components/MainPage';
import TestRoom from './components/TestRoom';
import './App.css';


const App = () => (
  <RecoilRoot>
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route path="/room/:roomname" component={TestRoom} />
    </Router>
  </RecoilRoot>

);

export default App;

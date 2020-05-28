import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TestRoom from './components/TestRoom';
import './App.css';


const App = () => (

  <Router>
    <a href="/testroom">test room</a>
    <Route path="/testroom" component={TestRoom} />
  </Router>
);

export default App;

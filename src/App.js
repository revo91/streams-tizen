import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Homescreen from './components/Homescreen';
import GameStreams from './components/GameStreams';
import { LiveStreamPlayer } from './components/LiveStreamPlayer';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/streams/:id" component={GameStreams} />
        <Route path="/stream/:user_name" component={LiveStreamPlayer}/>
        <Route path="/" component={Homescreen} />
      </Switch>
    </div>
  );
}

export default App;

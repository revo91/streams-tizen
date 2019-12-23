import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Homescreen from './components/Homescreen';
import StreamList from './components/StreamList';
import LiveStreamPlayer from './components/LiveStreamPlayer';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/streams/:game_id/:user_id" component={LiveStreamPlayer} />
        <Route path="/streams/:game_id" component={StreamList} />
        <Route path="/" component={Homescreen} />      
      </Switch>
    </div>
  );
}

export default App;
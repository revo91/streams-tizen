import React, { useEffect, useCallback } from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";

import Homescreen from './components/Homescreen';
import StreamList from './components/StreamList';
import LiveStreamPlayer from './components/LiveStreamPlayer';

function App() {

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    switch (keyCode) {
      case 38: //UP arrow - refresh current page
        window.location.reload();
        break;
      case 40: //DOWN arrow
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress);
    return () => {
      document.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div>
      <Switch>
        <Route path="/streams/:game_name/:user_name" component={LiveStreamPlayer} />
        <Route path="/streams/:game_name" component={StreamList} />
        <Route path="/" component={Homescreen} />
      </Switch>
    </div>
  );
}

export default App;
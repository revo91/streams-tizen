import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import '../styles/index.css';

export function LiveStreamPlayer(props) {
    let playerRef = React.createRef();
    useEffect(() => {
        var options = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            channel: props.match.params.user_name,
        };

        const twitchPlayer = new window.Twitch.Player('player', options);
        twitchPlayer.setVolume(1.0);
        twitchPlayer.addEventListener(window.Twitch.Player.PLAYING, () => {
            twitchPlayer.setMuted(false)
            twitchPlayer.setVolume(1.0);
        });

        //event listener for remote control
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37: //LEFT arrow
                    break;
                case 38: //UP arrow
                    break;
                case 39: //RIGHT arrow
                    break;
                case 40: //DOWN arrow
                    break;
                case 13: //OK button
                    if (twitchPlayer.isPaused()) {
                        twitchPlayer.play()
                    }
                    else {
                        twitchPlayer.pause()
                    }
                    break;
                case 10009: //RETURN button
                    props.history.goBack();
                    break;
                default:
                    console.log('Key code : ' + e.keyCode);
                    break;
            }
        });
    }, [])

    return (
        <div>
            <div ref={playerRef} id='player' className='container'></div>
            <div className='bar'></div>
        </div>
    )
}
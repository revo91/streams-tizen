import React, { useState, useEffect } from 'react';

export function LiveStreamPlayer(props) {
    let playerRef = React.createRef();

    useEffect(() => {
        var options = {
            width: window.innerWidth,
            height: window.innerHeight,
            channel: props.match.params.user_name,
        };

        const twitchPlayer = new window.Twitch.Player('player', options);
        twitchPlayer.addEventListener(window.Twitch.Player.PLAYING, () => {
            //twitchPlayer.setFullscreen(true);
        });

        // new window.Twitch.Embed("player", {
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        //     channel: props.match.params.user_name
        //   });
        
//event listener for remote control
document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 37: //LEFT arrow
        break;
    case 38: //UP arrow
        break;
    case 39: //RIGHT arrow
        break;
    case 40: //DOWN arrow
        break;
    case 13: //OK button
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

    return (<div>
        <div ref={playerRef} id='player'></div>
    </div>
    )


}

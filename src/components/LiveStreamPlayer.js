import React, { useEffect, useCallback } from 'react';
import '../styles/index.scss';
import { connect } from 'react-redux';
import { setPossibleQualities, setQuality, setQualitySelectorShown } from '../actions/manageQuality';

let timeout;
var twitchPlayer;

function LiveStreamPlayer(props) {
    let player = React.createRef();
    useEffect(() => {
        
        var options = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            channel: props.match.params.user_name,
        };
        twitchPlayer = new window.Twitch.Player('player', options);
        if (props.qualities.length > 0) {
            props.setQuality(props.qualities[props.selectedQualityIndex].name, props.selectedQualityIndex, props.qualities[props.selectedQualityIndex].group)
            twitchPlayer.setQuality(props.selectedQualityGroup)
        }
        else {
            props.setQuality('Auto', 0, 'auto')
            twitchPlayer.setQuality('auto')
        }
        twitchPlayer.addEventListener(window.Twitch.Player.PLAYING, () => {
            twitchPlayer.setMuted(false)
            twitchPlayer.setVolume(1.0);
            props.setPossibleQualities(twitchPlayer.getQualities())
        });
        twitchPlayer.addEventListener(window.Twitch.Player.READY, () => {
            console.log(window.innerHeight)
        });

        //event listener for remote control
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
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
                    break;
            }
        });
    }, [])

    const waitForMoreInputs = () => {
        props.setQualitySelectorShown(true)
        clearTimeout(timeout);
        timeout = setTimeout(() => { props.setQualitySelectorShown(false) }, 3000);
    }

    const handleQualitySelectionMenu = useCallback(event => {
        const { keyCode } = event;
        switch (keyCode) {
            case 37: //LEFT arrow
                if (props.qualities[props.selectedQualityIndex - 1] !== undefined) {
                    props.setQuality(props.qualities[props.selectedQualityIndex - 1].name, props.selectedQualityIndex - 1, props.qualities[props.selectedQualityIndex - 1].group)
                    twitchPlayer.setQuality(props.qualities[props.selectedQualityIndex - 1].group)
                }
                waitForMoreInputs()
                break;
            case 39: //RIGHT arrow
                if (props.qualities[props.selectedQualityIndex + 1] !== undefined) {
                    props.setQuality(props.qualities[props.selectedQualityIndex + 1].name, props.selectedQualityIndex + 1, props.qualities[props.selectedQualityIndex + 1].group)
                    twitchPlayer.setQuality(props.qualities[props.selectedQualityIndex + 1].group)
                }
                waitForMoreInputs()
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        document.addEventListener('keydown', handleQualitySelectionMenu);
        return () => {
            document.removeEventListener('keydown', handleQualitySelectionMenu);
        };
    }, [handleQualitySelectionMenu]);

    return (
        <React.Fragment>
            <div id='player' className='playercontainer' ref={player}></div>
            <div className={`quality-selection-menu-container ${props.qualitySelectionShown === true ? 'slide-in' : 'slide-out'}`}>
                {props.qualities.map((quality) => {
                    return <p className={`quality-selection-item${props.qualities[props.selectedQualityIndex].name === quality.name ? '-selected' : ''}`} key={quality.name}>{quality.name}</p>
                })}
            </div>
            <div className='overlay'></div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        qualities: state.playerReducer.qualities,
        selectedQualityName: state.playerReducer.selectedQuality.name,
        selectedQualityIndex: state.playerReducer.selectedQuality.index,
        selectedQualityGroup: state.playerReducer.selectedQuality.group,
        qualitySelectionShown: state.playerReducer.qualitySelectionShown
    }
}

const mapDispatchToProps = {
    setPossibleQualities,
    setQuality,
    setQualitySelectorShown
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamPlayer)
import React, { useEffect, useCallback, useRef } from 'react';
import '../styles/index.scss';
import { connect } from 'react-redux';
import { setPossibleQualities, setQuality, setQualitySelectorShown } from '../actions/manageQuality';
import { playerQualityController, playerNavigationController } from '../utils/remoteController';
import { useWindowKeydown } from '../hooks/useWindowEvent';
import { getStreamerNameFromID } from '../services/fetch.service';

function LiveStreamPlayer(props) {
    const timeout = useRef();
    const twitchPlayer = useRef();
    const { qualities, selectedQualityIndex, setQuality, selectedQualityGroup, setQualitySelectorShown, qualitySelectionShown, setPossibleQualities } = props;

    useEffect(() => {
        getStreamerNameFromID(props.match.params.user_id).then(streamer => {
            if (twitchPlayer.current._bridge === undefined) {
                let options = {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    controls: false,
                    channel: streamer.data[0].login
                };

                twitchPlayer.current = new window.Twitch.Player('player', options);
                if (qualities.length > 0) {
                    setQuality(qualities[selectedQualityIndex].name, selectedQualityIndex, qualities[selectedQualityIndex].group)
                    twitchPlayer.current.setQuality(selectedQualityGroup)
                }
                else {
                    setQuality('Auto', 0, 'auto')
                    twitchPlayer.current.setQuality('auto')
                }
                twitchPlayer.current.addEventListener(window.Twitch.Player.PLAYING, () => {
                    twitchPlayer.current.setMuted(false)
                    twitchPlayer.current.setVolume(1.0);
                    twitchPlayer.current.getQualities()
                    setPossibleQualities(twitchPlayer.current.getQualities())
                });
            }
        })
        // eslint-disable-next-line
    }, [props.match.params.user_id, setQuality])

    useEffect(() => {
        let timer = setInterval(() => {
            if (document.activeElement === document.getElementsByTagName("iframe")[0]) {
                window.parent.focus()
            }
        }, 1000)
        return () => {
            clearInterval(timer)
        };
    }, [])

    const handleQualitySelectionMenu = useCallback(event => {
        const waitForMoreInputs = () => {
            setQualitySelectorShown(true)
            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => { setQualitySelectorShown(false) }, 3000);
        }
        playerQualityController(event, qualities, selectedQualityIndex, twitchPlayer.current, waitForMoreInputs, setQuality)
    }, [qualities, selectedQualityIndex, setQuality, setQualitySelectorShown]);

    const handlePlayerNavigation = useCallback(event => {
        playerNavigationController(event, twitchPlayer.current, props.history)
    }, [props.history])

    useWindowKeydown(handleQualitySelectionMenu)
    useWindowKeydown(handlePlayerNavigation)

    return (
        <React.Fragment>
            <div id='player' className='playercontainer' ref={twitchPlayer}></div>
            <div className={`quality-selection-menu-container ${qualitySelectionShown === true ? 'slide-in' : 'slide-out'}`}>
                {qualities.length > 0 ? qualities.map((quality) => {
                    return <p className={`quality-selection-item${qualities[selectedQualityIndex].name === quality.name ? '-selected' : ''}`} key={quality.name}>{quality.name}</p>
                }) : null}
            </div>
            {/* <div className='overlay'></div> */}
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
import React, { useEffect, useCallback } from 'react';
import '../styles/index.css';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getStreamsList, selectStream } from '../actions/manageStreamsList';
import ErrorScreen from './Error';

function StreamList(props) {
    const refs = []
    const setRef = (ref) => {
        refs.push(ref);
    };

    useEffect(() => {
        props.getStreamsList("https://api.twitch.tv/helix/streams?first=100&game_id=", props.location.state.gameID)
    }, []);

    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;

        switch (keyCode) {
            case 37: //LEFT arrow
                if (props.streamsList[props.selectedStream - 1] !== undefined) {
                    props.selectStream(props.selectedStream - 1)
                    setTimeout(() => {
                        refs[props.selectedStream - 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 38: //UP arrow
                break;
            case 39: //RIGHT arrow
                if (props.streamsList[props.selectedStream + 1] !== undefined) {
                    props.selectStream(props.selectedStream + 1)
                    setTimeout(() => {
                        refs[props.selectedStream + 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 40: //DOWN arrow
                break;
            case 13: //OK button
                setTimeout(() => {
                    refs[props.selectedStream].click()
                }, 0)
                break;
            case 16:
                break;
            case 10009: //RETURN button
                props.history.goBack();
                break;
            default:
                console.log('Key code : ' + keyCode);
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
        <div className="flexcontainer">
            {props.syncError !== true ? props.streamsList ? props.streamsList.length > 0 ? props.streamsList.map((stream, index) => {
                let streamImageUrl = stream.thumbnail_url.replace('{width}', '448').replace('{height}', '248');
                return <Link ref={setRef} className="flexitemlink" key={stream.id} to={`/streams/${props.match.params.game_name}/${stream.user_name}`}>
                    <div className={`flexitems ${index === props.selectedStream ? 'selected' : ''}`} key={stream.id}>
                        <img src={streamImageUrl} alt={stream.user_name}/>
                        <h3 className="flexitemtitle">{stream.title}</h3>
                        <p className={'streamertitle'}>{stream.user_name}</p>
                    </div>
                    </Link>
            }) : null : <ErrorScreen /> : <ErrorScreen />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        streamsList: state.streamsListReducer.streamsList,
        selectedStream: state.streamsListReducer.selectedStream,
        syncError: state.streamsListReducer.syncError
    }
}

const mapDispatchToProps = {
    getStreamsList,
    selectStream
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
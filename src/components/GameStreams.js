import React, { useEffect, useCallback } from 'react';
import './GameStreams.css';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getStreamsList, selectStream } from '../actions/manageStreamsList';

function GameStreams(props) {
    const refs = []

    const setRef = (ref) => {
        refs.push(ref);
        //console.log(refs)
    };

    useEffect(() => {
        props.getStreamsList("https://api.twitch.tv/helix/streams?first=100&game_id=", props.match.params.id)
    }, []);

    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;

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
                //props.history.push(`/streams/${props.streamsList[props.selectedStream].user_name}`)
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
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div className="flexcontainer">
            {props.streamsList.length > 0 ? props.streamsList.map((stream, index) => {
                let streamImageUrl = stream.thumbnail_url.replace('{width}', '448').replace('{height}', '248');
                return <Link ref={setRef} className="flexitemlink" key={stream.id} to={`/stream/${stream.user_name}`}>
                    <div className={`flexitems ${index === props.selectedStream ? 'selected' : ''}`} key={stream.id}><img src={streamImageUrl} />
                        <h3 className="flexitemtitle">{stream.title}</h3>
                        <p className={'streamertitle'}>{stream.user_name}</p>
                    </div></Link>
            }) : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        streamsList: state.streamsListReducer.streamsList,
        selectedStream: state.streamsListReducer.selectedStream
    }
}

const mapDispatchToProps = {
    getStreamsList,
    selectStream
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStreams);
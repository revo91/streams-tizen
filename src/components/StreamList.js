import React, { useEffect, useCallback } from 'react';
import '../styles/index.scss';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getStreamsList, selectStream, setStreamsList } from '../actions/manageStreamsList';
import ErrorScreen from './Error';
import { FaUserAlt } from 'react-icons/fa';

function StreamList(props) {
    let numPerRow;
    let baseOffset;
    let breakIndex;
    const refs = []
    const setRef = (ref) => {
        refs.push(ref);
    };

    useEffect(() => {
        //refresh list
        props.setStreamsList([])
        props.getStreamsList("https://api.twitch.tv/helix/streams?first=100&game_id=", props.match.params.game_id)
    }, []);

    useEffect(() => {
        if (refs[0]) {
            baseOffset = refs[0].offsetTop;
            breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
            numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
        }
    }, [refs])

    useEffect(() => {
        const handleResize = () => {
            if (refs[0]) {
                baseOffset = refs[0].offsetTop;
                breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
                numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [refs]);

    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;

        switch (keyCode) {
            case 37: //LEFT arrow
            event.preventDefault()
                if (props.streamsList[props.selectedStream - 1] !== undefined) {
                    props.selectStream(props.selectedStream - 1)
                    setTimeout(() => {
                        refs[props.selectedStream - 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 38: //UP arrow
            event.preventDefault()
                if (props.streamsList[props.selectedStream - numPerRow] !== undefined) {
                    props.selectStream(props.selectedStream - numPerRow)
                    setTimeout(() => {
                        refs[props.selectedStream - numPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
                    })
                }
                else if (props.streamsList[0] !== undefined) {
                    props.selectStream(0);
                }
                break;
            case 39: //RIGHT arrow
            event.preventDefault()
                if (props.streamsList[props.selectedStream + 1] !== undefined) {
                    props.selectStream(props.selectedStream + 1)
                    setTimeout(() => {
                        refs[props.selectedStream + 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 40: //DOWN arrow
            event.preventDefault()
                if (props.streamsList[props.selectedStream + numPerRow] !== undefined) {
                    props.selectStream(props.selectedStream + numPerRow)
                    setTimeout(() => {
                        refs[props.selectedStream + numPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
                    })
                }
                else if (props.streamsList.length >= 0) {
                    props.selectStream(props.streamsList.length - 1);
                }
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
                return <Link ref={setRef} className={`flexitemsstreams scale-in-center ${index === props.selectedStream ? 'selected' : ''}`} key={stream.id} to={`/streams/${props.match.params.game_id}/${stream.user_id}`}>
                    <div key={stream.id}>
                        <img src={streamImageUrl} alt={stream.user_name}/>
                        <h3 className="flexitemtitle">{stream.title}</h3>
                        <p className={'viewercount'}><FaUserAlt/> {stream.viewer_count}</p>
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
    selectStream,
    setStreamsList
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
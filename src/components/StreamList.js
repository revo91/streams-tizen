import React, { useEffect, useCallback } from 'react';
import '../styles/index.scss';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getStreamsList, selectStream, setStreamsList, setStreamsPerRow } from '../actions/manageStreamsList';
import ErrorScreen from './Error';
import { FaUserAlt } from 'react-icons/fa';
import { useWindowResize, useWindowKeydown } from '../hooks/useWindowEvent';
import { remoteController } from '../utils/remoteController';

function StreamList(props) {
    const { getStreamsList, selectStream, setStreamsList, streamsPerRow, streamsList, selectedStream, setStreamsPerRow, syncError } = props;
    const refs = []
    const setRef = (ref) => {
        refs.push(ref);
    };

    const keydownCallback = useCallback((event) => {
        remoteController(event, refs, streamsList, selectedStream, streamsPerRow, selectStream, props.history)
    }, [refs, streamsList, streamsPerRow, selectedStream, selectStream, props.history])

    const windowResizeCallback = useCallback(() => {
        if (refs[0]) {
            let baseOffset = refs[0].offsetTop;
            let breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
            let numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
            setStreamsPerRow(numPerRow);
        }
    }, [refs, setStreamsPerRow])

    useWindowKeydown(keydownCallback)
    useWindowResize(windowResizeCallback)

    useEffect(() => {
        //refresh list
        setStreamsList([])
        //get list of livestreams
        getStreamsList("https://api.twitch.tv/helix/streams?first=100&game_id=", props.match.params.game_id)
    }, [getStreamsList, setStreamsList, props.match.params.game_id]);

    useEffect(() => {
        if (refs[0]) {
            let baseOffset = refs[0].offsetTop;
            let breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
            let numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
            setStreamsPerRow(numPerRow);
        }
    }, [refs, setStreamsPerRow])
    
    return (
        <div className={syncError !== true ? "flexcontainer" : ""}>
            {syncError !== true ? streamsList && streamsList.length > 0 ? streamsList.map((stream, index) => {
                let streamImageUrl = stream.thumbnail_url.replace('{width}', '448').replace('{height}', '248');
                return <Link ref={setRef} className={`flexitemsstreams scale-in-center ${index === props.selectedStream ? 'selected' : ''}`} key={stream.id} to={`/streams/${props.match.params.game_id}/${stream.user_id}`}>
                    <div key={stream.id}>
                        <img src={streamImageUrl} alt={stream.user_name} />
                        <h3 className="flexitemtitle">{stream.title}</h3>
                        <p className={'viewercount'}><FaUserAlt /> {stream.viewer_count}</p>
                        <p className={'streamertitle'}>{stream.user_name}</p>
                    </div>
                </Link>
            }) : null : <ErrorScreen />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        streamsList: state.streamsListReducer.streamsList,
        selectedStream: state.streamsListReducer.selectedStream,
        syncError: state.streamsListReducer.syncError,
        streamsPerRow: state.streamsListReducer.streamsPerRow
    }
}

const mapDispatchToProps = {
    getStreamsList,
    selectStream,
    setStreamsList,
    setStreamsPerRow
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
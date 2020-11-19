import React, { useEffect, useCallback } from 'react';
import '../styles/index.scss';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { selectStream, setStreamsList, setStreamsPerRow, setStreamsListPagination } from '../actions/manageStreamsList';
import ErrorScreen from './Error';
import { FaUserAlt } from 'react-icons/fa';
import { useWindowResize, useWindowKeydown } from '../hooks/useWindowEvent';
import { remoteController } from '../utils/remoteController';
import { getStreamsList } from '../services/fetch.service';

function StreamList(props) {
    const { selectStream, setStreamsList, streamsPerRow, streamsList, selectedStream, setStreamsPerRow, syncError, setStreamsListPagination, pagination } = props;
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
        getStreamsList(`https://api.twitch.tv/helix/streams?first=24&game_id=${props.match.params.game_id}`).then(res => {
            setStreamsList(res.data)
            setStreamsListPagination(res.pagination)
        })
    }, [setStreamsList, props.match.params.game_id, setStreamsListPagination]);

    useEffect(() => {
        //load more items when reaching bottom
        if (streamsList.length > 0 && streamsList.length - selectedStream < 12) {
            getStreamsList(`https://api.twitch.tv/helix/streams?first=24&after=${pagination}&game_id=${props.match.params.game_id}`).then(res => {
                if (res && res.status === 200) {
                    setStreamsList([...streamsList, ...res.data])
                    setStreamsListPagination(res.pagination)
                }
            })
        }
    }, [selectedStream, pagination, props.match.params.game_id, setStreamsList, setStreamsListPagination, streamsList])

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
        streamsPerRow: state.streamsListReducer.streamsPerRow,
        pagination: state.streamsListReducer.pagination
    }
}

const mapDispatchToProps = {
    selectStream,
    setStreamsList,
    setStreamsPerRow,
    setStreamsListPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
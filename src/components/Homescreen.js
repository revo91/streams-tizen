
import React, { useEffect, useCallback, useMemo } from 'react';
import '../styles/index.scss';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { selectGame, setGamesList, selectStream, setGamesPerRow, setGamesListPagination } from '../actions/manageStreamsList';
import ErrorScreen from './Error';
import { useWindowResize, useWindowKeydown } from '../hooks/useWindowEvent';
import { remoteController } from '../utils/remoteController';
import { getGamesList } from '../services/fetch.service';
import { itemsNumberPerCall } from '../config';

export function Homescreen(props) {
    const { setGamesList, selectStream, setGamesPerRow, selectedGame, gamesList, selectGame, gamesPerRow, syncError, setGamesListPagination, pagination } = props;
    const refs = useMemo(() => {
        if (gamesList) {
            return [];
        }
    }, [gamesList]);

    const setRef = (ref) => {
        refs.push(ref);
    };
    
    const keydownCallback = useCallback((event) => {
        remoteController(event, refs, gamesList, selectedGame, gamesPerRow, selectGame, props.history)
    }, [refs, gamesList, gamesPerRow, selectedGame, selectGame, props.history])

    const windowResizeCallback = useCallback(() => {
        if (refs[0]) {
            let baseOffset = refs[0].offsetTop;
            let breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
            let numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
            setGamesPerRow(numPerRow)
        }
    }, [refs, setGamesPerRow])

    useWindowKeydown(keydownCallback)
    useWindowResize(windowResizeCallback)

    useEffect(() => {
        //refresh list
        setGamesList([]);
        getGamesList(`https://api.twitch.tv/helix/games/top?first=${itemsNumberPerCall}`).then(res => {
            if (res && res.status === 200) {
                setGamesList(res.data)
                setGamesListPagination(res.pagination)
            }
        })
        selectStream(0);
    }, [setGamesList, selectStream, setGamesListPagination]);

    useEffect(() => {
        //load more items when reaching bottom
        if (gamesList.length > 0 && gamesList.length - selectedGame < 16) {
            getGamesList(`https://api.twitch.tv/helix/games/top?first=${itemsNumberPerCall}&after=${pagination}`).then(res => {
                if (res && res.status === 200) {
                    setGamesList([...gamesList, ...res.data])
                    setGamesListPagination(res.pagination)
                }
            })
        }
    }, [selectedGame, gamesList, pagination, setGamesList, setGamesListPagination])

    useEffect(() => {
        if (refs[0]) {
            let baseOffset = refs[0].offsetTop;
            let breakIndex = refs.findIndex(item => item.offsetTop > baseOffset);
            let numPerRow = (breakIndex === -1 ? refs.length : breakIndex);
            setGamesPerRow(numPerRow)
        }
    }, [refs, setGamesPerRow])

    return (
        <div className={syncError !== true ? "flexcontainer" : ""}>
            {syncError !== true ? gamesList && gamesList.length > 0 ? gamesList.map((game, index) => {
                let gameImageUrl = game.box_art_url.replace('{width}', '285').replace('{height}', '380');
                return <Link ref={setRef} className={`flexitemscategories scale-in-center ${index === selectedGame ? 'selected' : ''}`} key={game.id} to={{ pathname: `/streams/${game.id}/`, state: { gameName: game.name } }}>
                    <div>
                        <img src={gameImageUrl} alt={`${game.name}`} />
                        <h3 className="flexitemtitle">{game.name}</h3>
                    </div>
                </Link>
            }) : null : <ErrorScreen />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gamesList: state.gamesListReducer.gamesList,
        selectedGame: state.gamesListReducer.selectedGame,
        syncError: state.gamesListReducer.syncError,
        gamesPerRow: state.gamesListReducer.gamesPerRow,
        pagination: state.gamesListReducer.pagination
    }
}

const mapDispatchToProps = {
    selectGame,
    selectStream,
    setGamesList,
    setGamesPerRow,
    setGamesListPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
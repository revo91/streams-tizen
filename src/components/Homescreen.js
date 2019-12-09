
import React, { useEffect, useCallback } from 'react';
import '../styles/index.css';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getGamesList, selectGame } from '../actions/manageStreamsList';
import ErrorScreen from './Error';

function Homescreen(props) {
    const refs = [];
    const setRef = (ref) => {
        refs.push(ref);
    };

    useEffect(() => {
        props.getGamesList('https://api.twitch.tv/helix/games/top?first=100')
    }, []);

    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;
        switch (keyCode) {
            case 37: //LEFT arrow
                if (props.gamesList[props.selectedGame - 1] !== undefined) {
                    props.selectGame(props.selectedGame - 1)
                    setTimeout(() => {
                        refs[props.selectedGame - 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 38: //UP arrow
                break;
            case 39: //RIGHT arrow
                if (props.gamesList[props.selectedGame + 1] !== undefined) {
                    props.selectGame(props.selectedGame + 1)
                    setTimeout(() => {
                        refs[props.selectedGame + 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 40: //DOWN arrow
                break;
            case 13: //OK button
                setTimeout(() => {
                    refs[props.selectedGame].click()
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
            {props.syncError !== true ? props.gamesList ? props.gamesList.length > 0 ? props.gamesList.map((game, index) => {
                let gameImageUrl = game.box_art_url.replace('{width}', '285').replace('{height}', '380');
                return <Link ref={setRef} className="flexitemlink" key={game.id} to={{ pathname: `/streams/${game.name}/`, state: { gameID: game.id, gameName: game.name } }}>
                    <div className={`flexitemscategories ${index === props.selectedGame ? 'selected' : ''}`} key={game.id}>
                        <img src={gameImageUrl} alt={`${game.name}`} />
                        <h3 className="flexitemtitle">{game.name}</h3>
                    </div>
                </Link>
            }) : null : <ErrorScreen /> : <ErrorScreen />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gamesList: state.gamesListReducer.gamesList,
        selectedGame: state.gamesListReducer.selectedGame,
        syncError: state.gamesListReducer.syncError,
    }
}

const mapDispatchToProps = {
    getGamesList,
    selectGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
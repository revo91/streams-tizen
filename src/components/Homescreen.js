
import React, { useEffect, useCallback } from 'react';
import '../styles/index.scss';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getGamesList, selectGame, setGamesList } from '../actions/manageStreamsList';
import ErrorScreen from './Error';
import { selectStream } from '../actions/manageStreamsList';

function Homescreen(props) {
    let numPerRow;
    let baseOffset;
    let breakIndex;
    const refs = [];
    const setRef = (ref) => {
        refs.push(ref);
    };

    useEffect(() => {
        //refresh list
        props.setGamesList([]);
        props.getGamesList('https://api.twitch.tv/helix/games/top?first=100');
        props.selectStream(0);
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
                if (props.gamesList[props.selectedGame - 1] !== undefined) {
                    props.selectGame(props.selectedGame - 1)
                    setTimeout(() => {
                        refs[props.selectedGame - 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 38: //UP arrow
                event.preventDefault()
                if (props.gamesList[props.selectedGame - numPerRow] !== undefined) {
                    props.selectGame(props.selectedGame - numPerRow)
                    setTimeout(() => {
                        refs[props.selectedGame - numPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
                    })
                }
                else if (props.gamesList[0] !== undefined) {
                    props.selectGame(0);
                }
                break;
            case 39: //RIGHT arrow
                event.preventDefault()
                if (props.gamesList[props.selectedGame + 1] !== undefined) {
                    props.selectGame(props.selectedGame + 1)
                    setTimeout(() => {
                        refs[props.selectedGame + 1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    }, 0)
                }
                break;
            case 40: //DOWN arrow
                event.preventDefault()
                if (props.gamesList[props.selectedGame + numPerRow] !== undefined) {
                    props.selectGame(props.selectedGame + numPerRow)
                    setTimeout(() => {
                        refs[props.selectedGame + numPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
                    })
                }
                else if (props.gamesList.length >= 0) {
                    props.selectGame(props.gamesList.length - 1);
                }
                break;
            case 13: //OK button
                setTimeout(() => {
                    refs[props.selectedGame].click()
                }, 0)
                break;
            case 16:
                break;
            case 10009: //RETURN button
                window.location.reload()
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
                return <Link ref={setRef} className={`flexitemscategories scale-in-center ${index === props.selectedGame ? 'selected' : ''}`} key={game.id} to={{ pathname: `/streams/${game.id}/`}}>
                    <div key={game.id}>
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
    selectGame,
    selectStream,
    setGamesList
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
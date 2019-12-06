
import React, { useEffect, useCallback, useRef } from 'react';
import './Homescreen.css';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { getGamesList, selectGame } from '../actions/manageStreamsList';


function Homescreen(props) {
    const refs = [];

    const setRef = (ref) => {
        refs.push(ref);
        //console.log(refs)
    };

    useEffect(() => {
        props.getGamesList('https://api.twitch.tv/helix/games/top?first=100')
    }, []);
    
    const handleUserKeyPress = useCallback(event => {
        const { key, keyCode } = event;
        switch (keyCode) {
            case 37: //LEFT arrow
                if (props.gamesList[props.selectedGame - 1] !== undefined) {
                    props.selectGame(props.selectedGame - 1)
                    setTimeout(()=>{
                        refs[props.selectedGame-1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    },0)
                }
                break;
            case 38: //UP arrow

                break;
            case 39: //RIGHT arrow
                if (props.gamesList[props.selectedGame + 1] !== undefined) {
                    props.selectGame(props.selectedGame + 1)
                    setTimeout(()=>{
                        refs[props.selectedGame+1].scrollIntoView({ behavior: 'smooth', block: "center" })
                    },0)
                }
                break;
            case 40: //DOWN arrow

                break;
            case 13: //OK button
            //props.history.push(`/streams/${props.gamesList[props.selectedGame].id}`)
            setTimeout(()=>{
                refs[props.selectedGame].click()
            },0)
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
            {props.gamesList.length > 0 ? props.gamesList.map((game, index) => {
                
                let gameImageUrl = game.box_art_url.replace('{width}', '285').replace('{height}', '380');
                return <Link ref={setRef} className="flexitemlink" key={game.id} to={`/streams/${game.id}`}>
                    <div className={`flexitemscategories ${index === props.selectedGame ? 'selected' : ''}`} key={game.id}><img src={gameImageUrl} />
                        <h3 className="flexitemtitle">{game.name}</h3></div></Link>
            }) : null}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        gamesList: state.gamesListReducer.gamesList,
        selectedGame: state.gamesListReducer.selectedGame
    }
}

const mapDispatchToProps = {
    getGamesList,
    selectGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
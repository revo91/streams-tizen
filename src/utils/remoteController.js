export const remoteController = (event, refs, gamesList, selectedGame, gamesPerRow, selectGame, history) => {
    switch (event.keyCode) {
        case 37: //LEFT arrow
            event.preventDefault()
            if (gamesList[selectedGame - 1] !== undefined) {
                selectGame(selectedGame - 1)
                refs[selectedGame - 1].scrollIntoView({ behavior: 'smooth', block: "center" })
            }
            break;
        case 38: //UP arrow
            event.preventDefault()
            if (gamesList[selectedGame - gamesPerRow] !== undefined) {
                selectGame(selectedGame - gamesPerRow)
                refs[selectedGame - gamesPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            else if (gamesList[0] !== undefined) {
                selectGame(0);
            }
            break;
        case 39: //RIGHT arrow
            event.preventDefault()
            if (gamesList[selectedGame + 1] !== undefined) {
                selectGame(selectedGame + 1)
                refs[selectedGame + 1].scrollIntoView({ behavior: 'smooth', block: "center" })
            }
            break;
        case 40: //DOWN arrow
            event.preventDefault()
            if (gamesList[selectedGame + gamesPerRow] !== undefined) {
                selectGame(selectedGame + gamesPerRow)
                refs[selectedGame + gamesPerRow].scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            else if (gamesList.length >= 0) {
                selectGame(gamesList.length - 1);
            }
            break;
        case 13: //OK button
            setTimeout(() => {
                refs[selectedGame].click()
            }, 0)
            break;
        case 16:
            break;
        case 10009: //RETURN button
            history.goBack();
            break;
        default:
            break;
    }
}

export const playerQualityController = (event, qualities, selectedQualityIndex, twitchPlayer, waitForMoreInputs, setQuality) => {
    switch (event.keyCode) {
        case 37: //LEFT arrow
            if (qualities[selectedQualityIndex - 1] !== undefined) {
                setQuality(qualities[selectedQualityIndex - 1].name, selectedQualityIndex - 1, qualities[selectedQualityIndex - 1].group)
                twitchPlayer.setQuality(qualities[selectedQualityIndex - 1].group)
            }
            waitForMoreInputs()
            break;
        case 39: //RIGHT arrow
            if (qualities[selectedQualityIndex + 1] !== undefined) {
                setQuality(qualities[selectedQualityIndex + 1].name, selectedQualityIndex + 1, qualities[selectedQualityIndex + 1].group)
                twitchPlayer.setQuality(qualities[selectedQualityIndex + 1].group)
            }
            waitForMoreInputs()
            break;
        default:
            break;
    }
}

export const playerNavigationController = (event, twitchPlayer, history) => {
    switch (event.keyCode) {
        case 13: //OK button
            if (twitchPlayer.isPaused()) {
                twitchPlayer.play()
            }
            else {
                twitchPlayer.pause()
            }
            break;
        case 10009: //RETURN button
            history.goBack();
            break;
        default:
            break;
    }
}


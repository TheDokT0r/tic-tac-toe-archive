import React from 'react'
import './GameBtns.css'
import './App.css'

export default function RecordedGame(props) {
    //In case no board was selected (yet)
    const createDefaultBoard = () => {
        let arr = [];
        for(let i = 0; i < 3; i++) {
            let innnerArr = [];
            for(let j = 0; j < 3; j++) {
                innnerArr.push('-');
            }

            arr.push(innnerArr);
        }

        return arr;
    }

    const setGameGUI = (gameMap) => {
        let btns = [];
        for(let i = 0; i < gameMap.length; i++) {
            let btnsLine = [];

            for(let j = 0; j < gameMap[i].length; j++) {
                btnsLine.push(<button className='game-btn'>
                    {gameMap[i][j]}
                    </button>);
            }

            btns.push(<div>{btnsLine}</div>);
        }

        return btns;
    }
    
    if(props.gameMap.length < 1) {
        return(
            <div>{setGameGUI(createDefaultBoard())}</div>
        );
    }

    return (
        <div>{setGameGUI(props.gameMap)}</div>
    )
}

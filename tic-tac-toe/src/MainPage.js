import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import CheckWon from './CheckWon';
import Game from './Game';
import SavePlayer from './SavePlayer';
import Records from './Records';



const initGameItems = (X_AXIS, Y_AXIS) => {
  let gameItems = [];
  for (let i = 0; i < X_AXIS; i++) {
    let innerArr = [];
    for (let j = 0; j < Y_AXIS; j++) {
      innerArr.push({
        ID: [i, j],
        txt: "-"
      });
    }

    gameItems.push(innerArr);
  }

  return gameItems;
}

export default function MainPage() {
  const [gameItems, setItems] = useState(initGameItems(3, 3));
  const [winner, setWinner] = useState(NaN);
  const [turns, setTurns] = useState(0);


  const initGame = () => {
    setItems(initGameItems(3, 3));
    setWinner(false);
    setTurns(0);
  }

  const resetBtn = () => {
    setItems(initGameItems(3, 3));
    setTurns(0);
  }

  const players = ['X', 'O'];

  useEffect(() => {
    setWinner(CheckWon(gameItems, players));
    setTurns(turns + 1);

    //console.log({ turns });
  }, gameItems);

  return (
    <div className='backColor'>
      <div className='options-menu' style={{ "visibility": !winner ? "visible" : "hidden" }}>
        <button className='menu-buttons' onClick={resetBtn}>Reset</button>
        {/*<button className='menu-buttons'><link to="records"></link></button>*/}
        <Link to="/records">
          <button className="menu-buttons" type="button">
            Records
          </button>
        </Link>*
      </div>
      {(!winner) ?
        <div className="center-div backColor">
          <h1 className="title">A Very Manly Game of</h1>
          <h1 className="title title2">Tic-Tac-Toe:</h1>

          <Game players={players} gameItems={gameItems} setItems={setItems}></Game>
        </div>

        :

        <div className="center-div backColor">
          {/*<h1 className='title2'>{winner} has won!</h1>
      <button className="reset-button" onClick={resetBtn}>Play again</button>*/}

          <SavePlayer gameMap={gameItems} winnerSymbol={winner} turns={turns - 1} resetGame={initGame}></SavePlayer>
        </div>
      }
    </div>
  )
}

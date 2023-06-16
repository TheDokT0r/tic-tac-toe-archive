import React, { PureComponent } from 'react'
import './GameBtns.css';
import CheckWon from './CheckWon.js';

export default class Game extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            players: this.props.players,
            currentPlayer: 0
        };

        this.btnPress = this.btnPress.bind(this);
    }

    btnPress = (e) => {
        console.log("Pressed: " + e.target.id);

        if (e.target.innerHTML == this.state.players[0] || e.target.innerHTML == this.state.players[1]) {
            return;
        }

        let gameItems = this.props.gameItems;
        const id = e.target.id.split(",");
        const currentPlayer = this.state.currentPlayer;

        //Checks which player won
        if (this.state.currentPlayer % 2 === 0) {
            e.target.innerArr = this.state.players[0];
            gameItems = this.props.gameItems;
            gameItems[id[0]][id[1]].txt = this.state.players[0];
        }
        else {
            e.target.innerArr = this.state.players[1];
            gameItems = this.props.gameItems;
            gameItems[id[0]][id[1]].txt = this.state.players[1];
        }

        this.setState({
            currentPlayer: (this.state.currentPlayer + 1)
        });
        

        gameItems = JSON.parse(JSON.stringify(gameItems)); //Deep copy
        this.props.setItems(gameItems);

        //const won = CheckWon(gameItems, this.state.players);
        //console.log({ won });
    }

    render() {
        const gameItems = this.props.gameItems; //The shorter the better

        let divs = [];
        for (let i = 0; i < gameItems.length; i++) {
            let innerArr = [];
            for (let j = 0; j < gameItems[0].length; j++) {
                innerArr.push(
                    <button id={gameItems[i][j].ID}
                        onClick={this.btnPress} className='game-btn'>
                        {gameItems[i][j].txt}</button>);
            }
            //console.log(innerArr);
            divs.push(<div>{innerArr}</div>);
        }
        return (
            <div>{divs}</div>
        )
    }
}

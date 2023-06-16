import React, { PureComponent } from 'react'
import './SavePlayer.css'
//import './App.css'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";

//Saves player data to db
export default class SavePlayer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gameMap: this.createGameMap(props.gameMap),
            winnerSymbol: props.winner,
            turns: props.turns,
            winnerName: "",
            points: 0,
            dataSubmited: false,
            skipSubmittion: false
        };

        this.state.points = this.caculatePoints();
        this.submitClick = this.submitClick.bind(this);
        this.playAgainClick = this.playAgainClick.bind(this);
        this.caculatePoints = this.caculatePoints.bind(this);
    }


    createGameMap = (arr) => { //Simplefies the 2D array
        let outerArr = [];
        for (let i = 0; i < arr.length; i++) {
            let innerArr = [];
            for (let j = 0; j < arr[i].length; j++) {
                innerArr.push(arr[i][j].txt);
            }

            outerArr.push(innerArr);
        }

        return outerArr;
    }

    caculatePoints = () => {
        return(this.state.turns * 10);
    }


    playAgainClick = (e) => {
        this.props.resetGame();
    }

    submitClick = (e) => {
        e.preventDefault();

        console.log('click');
        if (this.state.winnerName.length < 2) {
            console.log("Winner name too short... YOU SHALL NOT PASS!");
            return;
        }
        console.log(this.state);

        //axios.get('http://127.0.0.1:300/').then(res => {console.log(res.data)});
        axios.post('http://127.0.0.1:300/sendUserRec', {
            params: {
                name: this.state.winnerName,
                symbol: this.state.winnerSymbol,
                turns: this.state.turns,
                points: this.state.points,
                gameMap: this.state.gameMap
            }
        })
            .then(function (res) {
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });


        this.setState({ dataSubmited: true });
    }


    skipBtn = () => {
        this.setState({skipSubmittion: true})
    }


    updateTextValue = (e) => {
        this.setState({ winnerName: e.target.value });

        const data = this.state.winnerName;
        console.log({ data });
    }

    render() {
        return (
            <div>
                {(!this.state.dataSubmited && !this.state.skipSubmittion) ?
                    <form onSubmit={this.submitClick} className='center-div head'>
                        <h1 className='sec-title'>
                            Congrarts {this.state.symbol}. You've won in {this.state.turns} turns... Not bad kiddo!
                        </h1>
                        <h1>Insert Your Name:</h1>
                        <input placeholder='YOUR NAME HERE' type="text" maxLength={10} min="1" onChange={this.updateTextValue}></input>
                        <button type="submit" className='submit'>Submit</button>
                        <button className='submit' onClick={this.skipBtn}>Skip</button>
                        {/*<input type="submit" value="Submit" className='submit'></input>*/}
                    </form>

                    :

                    <div className='center-div head'>
                        <h1>Data Submited!</h1>
                        <div>
                        <button onClick={this.playAgainClick} className='submit'>Play Again</button>
                        <Link to="/records"><button className='submit'>View Records</button></Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
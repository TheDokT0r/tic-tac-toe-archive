import React, { PureComponent } from 'react'
import axios from 'axios';
import { ButtonGroup } from '@react-ui-org/react-ui';
import './Records.css';
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import RecordsTable from './RecordsTable';
import RecordedGame from './RecordedGame';

export default class Records extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentGameMap: [] //The game map of the currenntly selected user
        };

        this.clearDbBtn = this.clearDbBtn.bind(this);
        this.setGameMapClick = this.setGameMapClick.bind(this);
    }

    getData = () => {
        axios.get('http://127.0.0.1:300/userRec')
            .then(res => {
                this.setState({ items: res.data });
            });
    }


    componentDidMount() {
        this.getData();
    }

    clearDbBtn = () => {
        axios.post('http://127.0.0.1:300/clearUserRecs', {
        });
    }


    setGameMapClick = (e) => {
        const id = e.target.id;
        this.setState({currentGameMap: this.state.items[id].gameMap});
    }

    //Used to select a recorded game board
    createButtonGroup = () => {
        /*let counter = 0;
        let btnsArr = this.state.items.map(x => 
        <button onClick={this.setGameMapClick} id={counter} className='visual-btn'>
            {x.name}
            </button>);*/

        const items = this.state.items;
        let btnsArr = [];
        for(let i = 0; i < items.length; i++) {
            btnsArr.push(<button className='visual-btn' key={i} id={i} onClick={this.setGameMapClick}>
                {items[i].name}
            </button>);
        }

        return (<ButtonGroup className="btns-group">{btnsArr}</ButtonGroup>);
    }


    render() {
        const items = this.state.items;
        return (
            <div className='main-div'>
                <div className="">
                    <div>
                        <h1 className='recs-title'>Records</h1>
                    </div>
                    <div>
                        <div className='records-div'>
                            {/*{this.createTable(this.sortArr(this.state.items))}*/}
                            <RecordsTable items={items}></RecordsTable>
                        </div>
                    </div>

                    <div className='game-records-div'>
                        {this.createButtonGroup()}
                        <RecordedGame gameMap={this.state.currentGameMap}></RecordedGame>
                    </div>

                    <div className='btns'>
                        <Link to={'/'}><button className='return-btn'>Retrun</button></Link>
                        <button onClick={this.clearDbBtn} className='return-btn'>Clear DB</button>
                    </div>

                </div>
            </div>
        )
    }
}

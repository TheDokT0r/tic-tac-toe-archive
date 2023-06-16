import React, { PureComponent } from 'react'
import { Table, ButtonGroup } from '@react-ui-org/react-ui';


//Creates the records table
export default class RecordsTable extends PureComponent {
    constructor(props) {
        super(props);
    }


    rankArr = (arr) => { //Sorts the records by highest points
        let flag = true;
        while (flag) {
            flag = false;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i].points > arr[i + 1].points) {
                    flag = true;
                    const temp = arr[i + 1];
                    arr[i + 1] = arr[i];
                    arr[i] = temp;
                }
            }
        }

        //Ranks all players
        for (let i = 0; i < arr.length; i++) {
            arr[i].rank = i + 1;
        }

        return arr;
    }


    modifyBoardElm = (arr) => {
        for(let i = 0; i < arr.length; i++) {
            arr[i].visualMap = this.visualMap(arr[i].gameMap);
        }

        return arr;
    }


    visualMap = (map) => {
        let visualMap = "";
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                visualMap += "|" + map[i][j] + "|";
            }

            visualMap += "\n- - -\n";
        }

        return visualMap;
    }

    createTable = (items) => {
        return <Table
            columns={[
                {
                    label: "Rank",
                    name: "rank"
                },
                {
                    label: "Name",
                    name: "name",
                },
                {
                    label: "Points",
                    name: "points"
                },
                {
                    label: "Turns",
                    name: "turns"
                }
            ]} rows={items}
        />
    }
    
    render() {
        let data = this.rankArr(this.props.items);
        //data = this.modifyBoardElm(data); //Cut for now...
        return (
            <div>
                {this.createTable(data)}
            </div>
        )
    }
}

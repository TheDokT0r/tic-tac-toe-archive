const CheckWon = (arr, players) => { //The arr is 2D
    arr = setArr(arr);

    const isRow = (row(arr, players));
    if (isRow) {
        return isRow;
    }
    return sideWays(arr, players);
}

const row = (arr, players) => {
    let returnVal = NaN;
    for (let p of players) {
        for (let i = 0; i < 3; i++) {
            if (arr[i][0] == p && arr[i][1] == p && arr[i][2] == p) {
                returnVal = p;
            }

            if (arr[0][i] == p && arr[1][i] == p && arr[2][i] == p) {
                returnVal = p;
            }
        }
        //console.log({ returnVal });
    }

    return returnVal;
}


const sideWays = (arr, players) => {
    let returnVal = NaN;

    for (let p of players) {
        if (arr[0][0] == p && arr[1][1] == p && arr[2][2] == p) {
            returnVal = p;
        }

        if (arr[0][2] == p && arr[1][1] == 0 && arr[2, 0] == p) {
            returnVal = p;
        }
    }

    return returnVal;
}


function setArr(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let innerArr = [];
        for (let j = 0; j < arr[i].length; j++) {
            innerArr.push(arr[i][j].txt);
        }

        newArr.push(innerArr);
    }

    return newArr;
}

export default CheckWon;

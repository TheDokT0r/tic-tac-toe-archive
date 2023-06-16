import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

const AddToDb = (playerName, playerSymbol, turns, points, gameMap) => {
    //const mongo = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017";

    MongoClient.connect(url, function (err, db) {
        if (err) { console.log(err); }
        const dbo = db.db("ticDB");
        const myobj = { name: playerName, points: points, turns: turns, symbol: playerSymbol, gameMap: gameMap };
        dbo.collection("players").insertOne(myobj, function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("1 document inserted");
            db.close();
        });
    });
}


const ReadFromDB = () => {
    const url = "mongodb://localhost:27017";
    console.log('reciving date from ' + url)
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            const dbo = db.db('ticDB');
            resolve(dbo.collection("players").find({}).toArray());
        });
    });
}


const clearDB = (db, collection) => {
    const url = "mongodb://localhost:27017";
    console.log('clearing table...')
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            const dbo = db.db('ticDB');
            resolve(dbo.collection("players").remove({}));
            console.log('cleared!');
        });
    });
}


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }
));


app.use((req, res, next) => {
    res.header("Accress-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Options", "PUT, GET, POST, PATCH, DELETE");
    }
    next();
});


app.post('/sendUserRec', function (req, res) {
    console.log("Connection set!");

    const data = req.body.params;
    console.log({ data });

    const { name, symbol, turns, points, gameMap } = data;
    AddToDb(name, symbol, turns, points, gameMap);
    res.send();
});


app.post('/clearUserRecs', function(req, res) {
    console.log('Connection set!');
    clearDB('ticDB', 'players');
});


app.get('/userRec', async function (req, res) {
    console.log("Connection set!");

    const db = await ReadFromDB();
    console.log({ db });
    res.send(db);
});

console.log("Establishing connection...");
app.listen(300);
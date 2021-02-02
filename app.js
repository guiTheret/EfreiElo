// imports
const { info } = require('console')
const { response } = require('express')
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')
const fetch = require("node-fetch")

const api_lol_key = 'RGAPI-0e164945-9a84-4d44-a5d7-b3cf4dbf25cd'


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "EfreiElo"
})

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected to DB")
})

// Listen on port 3000
app.listen(port,() => console.info(`Lisenting on port ${port}`))

app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))


// Set Views
app.set('views','./views')
app.set('view engine','ejs')

async function get_player_data_step1(summoner) {   
    fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api_lol_key}`)
    .then(async function(response) {
        let data = await response.json();
        console.log(data)
        return data;
    })
}  
async function insert_database_player_info(summoner) {
    var data =  get_player_data_step1(summoner)
    .then(async function () {
        console.log("data is : " + data)
    })
    
}

function summoner_info_sql_to_dict(info_players_query) {
    var info_players = []
    info_players_query.forEach(element => {
        var dict = {
            nom_invocateur: "",
            lvl: "",
            icone: "",
            Elo: "",
            opgg: ""
        };
        dict.nom_invocateur = element.nom_invocateur;
        dict.opgg = element.opgg;
        dict.lvl = element.lvl;
        dict.elo = element.elo;
        dict.icone = `http://ddragon.leagueoflegends.com/cdn/6.3.1/img/profileicon/${element.icone}.png`;
        info_players.push(dict);
    });
    return info_players;
}



app.get('',(req,res) => {
    let info_players = [];
    let sql = "SELECT id, nom_invocateur,opgg,lvl,icone,elo FROM info_players"
    let query = db.query(sql, (err, info_players_query, fields) => {
        info_players = summoner_info_sql_to_dict(info_players_query)
        res.render('index',{info_players: info_players}) 
    })
})

app.get('/register',(req,res) => {
    res.render('register')
})


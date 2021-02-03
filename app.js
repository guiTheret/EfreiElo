// imports
const { info } = require('console')
const { response } = require('express')
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')
const fetch = require("node-fetch")
const axios = require('axios').default;

const api_lol_key = 'RGAPI-0e164945-9a84-4d44-a5d7-b3cf4dbf25cd'


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
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

//const step_1_request = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api_lol_key}`
//const step_2_request = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${EncryptedID}?api_key=${api_lol_key}`

async function get_player_data_step1(summoner) {   
    const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api_lol_key}`);
    return response
    
}  
async function get_player_data_step2(EncryptedID) {
    const response = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${EncryptedID}?api_key=${api_lol_key}`)
    return response.json()
}
async function insert_database_player_info(summoner) {
    get_player_data_step1(summoner)
    .then(response => {
        return response.json()
    })   
    .then(data => {
        console.log(data)
    })
}

function summoner_info_sql_to_dict(info_players_query) {
    var info_players = []
    info_players_query.forEach(element => {
        var dict = {
            nom_invocateur: "",
            lvl: "",
            icone: "",
            elo: "",
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
    insert_database_player_info("Manguier")
})

app.get('/register',(req,res) => {
    res.render('register')
})


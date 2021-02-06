// imports
const { info } = require('console')
const { response } = require('express')
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')
const fetch = require("node-fetch")
const axios = require('axios').default;

const api_lol_key = 'RGAPI-c5739fe7-7aac-41f4-aa85-9775badbde2f'


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
    const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(summoner)}?api_key=${api_lol_key}`);
    return response
    
} 
async function get_player_data_step2(encryptedID) {
    const response = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedID}?api_key=${api_lol_key}`)
    return response
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
async function get_data_outside_scope(data,summoner,opgg) {
    let check_sql = `SELECT nom_invocateur FROM info_players WHERE nom_invocateur = '${summoner}'`;
    let query_check = await db.query(check_sql,function(err, result) {
        if (err) throw err;
        if (result != "") {
            console.log("USER " + summoner + " ALREADY EXISTS");
        } else {
            let sql = `INSERT INTO info_players (nom_invocateur,opgg,accountID,icone,lvl) VALUES ('${summoner}','${opgg}','${data.id}','${data.profileIconId}','${data.summonerLevel}')`;
            let query = db.query(sql, function (err,result) {
                if (err) throw err;
                console.log("User " + summoner + " was inserted in database");
            })
        }
    })
    get_player_data_step2(data.id)
    .then(response => {
        if(response['status'] != 200 ) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            console.log("working")
            return response.json()
        }
    })
    .then(data => {
        //console.log(data)
        if(data != "error" && isEmpty(data) == false) {
            let winrate = data[0].wins / (data[0].losses + data[0].wins) * 100
            let sql =` UPDATE info_players SET tier = '${data[0].tier}', rank_ok = '${data[0].rank}', lp = ${data[0].leaguePoints}, wins = ${data[0].wins}, looses = ${data[0].losses}, winrate = ${winrate} WHERE accountID = '${data[0].summonerId}'`;
            let query = db.query(sql, function(err, result) {
                if (err) throw err;
            })
        }
        
        
    })
}
async function insert_database_player_info(summoner,opgg) {
    await get_player_data_step1(summoner)
    .then(response =>  {
        if(response['status'] != 200) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            return response.json()
        }
        
    })  
    .then(data => {
        if(data != "error") {
            get_data_outside_scope(data,summoner,opgg)
        }
        
    }) 
}
function encode_using_utf8(summoner) {   
    return encodeURI(summoner)
}
function summoner_info_sql_to_dict(info_players_query) {
    var info_players = []
    info_players_query.forEach(element => {
        var dict = {
            nom_invocateur: "",
            lvl: "",
            icone: "",
            elo: "",
            opgg: "",
            rank: "",
            tier: "",
            winrate: ""
        };
        dict.nom_invocateur = element.nom_invocateur;
        dict.opgg = element.opgg;
        dict.lvl = element.lvl;
        dict.icone = `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${element.icone}.png`;
        if(element.rank_ok == null) {
            dict.rank = "UNRANKED"
            dict.winrate = "UNRANKED"
        } else {
            dict.rank = element.rank_ok
            dict.winrate = element.winrate + " %"
        }
        dict.elo = 0
        switch(element.tier) {
            case 'CHALLENGER':
                dict.elo = 2400
                break;
            case 'GRANDMASTER':
                dict.elo = 2400
                break;
            case 'MASTER':
                dict.elo = 2400
                break;
            case 'DIAMOND':
                dict.elo = 2000
                break;
            case 'PLATINUM':
                dict.elo = 1600
                break;
            case 'GOLD':
                dict.elo = 1200
                break;
            case 'SILVER':
                dict.elo = 800
                break;
            case 'BRONZE':
                dict.elo = 400
                break;
            case 'IRON':
                dict.elo = 0
                break;
        }
        switch(element.rank_ok) {
            case'III':
                dict.elo += 100
                break;
            case 'II':
                dict.elo += 200
                break;
            case 'I':
                dict.elo += 300
                break;
        }
        dict.elo += element.lp
        dict.tier = element.tier;
        info_players.push(dict);
    });
    return info_players;
}

app.get('',(req,res) => {
    let info_players = [];
    let sql = "SELECT id, nom_invocateur,opgg,lvl,icone,elo,rank_ok,tier,winrate,lp FROM info_players"
    let query = db.query(sql, (err, info_players_query, fields) => {
        info_players = summoner_info_sql_to_dict(info_players_query)
        res.render('index',{info_players: info_players}) 
    })
    
})
app.get('/register',(req,res) => {
    res.render('register')
})
insert_database_player_info("4es Némésis")
app.get('/index',(req,res) => {
    let info_players = [];
    let sql = "SELECT id, nom_invocateur,opgg,lvl,icone,elo,rank_ok,tier,winrate FROM info_players"
    let query = db.query(sql, (err, info_players_query, fields) => {
        info_players = summoner_info_sql_to_dict(info_players_query)
        res.render('index',{info_players: info_players}) 
    })
})